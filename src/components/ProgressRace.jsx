// src/components/ProgressRace.jsx
import React from 'react';

const ProgressRace = ({ playerProgress, characterProgress, totalSteps, prize }) => {
  const playerPosition = (playerProgress / totalSteps) * 100;
  const characterPosition = (characterProgress / totalSteps) * 100;

  return (
    <div className="bg-card-bg rounded-xl p-6 shadow-lg">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-text mb-2">Race to the {prize}!</h3>
        <div className="text-sm text-text/70">
          Steps: {playerProgress}/{totalSteps}
        </div>
      </div>

      {/* Race Track */}
      <div className="relative bg-green-100 dark:bg-green-900 rounded-lg h-20 mb-4 overflow-hidden">
        {/* Track Lines */}
        <div className="absolute inset-0 flex">
          {[...Array(totalSteps + 1)].map((_, i) => (
            <div 
              key={i} 
              className="flex-1 border-r border-green-300 dark:border-green-700 last:border-r-0"
            />
          ))}
        </div>

        {/* Prize at the end */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-3xl">
          {prize}
        </div>

        {/* Player (bottom track) */}
        <div className="absolute bottom-2 h-6 transition-all duration-500" 
             style={{ left: `${Math.min(playerPosition, 85)}%` }}>
          <div className="w-12 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-xs font-bold">YOU</span>
          </div>
        </div>

        {/* Character (top track) */}
        <div className="absolute top-2 h-6 transition-all duration-500" 
             style={{ left: `${Math.min(characterPosition, 85)}%` }}>
          <div className="w-12 h-6 bg-secondary rounded-full flex items-center justify-center shadow-lg">
            <span className="text-gray-800 text-xs font-bold">RoboBuddy</span>
          </div>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-text w-12">You:</span>
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${playerPosition}%` }}
            />
          </div>
          <span className="text-sm font-bold text-primary">{playerProgress}</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-text w-12">Buddy:</span>
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-secondary h-2 rounded-full transition-all duration-500"
              style={{ width: `${characterPosition}%` }}
            />
          </div>
          <span className="text-sm font-bold text-secondary">{characterProgress}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressRace;