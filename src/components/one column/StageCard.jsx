// src/components/oneColumn/StageCard.jsx
import React, { useState } from 'react';
import { Lock, Trophy, CheckCircle, Play } from 'lucide-react';

const StageCard = ({ stage, isLocked, onSelect, userProgress, onLoginRequired }) => {
  const [selectedSpeed, setSelectedSpeed] = useState('medium');

  const handleStartClick = () => {
    if (isLocked) {
      onLoginRequired();
    } else {
      onSelect(stage, selectedSpeed);
    }
  };

  const isCompleted = userProgress?.completed || false;
  const accuracy = userProgress?.accuracy || 0;

  return (
    <div className={`
      relative bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20
      border-2 border-blue-300 dark:border-blue-700
      rounded-2xl p-6 shadow-lg
      transition-all duration-300 transform hover:scale-105
      ${isLocked ? 'opacity-75' : ''}
    `}>
      {/* Lock Overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-gray-900/40 dark:bg-gray-900/60 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
          <div className="text-center">
            <Lock size={48} className="text-white mx-auto mb-2" />
            <p className="text-white font-semibold text-sm">Sign in to unlock!</p>
          </div>
        </div>
      )}

      {/* Completion Badge */}
      {isCompleted && (
        <div className="absolute -top-3 -right-3 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center z-20 shadow-lg">
          <Trophy size={24} className="text-white" />
        </div>
      )}

      {/* Free Badge */}
      {stage.free && (
        <div className="absolute -top-2 -left-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-md">
          FREE
        </div>
      )}

      {/* Stage Number */}
      <div className="text-sm font-bold text-text/70 mb-2">Stage {stage.id}</div>

      {/* Title */}
      <h3 className="text-xl font-bold text-text mb-2">{stage.title}</h3>

      {/* Description */}
      <p className="text-sm text-text/60 mb-4">{stage.description}</p>

      {/* Progress Info */}
      {userProgress && (
        <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: 'rgba(74, 144, 226, 0.1)' }}>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle size={16} style={{ color: 'var(--color-primary)' }} />
              <span className="font-semibold" style={{ color: 'var(--color-primary)' }}>
                {accuracy}% Accuracy
              </span>
            </div>
            <span className="text-xs text-text/60 capitalize">
              Best: {userProgress.speed}
            </span>
          </div>
        </div>
      )}

      {/* Speed Selector */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-text/70 mb-2">
          Choose Speed:
        </label>
        <select
          value={selectedSpeed}
          onChange={(e) => setSelectedSpeed(e.target.value)}
          className="w-full px-3 py-2 border-2 rounded-lg text-text bg-bg transition-colors focus:outline-none focus:ring-2"
          style={{ borderColor: 'var(--color-primary)' }}
          disabled={isLocked}
        >
          <option value="slow">Slow 🐢 (1.5s)</option>
          <option value="medium">Medium 🚶 (1s)</option>
          <option value="superfast">Super Fast ⚡ (0.6s)</option>
        </select>
      </div>

      {/* Start Button */}
      <button
        onClick={handleStartClick}
        className="w-full text-white px-4 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-2 hover:opacity-90"
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        <Play size={18} />
        <span>{isLocked ? 'Sign In to Start' : 'Start Practice'}</span>
      </button>

      {/* Problem Count */}
      <div className="mt-3 text-center text-xs text-text/60">
        {stage.problems.length} problems in this stage
      </div>
    </div>
  );
};

export default StageCard;