const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage');
const pdf = require('pdf-parse'); 
const mammoth = require('mammoth'); 
// CRITICAL FIX: Removed 'const nodeFetch = require('node-fetch');' 
// We are now relying on the native global 'fetch' provided by Node.js 20.

// --- Configuration and Initialization ---

admin.initializeApp();
const db = admin.firestore();
const storage = new Storage();

const RESUME_BUCKET = 'curiouslab-academy.firebasestorage.app'; 
const GEMINI_API_KEY = functions.config().gemini ? functions.config().gemini.key : process.env.GEMINI_KEY;
const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

// --- Resume Parsing Helpers ---

/**
 * Extract text from PDF buffer using pdf-parse (more robust).
 */
async function extractTextFromPDF(buffer) {
  try {
    const data = await pdf(buffer);
    return data.text.replace(/\s+/g, ' ').trim();
  } catch (error) {
    console.error('PDF-Parse Fatal Error:', error);
    throw new Error(`PDF parsing failed using pdf-parse: ${error.message}`);
  }
}

/**
 * Extract text from DOCX buffer.
 */
async function extractTextFromDOCX(buffer) {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch (error) {
    console.error('DOCX parsing error:', error);
    throw new Error('Failed to parse DOCX');
  }
}

// --- AI Evaluation Function using Gemini API ---

async function evaluateResumeWithGemini(resumeText, jobDetails) {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured. Run: firebase functions:config:set gemini.key="YOUR_API_KEY"');
  }

  const systemPrompt = `You are an expert HR recruiter evaluating resumes for a ${jobDetails.title} position. Your ONLY goal is to analyze the provided resume against the job description and output a structured evaluation in JSON format. Do not include any introductory or concluding text outside the JSON object.`;

  const userQuery = `
Job Description:
${jobDetails.description}

Required Qualifications:
${jobDetails.requirements.join('\n')}

Resume Content:
${resumeText}

Please provide the evaluation in JSON format with the following strict schema:
{
  "summary": "A brief 2-3 sentence summary of the candidate's background",
  "strengths": ["List of 3-5 key strengths relevant to this role"],
  "weaknesses": ["List of 2-4 areas of concern or missing qualifications"],
  "fit_score": <number between 0-100 indicating how well they match the role>,
  "recommendation": "STRONG_FIT | GOOD_FIT | MAYBE | NOT_FIT",
  "key_experience": ["List of relevant past roles or projects"],
  "red_flags": ["Any concerns about experience gaps, job hopping, etc."],
  "interview_focus": ["Suggested topics to explore in an interview"]
}`;

  const maxRetries = 3;
  let lastError = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const payload = {
        contents: [{ role: 'user', parts: [{ text: userQuery }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              summary: { type: "STRING" },
              strengths: { type: "ARRAY", items: { type: "STRING" } },
              weaknesses: { type: "ARRAY", items: { type: "STRING" } },
              fit_score: { type: "INTEGER" },
              recommendation: { type: "STRING", enum: ["STRONG_FIT", "GOOD_FIT", "MAYBE", "NOT_FIT"] },
              key_experience: { type: "ARRAY", items: { type: "STRING" } },
              red_flags: { type: "ARRAY", items: { type: "STRING" } },
              interview_focus: { type: "ARRAY", items: { type: "STRING" } }
            }
          }
        }
      };
      
      // Using the native global fetch
      const response = await fetch(GEMINI_API_URL, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        lastError = `API call failed with status: ${response.status} - ${errorText}`;
        throw new Error(lastError);
      }

      const result = await response.json();
      const jsonText = result.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!jsonText) {
        lastError = "Gemini response lacked expected JSON text structure.";
        throw new Error(lastError);
      }

      return JSON.parse(jsonText); 

    } catch (error) {
      lastError = error;
      console.error(`Attempt ${attempt + 1} failed:`, error.message);
      
      if (attempt < maxRetries - 1) {
        const delay = Math.pow(2, attempt) * 1000; 
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw new Error(`Failed to evaluate resume after ${maxRetries} attempts: ${lastError.message}`);
      }
    }
  }
}

// --- Main Cloud Function Trigger (v1 - Gen 1) ---

exports.processResumeEU = functions
  .region('europe-west1')
  .runWith({
    timeoutSeconds: 540,
    memory: '512MB'
  })
  .storage
  .object()
  .onFinalize(async (object) => {
    const filePath = object.name;
    const contentType = object.contentType;
    const bucketName = object.bucket;

    console.log(`[START] Processing file: ${filePath} from bucket: ${bucketName}`);

    // Filter: Only process files from the correct bucket
    if (bucketName !== RESUME_BUCKET) {
      console.log(`[SKIP] Ignoring file from different bucket: ${bucketName}. Expected: ${RESUME_BUCKET}`);
      return null;
    }

    // Extract app ID from path
    const appIdMatch = filePath.match(/artifacts\/(.*?)\/resumes\//);
    const appId = appIdMatch ? appIdMatch[1] : null;
    
    if (!appId) {
      console.log('[SKIP] No App ID found in path');
      return null;
    }

    // Validate file type
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ];

    if (!validTypes.includes(contentType)) {
      console.log(`[SKIP] Unsupported file type: ${contentType}`);
      return null;
    }

    // Extract document ID from filename
    const pathParts = filePath.split('/');
    const fileWithId = pathParts[pathParts.length - 1];
    
    const applicantDocIdMatch = fileWithId.match(/^([a-zA-Z0-9]+)_/); 
    const applicantDocId = applicantDocIdMatch ? applicantDocIdMatch[1] : null;

    if (!applicantDocId) {
      console.error('[ERROR] Could not extract document ID from filename:', fileWithId);
      return null;
    }

    const collectionPath = `artifacts/${appId}/public/data/applicants`;
    const applicantRef = db.collection(collectionPath).doc(applicantDocId);
    
    // Pre-update status to 'PROCESSING' to inform the user it started
    try {
        await applicantRef.update({
            status: 'processing', 
            screenedAt: null,
            error: null
        });
        console.log(`[STATUS] Updated Firestore status to PROCESSING for ${applicantDocId}`);
    } catch (e) {
        console.warn(`[WARNING] Could not set status to processing (Doc may not exist yet): ${e.message}`);
    }


    console.log(`[INFO] App ID: ${appId}, Doc ID: ${applicantDocId}`);

    try {
      // 1. Download the file
      const bucket = storage.bucket(bucketName);
      const file = bucket.file(filePath);
      
      console.log('[STEP 1] Downloading file...');
      const [buffer] = await file.download();
      console.log(`[STEP 1] Downloaded: ${buffer.length} bytes`);
      
      console.log('[DEBUG] Passed download step. Starting file type check.');

      // 2. Extract text
      let resumeText;
      console.log('[STEP 2] Extracting text...');
      
      if (contentType === 'application/pdf' || filePath.toLowerCase().endsWith('.pdf')) {
        console.log('[DEBUG] Calling PDF extractor (using pdf-parse).');
        resumeText = await extractTextFromPDF(buffer);
      } else {
        console.log('[DEBUG] Calling DOCX extractor (using mammoth).');
        resumeText = await extractTextFromDOCX(buffer);
      }

      console.log(`[STEP 2] Extracted: ${resumeText.length} characters`);

      if (!resumeText.trim()) {
        console.warn('[WARNING] Extracted text was empty');
        await applicantRef.update({
          status: 'error',
          evaluation: { 
            summary: 'Could not extract text from file.', 
            recommendation: 'NOT_FIT',
            fit_score: 0
          },
          screenedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        return null;
      }

      // 3. Define the Job Details (Hardcoded for this example)
      const jobDetails = {
        title: 'Social Media Manager',
        description: `We're seeking a creative and data-driven Social Media Manager to lead our social media strategy 
          and grow our online presence. The ideal candidate will create engaging content, manage community interactions, 
          and analyze performance metrics to optimize campaigns.`,
        requirements: [
            '1–3 years of social media management experience',
  'Portfolio showing engaging content creation',
  'Proficiency with Canva, CapCut, and scheduling tools (Buffer, Hootsuite, or similar)',
  'Strong communication and copywriting skills',
  'Experience managing YouTube, TikTok, Twitter, Facebook, Instagram, and LinkedIn',
  'Ability to do simple video editing and voice-overs',
  'Understanding of social media trends and analytics'
        ]
      };

      // 4. Evaluate resume using AI
      console.log('[STEP 3] Evaluating with Gemini AI...');
      const evaluation = await evaluateResumeWithGemini(resumeText, jobDetails);
      
      console.log(`[STEP 3] AI evaluation complete: ${evaluation.recommendation}, Score: ${evaluation.fit_score}`);

      // 5. Update the applicant document
      console.log('[STEP 4] Updating Firestore...');
      await applicantRef.update({
        evaluation: evaluation,
        status: 'screened', // Final status update
        screenedAt: admin.firestore.FieldValue.serverTimestamp(),
        resumeText: resumeText.substring(0, 5000) // Truncate text for Firestore limit
      });

      console.log('[SUCCESS] Application screening complete!');

      return {
        success: true,
        applicantId: applicantDocId,
        evaluation: evaluation
      };

    } catch (error) {
      console.error('[FATAL ERROR] Processing failed:', error);
      
      // Update status to 'error' if any critical step fails
      try {
        await applicantRef.update({
          status: 'error',
          error: error.message.substring(0, 500),
          errorAt: admin.firestore.FieldValue.serverTimestamp()
        });
        console.log('[ERROR] Updated status to error in Firestore.');
      } catch (updateError) {
        console.error('[ERROR] Failed to update error status:', updateError);
      }

      throw error;
    }
  });
