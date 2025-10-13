import { 
  collection, 
  addDoc, 
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  where,
  doc,
  updateDoc,
  getDoc
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/firebase';

// Use the app ID from your environment or default
const APP_ID = 'curiouslab-academy';

/**
 * Submit a new job application
 * This creates the Firestore document first, then uploads the resume with the doc ID prepended
 */
export const submitApplication = async (formData, resumeFile) => {
  try {
    console.log('=== APPLICATION SUBMISSION START ===');
    console.log('Form data:', formData);
    console.log('Resume file:', resumeFile.name, resumeFile.type, resumeFile.size);
    
    // Step 1: Create applicant document in Firestore FIRST to get the document ID
    const collectionPath = `artifacts/${APP_ID}/public/data/applicants`;
    console.log('Collection path:', collectionPath);
    
    const applicantData = {
      ...formData,
      appliedAt: serverTimestamp(),
      status: 'pending', // Will be updated to 'screened' by Cloud Function
      position: 'Social Media Manager',
      resumeURL: null, // Will be updated after upload
      resumeName: null
    };

    console.log('Creating Firestore document...');
    const docRef = await addDoc(collection(db, collectionPath), applicantData);
    const applicantId = docRef.id;
    console.log('✓ Document created with ID:', applicantId);

    // Step 2: Upload resume to Firebase Storage with document ID prepended to filename
    // This matches the pattern expected by Cloud Function: 'docId_fileName.ext'
    const fileName = `${applicantId}_${resumeFile.name}`;
    const storagePath = `artifacts/${APP_ID}/resumes/${fileName}`;
    
    console.log('Storage path:', storagePath);
    console.log('Uploading resume...');
    const storageRef = ref(storage, storagePath);
    const uploadResult = await uploadBytes(storageRef, resumeFile);
    console.log('✓ Upload result:', uploadResult);
    
    // Get download URL
    const downloadURL = await getDownloadURL(uploadResult.ref);
    console.log('✓ Download URL:', downloadURL);

    // Step 3: Update the document with resume info
    console.log('Updating document with resume info...');
    await updateDoc(docRef, {
      resumeURL: downloadURL,
      resumeName: fileName
    });
    console.log('✓ Document updated');

    console.log('=== APPLICATION SUBMISSION COMPLETE ===');

    return {
      success: true,
      applicantId: applicantId
    };

  } catch (error) {
    console.error('=== APPLICATION SUBMISSION ERROR ===');
    console.error('Error:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    throw new Error(`Failed to submit application: ${error.message}`);
  }
};

/**
 * Subscribe to applicants (real-time updates)
 */
export const subscribeToApplicants = (callback, filters = {}) => {
  const collectionPath = `artifacts/${APP_ID}/public/data/applicants`;

  let q = collection(db, collectionPath);

  // Apply filters
  if (filters.position) {
    q = query(q, where('position', '==', filters.position));
  }

  if (filters.status) {
    q = query(q, where('status', '==', filters.status));
  }

  // Subscribe to real-time updates
  return onSnapshot(q, (snapshot) => {
    const applicants = [];
    snapshot.forEach((doc) => {
      applicants.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    // Sort client-side by application date (newest first)
    const sortedApplicants = applicants.sort((a, b) => {
      const timeA = a.appliedAt?.toMillis() || 0;
      const timeB = b.appliedAt?.toMillis() || 0;
      return timeB - timeA;
    });
    
    callback(sortedApplicants);
  }, (error) => {
    console.error('Error subscribing to applicants:', error);
  });
};

/**
 * Get a single applicant by ID
 */
export const getApplicant = async (applicantId) => {
  try {
    const collectionPath = `artifacts/${APP_ID}/public/data/applicants`;
    const applicantRef = doc(db, collectionPath, applicantId);
    const applicantSnap = await getDoc(applicantRef);
    
    if (applicantSnap.exists()) {
      return {
        id: applicantSnap.id,
        ...applicantSnap.data()
      };
    } else {
      throw new Error('Applicant not found');
    }
  } catch (error) {
    console.error('Error getting applicant:', error);
    throw error;
  }
};

/**
 * Update applicant status
 */
export const updateApplicantStatus = async (applicantId, newStatus) => {
  try {
    const collectionPath = `artifacts/${APP_ID}/public/data/applicants`;
    const applicantRef = doc(db, collectionPath, applicantId);
    
    await updateDoc(applicantRef, {
      status: newStatus,
      updatedAt: serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error updating status:', error);
    throw error;
  }
};

/**
 * Subscribe to a single applicant (useful for watching screening progress)
 */
export const subscribeToApplicant = (applicantId, callback) => {
  const collectionPath = `artifacts/${APP_ID}/public/data/applicants`;
  const applicantRef = doc(db, collectionPath, applicantId);
  
  return onSnapshot(applicantRef, (doc) => {
    if (doc.exists()) {
      callback({
        id: doc.id,
        ...doc.data()
      });
    }
  }, (error) => {
    console.error('Error subscribing to applicant:', error);
  });
};