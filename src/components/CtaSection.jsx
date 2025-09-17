// src/components/CtaSection.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const CtaSection = ({ title, primaryBtnText, primaryBtnLink, secondaryBtnText, secondaryBtnLink }) => {
  // If no title is provided, don't render anything
  if (!title) {
    return null;
  }

  return (
    <section className="py-20 bg-card-bg text-text">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">{title}</h2>
        <div className="flex justify-center items-center flex-wrap gap-4">
          
          {/* Primary Button (conditionally rendered) */}
          {primaryBtnText && primaryBtnLink && (
            <Link
              to={primaryBtnLink}
              className="bg-secondary text-white py-3 px-8 rounded-md font-semibold hover:opacity-90 transition-opacity text-lg"
            >
              {primaryBtnText}
            </Link>
          )}

          {/* Secondary Button (conditionally rendered) */}
          {secondaryBtnText && secondaryBtnLink && (
            <Link
              to={secondaryBtnLink}
              className="bg-bg text-text py-3 px-8 rounded-md font-semibold hover:bg-black/5 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 transition-colors text-lg"
            >
              {secondaryBtnText}
            </Link>
          )}

        </div>
      </div>
    </section>
  );
};

export default CtaSection;