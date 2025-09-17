// src/components/Hero.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Hero = ({ image, title, subtitle, btnText, btnLink }) => {
  return (
    <section 
      className="relative bg-cover bg-center py-20 md:py-60 text-white" 
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-bold">{title}</h1>
        
        {/* Conditionally render the subtitle if it's provided */}
        {subtitle && (
          <p className="text-lg mt-3 max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
        
        {/* Conditionally render the button if its text and link are provided */}
        {btnText && btnLink && (
          <div className="mt-12">
            <Link
              to={btnLink}
              className="bg-primary text-white py-3 px-8 rounded-md font-semibold hover:opacity-90 transition-opacity text-lg"
            >
              {btnText}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;