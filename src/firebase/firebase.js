import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Needed for resume uploads
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCpmYkXQaRWL9DexZ45XRAFc45B18V0oZ4",
  authDomain: "curiouslab-academy.firebaseapp.com",
  projectId: "curiouslab-academy",
  storageBucket: "curiouslab-academy.firebasestorage.app",
  messagingSenderId: "997240810550",
  appId: "1:997240810550:web:8b429203ab45248fdc3c97",
  measurementId: "G-WS4LE6JSK6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export all required services
export const db = getFirestore(app);
export const storage = getStorage(app); // Exporting Storage service
export const auth = getAuth(app);

export default app;
