import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { auth, db } from './firebase/firebase'; 
import { onAuthStateChange } from './auth/authService'; 
import { getUserProgress } from './auth/userProgress'; 
import { doc, getDoc } from 'firebase/firestore'; 

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CareerPage from './pages/CareerPage';
import AbacusPage from './pages/AbacusPage';
import NotFoundPage from './pages/NotFoundPage';
import EnrollmentPage from './pages/EnrollmentPage';
import AdminDashboard from './pages/AdminDashboard';

import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';

// Define the App ID (must match the ID used in your Firestore rules)
const APP_ID = 'curiouslab-academy'; 

// --- ProtectedRoute Component ---
const ProtectedRoute = ({ children, user, appOwnerId, redirectPath = '/' }) => {
  const navigate = useNavigate();

  // Use useMemo to safely compute the ownership status, stripping hidden whitespace.
  const isOwner = useMemo(() => {
    // 1. Check if user object exists
    if (!user) return false;
    
    const signedInUid = user.uid ? user.uid.trim() : '';
    const ownerId = appOwnerId ? appOwnerId.trim() : '';
    
    // 2. Check for match and configuration integrity
    return signedInUid === ownerId && ownerId !== 'ERROR' && ownerId !== 'OWNER_NOT_CONFIGURED';
  }, [user, appOwnerId]);


  // Use useEffect to handle navigation/redirection, avoiding the render error
  useEffect(() => {
    // Only perform the check once loading is done (appOwnerId is not null)
    if (appOwnerId && !isOwner) {
      console.warn("Access Denied: User is not the app owner.");
      // Redirect non-owners to the specified path
      navigate(redirectPath, { replace: true });
    }
  }, [appOwnerId, isOwner, navigate, redirectPath]);


  // If the owner ID is still loading, return null (handled by App's main loader)
  if (appOwnerId === null) {
      return null; 
  }

  // If the owner check passed, render the children
  if (isOwner) {
      return children;
  }
  
  // If the check failed (user is not owner), we rely on the useEffect hook above
  // to navigate away, so we return null during the render phase.
  return null; 
};
// --- End ProtectedRoute Component ---


function App() {
  const [user, setUser] = useState(null);
  const [userProgress, setUserProgress] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  
  // Admin state
  const [appOwnerId, setAppOwnerId] = useState(null); 
  const [ownerLoading, setOwnerLoading] = useState(true);

  // Initialize authentication listener and fetch owner ID
  useEffect(() => {
    // 1. Set up Auth Listener
    const unsubscribe = onAuthStateChange(async (user) => {
      setUser(user);
      
      if (user) {
        try {
          // IMPORTANT: Check that the UID you are logged in with matches the UID you placed in the owner document.
          console.log("Current signed-in UID:", user.uid); 
          const progress = await getUserProgress(user.uid);
          setUserProgress(progress);
        } catch (error) {
          console.error("Failed to load user progress:", error);
          setUserProgress(null);
        }
      } else {
        setUserProgress(null);
        console.log("User signed out, progress cleared");
      }
      
      setAuthLoading(false);
    });
    
    // 2. Fetch App Owner ID
    const fetchAppOwner = async () => {
        try {
            const ownerRef = doc(db, 'artifacts', APP_ID, 'metadata', 'owner');
            const ownerSnap = await getDoc(ownerRef);
            
            if (ownerSnap.exists()) {
                const ownerData = ownerSnap.data();
                setAppOwnerId(ownerData.userId); 
                console.log("Fetched App Owner ID:", ownerData.userId);
            } else {
                setAppOwnerId('OWNER_NOT_CONFIGURED');
                console.error("Owner metadata document does not exist! Admin access will be denied.");
            }
        } catch (error) {
            console.error("Error fetching app owner ID:", error);
            setAppOwnerId('ERROR');
        } finally {
            setOwnerLoading(false);
        }
    };
    
    fetchAppOwner();

    return () => unsubscribe();
  }, []);

  const refreshUserProgress = async () => {
    if (user) {
      try {
        const updatedProgress = await getUserProgress(user.uid);
        setUserProgress(updatedProgress);
      } catch (error) {
        console.error("Failed to refresh user progress:", error);
      }
    }
  };

  if (authLoading || ownerLoading) { 
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text/60">Loading application data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg text-text">
      <Navbar user={user} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/courses" element={<CoursesPage />} /> 
          <Route path="/courses/:courseId" element={<CourseDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/careers" element={<CareerPage />} />
            
          {/* PROTECTED ADMIN ROUTE */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute user={user} appOwnerId={appOwnerId}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
            
          <Route 
            path="/abacus-learning" 
            element={
              <AbacusPage 
                user={user}
                userProgress={userProgress}
                onProgressUpdate={refreshUserProgress}
              />
            } 
          /> 

          <Route path="/enroll" element={<EnrollmentPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          {/* 404 Catch-all route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer /> 
    </div>
  );
}

export default App;
