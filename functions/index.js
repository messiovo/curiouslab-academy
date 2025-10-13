const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage');
const PDFParser = require('pdf2json'); 
const mammoth = require('mammoth'); 

// --- Configuration and Initialization ---

admin.initializeApp();
const db = admin.firestore();
const storage = new Storage();

const GEMINI_API_KEY = functions.config().gemini?.key;
const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

const RESUME_BUCKET = 'curiouslab-academy.firebasestorage.app';
const ADMIN_EMAIL = 'messiovo@gmail.com';
const COMPANY_NAME = 'CuriousLab Academy';
const COMPANY_WEBSITE = 'https://curiouslabacademy.com';
const COMPANY_LOGO = 'https://curiouslabacademy.com/logo.png'; 
const COMPANY_COLOR = '#2d3748';

// --- Resume Parsing Helpers ---

async function extractTextFromPDF(buffer) {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser(null, 1);
    
    pdfParser.on("pdfParser_dataError", errData => {
      console.error('PDF2JSON Error:', errData.parserError);
      reject(new Error(`PDF parsing failed: ${errData.parserError}`));
    });

    pdfParser.on("pdfParser_dataReady", pdfData => {
      let fullText = '';
      if (pdfData.Pages) {
        pdfData.Pages.forEach(page => {
          if (page.Texts) {
            page.Texts.forEach(textBlock => {
              if (textBlock.R && textBlock.R[0]) {
                const decodedText = decodeURIComponent(textBlock.R[0].T);
                fullText += decodedText + ' ';
              }
            });
          }
        });
      }
      resolve(fullText.replace(/\s+/g, ' ').trim());
    });

    pdfParser.parseBuffer(buffer);
  });
}

async function extractTextFromDOCX(buffer) {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch (error) {
    console.error('DOCX parsing error:', error);
    throw new Error('Failed to parse DOCX');
  }
}

// --- AI Evaluation Function ---

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
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw new Error(`Failed to evaluate resume after ${maxRetries} attempts: ${lastError.message}`);
      }
    }
  }
}

// --- Email Template Components ---

function getEmailHeader() {
  return `
    <div style="background-color: ${COMPANY_COLOR}; padding: 20px; display: flex; align-items: center; justify-content: center; gap: 10px;">
        <img src="${COMPANY_LOGO}" alt="${COMPANY_NAME}" style="max-width: 60px; height: auto;" />
        <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">${COMPANY_NAME}</h1>
     </div>
  `;
}

function getEmailFooter() {
  const currentYear = new Date().getFullYear();
  return `
    <div style="background-color: #f9fafb; padding: 30px 20px; margin-top: 40px; border-top: 3px solid ${COMPANY_COLOR};">
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
        <tr>
          <td align="center">
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding: 0 10px;">
                  <a href="https://www.linkedin.com/company/107929771/admin/dashboard/" style="color: #6b7280; text-decoration: none; font-size: 14px;">LinkedIn</a>
                </td>
                <td style="padding: 0 10px; color: #d1d5db;">|</td>
                <td style="padding: 0 10px;">
                  <a href="https://x.com/curiousLabKids" style="color: #6b7280; text-decoration: none; font-size: 14px;">Twitter</a>
                </td>
                <td style="padding: 0 10px; color: #d1d5db;">|</td>
                <td style="padding: 0 10px;">
                  <a href="https://www.instagram.com/curiouslab_academy/" style="color: #6b7280; text-decoration: none; font-size: 14px;">Instagram</a>
                </td>
                <td style="padding: 0 10px; color: #d1d5db;">|</td>
                <td style="padding: 0 10px;">
                  <a href="https://www.tiktok.com/@curiouslabacademy" style="color: #6b7280; text-decoration: none; font-size: 14px;">TikTok</a>
                </td>
                <td style="padding: 0 10px; color: #d1d5db;">|</td>
                <td style="padding: 0 10px;">
                  <a href="${COMPANY_WEBSITE}/careers" style="color: #6b7280; text-decoration: none; font-size: 14px;">Careers</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      
      <div style="text-align: center; color: #6b7280; font-size: 13px; line-height: 1.6;">
        <p style="margin: 5px 0;">
          <strong>${COMPANY_NAME}</strong><br>
         Inspiring young minds through creativity, innovation, and lifelong learning
        </p>
        <p style="margin: 15px 0 5px 0;">
          <a href="${COMPANY_WEBSITE}" style="color: ${COMPANY_COLOR}; text-decoration: none;">${COMPANY_WEBSITE}</a>
        </p>
        <p style="margin: 5px 0;">
          Email: <a href="mailto:mercy@curiouslabacademy.com" style="color: ${COMPANY_COLOR}; text-decoration: none;">mercy@curiouslabacademy.com</a>
        </p>
      </div>
      
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
      
      <p style="text-align: center; color: #9ca3af; font-size: 11px; margin: 10px 0; line-height: 1.5;">
        © ${currentYear} ${COMPANY_NAME}. All rights reserved.<br>
        This email was sent regarding your application for the Social Media Manager position.<br>
        <a href="${COMPANY_WEBSITE}/privacy-policy" style="color: #9ca3af; text-decoration: underline;">Privacy Policy</a> | 
        <a href="${COMPANY_WEBSITE}/terms-of-service" style="color: #9ca3af; text-decoration: underline;">Terms of Service</a>
      </p>
    </div>
  `;
}

function wrapEmailContent(content) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${COMPANY_NAME} - Application Update</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f3f4f6;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 20px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <tr>
                <td>
                  ${getEmailHeader()}
                </td>
              </tr>
              <tr>
                <td style="padding: 40px 30px;">
                  ${content}
                </td>
              </tr>
              <tr>
                <td>
                  ${getEmailFooter()}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

// --- Email Templates ---

function getEmailTemplate(fitLevel, applicantName, fitScore) {
  const templates = {
    strong: {
      subject: `Interview Invitation - ${COMPANY_NAME}`,
      content: `
        <h2 style="color: ${COMPANY_COLOR}; margin-top: 0;">Congratulations, ${applicantName}! 🎉</h2>
        
        <p style="color: #374151; line-height: 1.6;">Thank you for applying to the Social Media Manager position at ${COMPANY_NAME}!</p>
        
        <p style="color: #374151; line-height: 1.6;"><strong>Great news!</strong> Based on your profile and experience, we'd love to invite you to the next stage of our selection process.</p>
        
        <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid ${COMPANY_COLOR};">
          <p style="margin: 0; font-size: 16px; color: #1e40af;"><strong>Your Fit Score: ${fitScore}/100</strong></p>
          <p style="margin: 10px 0 0 0; font-size: 14px; color: #1e40af;">✨ You're a strong match for this role!</p>
        </div>
        
        <p style="color: #374151; line-height: 1.6; margin-top: 25px;"><strong>Next Steps:</strong></p>
        <ol style="color: #374151; line-height: 1.8; padding-left: 20px;">
          <li>Review our company culture and values on our website</li>
          <li>Schedule your interview by clicking the link below</li>
          <li>Prepare to discuss your social media strategies and past campaigns</li>
        </ol>
        
        <div style="text-align: center; margin: 35px 0;">
          <a href="https://calendly.com/mercy-curiouslabacademy/interview-session"  
             style="background-color: ${COMPANY_COLOR}; color: white; padding: 14px 35px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3);">
            Schedule Your Interview →
          </a>
        </div>
        
        <p style="color: #374151; line-height: 1.6;">We're looking forward to speaking with you!</p>
        
        <p style="margin-top: 30px; color: #374151; line-height: 1.6;">Best regards,<br>
        <strong>The ${COMPANY_NAME} Team</strong></p>
      `
    },
    medium: {
      subject: `Application Update - ${COMPANY_NAME}`,
      content: `
        <h2 style="color: ${COMPANY_COLOR}; margin-top: 0;">Thank You for Applying, ${applicantName}</h2>
        
        <p style="color: #374151; line-height: 1.6;">Thank you for your interest in the Social Media Manager position at ${COMPANY_NAME}.</p>
        
        <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #f59e0b;">
          <p style="margin: 0; font-size: 16px; color: #92400e;"><strong>Your Fit Score: ${fitScore}/100</strong></p>
          <p style="margin: 10px 0 0 0; font-size: 14px; color: #92400e;">⏸️ Your application has been shortlisted</p>
        </div>
        
        <p style="color: #374151; line-height: 1.6;">We appreciate you taking the time to apply and share your experience with us. After careful review of all applications, we're currently moving forward with candidates whose profiles more closely match our immediate needs.</p>
        
        <p style="color: #374151; line-height: 1.6;"><strong>However, your profile caught our attention!</strong> We'd like to keep your resume on file and may reach out if a suitable role opens up in the future.</p>
        
        <p style="color: #374151; line-height: 1.6; margin-top: 25px;"><strong>What this means:</strong></p>
        <ul style="color: #374151; line-height: 1.8; padding-left: 20px;">
          <li>Your application is on our shortlist</li>
          <li>We'll keep your details for future opportunities</li>
          <li>We may contact you if a matching role becomes available</li>
        </ul>
        
        <p style="color: #374151; line-height: 1.6;">We encourage you to follow us on LinkedIn and check our careers page regularly for new openings that might be a better fit.</p>
        
        <div style="text-align: center; margin: 35px 0;">
          <a href="${COMPANY_WEBSITE}/careers" 
             style="background-color: #f59e0b; color: white; padding: 14px 35px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(245, 158, 11, 0.3);">
            Explore Other Opportunities →
          </a>
        </div>
        
        <p style="margin-top: 30px; color: #374151; line-height: 1.6;">Best wishes in your job search,<br>
        <strong>The ${COMPANY_NAME} Team</strong></p>
      `
    },
    weak: {
      subject: `Application Status - ${COMPANY_NAME}`,
      content: `
        <h2 style="color: ${COMPANY_COLOR}; margin-top: 0;">Thank You for Your Interest, ${applicantName}</h2>
        
        <p style="color: #374151; line-height: 1.6;">Thank you for taking the time to apply for the Social Media Manager position at ${COMPANY_NAME}.</p>
        
        <p style="color: #374151; line-height: 1.6;">After careful review of your application, we've decided not to move forward with your candidacy at this time. This was not an easy decision, as we received many qualified applications.</p>
        
        <p style="color: #374151; line-height: 1.6; margin-top: 25px;"><strong>We encourage you to:</strong></p>
        <ul style="color: #374151; line-height: 1.8; padding-left: 20px;">
          <li>Continue developing your social media management skills</li>
          <li>Build a strong portfolio of campaigns and results</li>
          <li>Gain experience with social media analytics tools</li>
          <li>Keep an eye on our careers page for future opportunities</li>
        </ul>
        
        <p style="color: #374151; line-height: 1.6;">While you weren't selected for this particular role, we appreciate your interest in ${COMPANY_NAME} and wish you the very best in your career journey.</p>
        
        <div style="text-align: center; margin: 35px 0;">
          <a href="${COMPANY_WEBSITE}/careers" 
             style="background-color: #6b7280; color: white; padding: 14px 35px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(107, 114, 128, 0.3);">
            View Other Opportunities →
          </a>
        </div>
        
        <p style="margin-top: 30px; color: #374151; line-height: 1.6;">Best regards,<br>
        <strong>The ${COMPANY_NAME} Team</strong></p>
      `
    }
  };

  const template = templates[fitLevel];
  return {
    subject: template.subject,
    html: wrapEmailContent(template.content)
  };
}

// --- Email Sending Function ---

async function sendApplicantEmail(applicantEmail, applicantName, fitScore) {
  let fitLevel;
  if (fitScore >= 80) {
    fitLevel = 'strong';
  } else if (fitScore >= 70) {
    fitLevel = 'medium';
  } else {
    fitLevel = 'weak';
  }

  const template = getEmailTemplate(fitLevel, applicantName, fitScore);

  try {
    await db.collection('mail').add({
      to: applicantEmail,
      message: {
        subject: template.subject,
        html: template.html
      }
    });

    console.log(`[EMAIL] Queued ${fitLevel} fit email to ${applicantEmail}`);
    return fitLevel;
  } catch (error) {
    console.error('[EMAIL] Failed to queue email:', error);
    throw error;
  }
}

// --- Main Cloud Function: Resume Processing ---

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

    if (bucketName !== RESUME_BUCKET) {
      console.log(`[SKIP] Ignoring file from different bucket: ${bucketName}`);
      return null;
    }

    const appIdMatch = filePath.match(/artifacts\/(.*?)\/resumes\//);
    const appId = appIdMatch ? appIdMatch[1] : null;
    
    if (!appId) {
      console.log('[SKIP] No App ID found in path');
      return null;
    }

    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ];

    if (!validTypes.includes(contentType)) {
      console.log(`[SKIP] Unsupported file type: ${contentType}`);
      return null;
    }

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

    // Pre-update status to 'PROCESSING'
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

      // 2. Extract text
      let resumeText;
      console.log('[STEP 2] Extracting text...');
      
      if (contentType === 'application/pdf' || filePath.toLowerCase().endsWith('.pdf')) {
        console.log('[DEBUG] Calling PDF extractor (using pdf2json).');
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

      // 3. Job details
      const jobDetails = {
        title: 'Social Media Manager',
        description: `We're seeking a creative and data-driven Social Media Manager to lead our social media strategy 
        and grow our online presence. The ideal candidate will create engaging content, manage community interactions, 
        and analyze performance metrics to optimize campaigns.`,
        requirements: [
          '1–5 years of social media management experience',
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

      // 5. Get applicant details for email
      const applicantSnap = await applicantRef.get();
      const applicantData = applicantSnap.data();

      // 6. Send automated email based on fit score
      console.log('[STEP 4] Sending automated email...');
      const emailFitLevel = await sendApplicantEmail(
        applicantData.email,
        applicantData.fullName,
        evaluation.fit_score
      );

      // 7. Update the applicant document
      console.log('[STEP 5] Updating Firestore...');
      await applicantRef.update({
        evaluation: evaluation,
        status: 'screened',
        emailSent: true,
        emailFitLevel: emailFitLevel,
        screenedAt: admin.firestore.FieldValue.serverTimestamp(),
        resumeText: resumeText.substring(0, 5000) 
      });

      console.log('[SUCCESS] Application screening complete!');

      return {
        success: true,
        applicantId: applicantDocId,
        evaluation: evaluation,
        emailSent: true
      };

    } catch (error) {
      console.error('[ERROR] Processing failed:', error);
      
      try {
        await applicantRef.update({
          status: 'error',
          error: error.message.substring(0, 500),
          errorAt: admin.firestore.FieldValue.serverTimestamp()
        });
        console.log('[ERROR] Updated status to error');
      } catch (updateError) {
        console.error('[ERROR] Failed to update error status:', updateError);
      }

      throw error;
    }
  });

// --- Daily Admin Summary Function ---

exports.sendDailySummary = functions
 .region('europe-west1')
 .pubsub
  .schedule('0 18 * * *') // Every day at 6 PM
  .timeZone('Europe/London')
  .onRun(async (context) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const snapshot = await db
      .collection('artifacts/curiouslab-academy/public/data/applicants')
      .where('screenedAt', '>=', yesterday)
      .get();

    const stats = {
      total: snapshot.size,
      strong: 0,
      medium: 0,
      weak: 0
    };

    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.evaluation?.fit_score >= 80) stats.strong++;
      else if (data.evaluation?.fit_score >= 70) stats.medium++;
      else stats.weak++;
    });

    if (stats.total > 0) {
      await db.collection('mail').add({
        to: ADMIN_EMAIL,
        message: {
          subject: `Daily Resume Screening Summary - ${stats.total} Applications`,
          html: `
            <h2>Daily Resume Screening Summary</h2>
            <p><strong>Applications processed in the last 24 hours: ${stats.total}</strong></p>
            <ul>
              <li>✅ Interview Invitations (80+): ${stats.strong}</li>
              <li>⏸️ Shortlisted (70-79): ${stats.medium}</li>
              <li>❌ Rejected (<70): ${stats.weak}</li>
            </ul>
            <p><a href="https://curiouslabacademy.com/admin">View Admin Dashboard</a></p>
          `
        }
      });

      console.log(`[SUMMARY] Sent daily summary: ${stats.total} applications`);
    }

    return null;
  });