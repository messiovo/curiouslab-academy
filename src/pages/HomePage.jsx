// src/pages/HomePage.jsx

import React from 'react';
import HeroSlider from '../components/HeroSlider';
import AboutSection from '../components/AboutSection';
import CoursesSection from '../components/CoursesSection';
import TestimonialsSlider from '../components/TestimonialsSlider';
import CtaSection from '../components/CtaSection';

const HomePage = () => {
  return (
    <div className="bg-bg text-text">
      <HeroSlider />
      <AboutSection />
      <CoursesSection />
      <TestimonialsSlider />
      <CtaSection
        title="Ready to Make Learning Fun for Your Child?"
        primaryBtnText="Sign Up Now"
        primaryBtnLink="/enroll"
        secondaryBtnText="Contact Us"
        secondaryBtnLink="/contact"
      />
    </div>
  );
};

export default HomePage;