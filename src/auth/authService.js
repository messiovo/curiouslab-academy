import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../firebase/firebase';

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Authentication Functions
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Google sign-in successful:", result.user.displayName);
    return result.user;
  } catch (error) {
    console.error("Google sign-in error:", error);
    throw new Error(getAuthErrorMessage(error.code));
  }
};

export const signUpWithEmail = async (email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Email sign-up successful:", result.user.email);
    return result.user;
  } catch (error) {
    console.error("Email sign-up error:", error);
    throw new Error(getAuthErrorMessage(error.code));
  }
};

export const signInWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log("Email sign-in successful:", result.user.email);
    return result.user;
  } catch (error) {
    console.error("Email sign-in error:", error);
    throw new Error(getAuthErrorMessage(error.code));
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Logout error:", error);
    throw new Error("Failed to sign out. Please try again.");
  }
};

// Auth state listener
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    console.log("Auth state changed:", user ? `User: ${user.displayName || user.email}` : "No user");
    callback(user);
  });
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Helper function for user-friendly error messages
const getAuthErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'No account found with this email address.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in cancelled. Please try again.';
    default:
      return 'An error occurred during authentication. Please try again.';
  }
};