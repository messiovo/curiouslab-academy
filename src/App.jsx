// src/App.jsx

import { Routes, Route } from 'react-router-dom';
import { auth, db } from './firebase';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AbacusPage from './pages/AbacusPage';
import NotFoundPage from './pages/NotFoundPage';
import EnrollmentPage from './pages/EnrollmentPage';
import LoginPage from './pages/LoginPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';


function App() {
  return (
    <div className="flex flex-col min-h-screen bg-bg text-text">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/courses" element={<CoursesPage />} /> 
          <Route path="/courses/:courseId" element={<CourseDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} /> 
          <Route path="/abacus-learning" element={<AbacusPage />} /> 

          <Route path="/enroll" element={<EnrollmentPage />} />
          <Route path="/login" element={<LoginPage />} />
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