// src/pages/CoursesPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { coursesData } from '../data/courses.jsx'; 
import TestimonialsSlider from '../components/TestimonialsSlider';
import CtaSection from '../components/CtaSection';
import courseHeroImage from '../assets/images/coursehero.webp';

const CoursesPage = () => {
  return (
    <div>
      {/* 1. New Hero Section */}
     <section 
        className="relative bg-cover bg-center py-20 md:py-60 text-white" 
        style={{ backgroundImage: `url(${courseHeroImage})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Our Courses</h1>
          <p className="text-lg mt-3 max-w-2xl mx-auto">
            Explore our wide range of programs designed to spark curiosity and build skills in a fun, interactive way.
          </p>
        </div>
      </section>

      <section className="py-20 bg-bg text-text">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coursesData.map((course) => (
              <div 
                key={course.title}
                className="bg-card-bg p-8 rounded-lg shadow-lg flex flex-col items-center text-center transition-transform transform hover:-translate-y-2"
              >
                <div className="bg-primary/10 p-4 rounded-full mb-6">
                  {course.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{course.title}</h3>
                <p className="flex-grow mb-6 text-text/80">{course.description}</p>
                <Link
                  to={course.href}
                  className="font-semibold text-primary dark:text-secondary hover:underline"
                >
                  View Course
                </Link>
              </div>
            ))}
          </div>
        </div>
       
      </section>
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

export default CoursesPage;