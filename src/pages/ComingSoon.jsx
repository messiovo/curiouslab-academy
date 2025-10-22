// src/pages/ComingSoon.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';

const ComingSoon = ({ title = "Module" }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg text-text flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* RoboBuddy Animation */}
          <div className="text-8xl mb-6 animate-bounce">
            🤖
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--color-primary)' }}>
            Coming Soon: {title}
          </h1>

          {/* Description */}
          <div className="bg-card-bg rounded-xl p-8 shadow-lg mb-8">
            <div className="flex items-start space-x-4 mb-6">
              <Sparkles size={32} style={{ color: 'var(--color-secondary)' }} className="flex-shrink-0" />
              <div className="text-left">
                <p className="text-text/80 text-lg mb-4">
                  <span className="font-semibold" style={{ color: 'var(--color-primary)' }}>Beep boop!</span> RoboBuddy here! 
                  This module is currently under construction. My circuits are working hard to bring you an amazing learning experience!
                </p>
                <div className="rounded-lg p-4 text-sm text-text/70" style={{ backgroundColor: 'rgba(74, 144, 226, 0.1)' }}>
                  <p className="font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>🔧 What's Being Built:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Interactive lessons and exercises</li>
                    <li>Gamified learning experiences</li>
                    <li>Progress tracking and achievements</li>
                    <li>Real-time feedback from RoboBuddy</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Fun Message */}
            <div className="rounded-lg p-4 text-sm" style={{ backgroundColor: 'rgba(74, 144, 226, 0.05)' }}>
              <p className="text-text/70">
                <span className="font-semibold" style={{ color: 'var(--color-primary)' }}>💡 Meanwhile:</span> Check out the 
                <span className="font-semibold"> Place Value </span> module to start your abacus journey! 
                It's already available and packed with features. <span className="text-lg">✨</span>
              </p>
            </div>
          </div>

          {/* Back Button */}
          <button
            onClick={() => navigate('/abacus-learning')}
            className="text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto hover:opacity-90"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>

          {/* Additional Info */}
          <p className="mt-8 text-text/60 text-sm">
            Want to be notified when this module launches? Sign in to save your preferences!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;