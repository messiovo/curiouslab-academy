import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCpmYkXQaRWL9DexZ45XRAFc45B18V0oZ4",
  authDomain: "curiouslab-academy.firebaseapp.com",
  projectId: "curiouslab-academy",
  storageBucket: "curiouslab-academy.firebasestorage.app",
  messagingSenderId: "997240810550",
  appId: "1:997240810550:web:8b429203ab45248fdc3c97",
  measurementId: "G-WS4LE6JSK6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);