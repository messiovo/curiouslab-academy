// src/components/AboutSection.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you use Link here too

// Import the image for the about section
import teacherKidsImage from '../assets/images/teacher-kids.jpg'; 

const AboutSection = () => {
  return (
    <section className="py-20 bg-bg text-text">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-xl md:text-3xl font-bold mb-4">Why CuriousLab Academy?</h2>
            <p className="mb-4">
              At CuriousLab Academy, we believe learning should be an exciting adventure. Our innovative approach combines interactive lessons, hands-on activities, and engaging content to spark curiosity in young minds.
            </p>
            <p className="mb-6">
              Our experienced educators create a nurturing environment where children can explore, experiment, and develop a lifelong love for learning.
            </p>
            <Link to="/about" className="bg-primary text-white py-2 px-6 rounded-md hover:opacity-90 transition-opacity">
              Learn More
            </Link>
          </div>
          <div className="md:w-1/2">
            <img src={teacherKidsImage} alt="Teacher interacting with children" className="rounded-lg shadow-xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;