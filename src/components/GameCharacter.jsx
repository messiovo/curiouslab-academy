// src/components/GameCharacter.jsx
import React from 'react';
import { Smile, Frown, Star, Trophy } from 'lucide-react';

const GameCharacter = ({ mood, message, position = 0 }) => {
  const getMoodIcon = () => {
    switch (mood) {
      case 'happy': return <Smile size={32} className="text-yellow-500" />;
      case 'excited': return <Star size={32} className="text-yellow-400" />;
      case 'winner': return <Trophy size={32} className="text-gold-400" />;
      default: return <Smile size={32} className="text-yellow-500" />;
    }
  };

  return (
    <div 
      className="flex flex-col items-center transition-all duration-500 transform"
      style={{ transform: `translateX(${position * 10}px)` }}
    >
      {/* Character Avatar */}
      <div className="relative">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
          {getMoodIcon()}
        </div>
        {mood === 'excited' && (
          <div className="absolute -top-2 -right-2 animate-bounce">
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-xs">!</span>
            </div>
          </div>
        )}
      </div>

      {/* Character Name */}
      <div className="mt-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded-full">
        <span className="text-sm font-bold text-blue-800 dark:text-blue-200">Buddy</span>
      </div>

      {/* Speech Bubble */}
      {message && (
        <div className="mt-3 relative">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg border-2 border-blue-200 dark:border-blue-700 max-w-xs">
            <p className="text-sm text-gray-800 dark:text-gray-200 text-center font-medium">
              {message}
            </p>
          </div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
            <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-blue-200 dark:border-b-blue-700"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameCharacter;
