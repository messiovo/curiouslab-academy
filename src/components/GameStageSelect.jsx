// src/components/GameStageSelect.jsx
import React from 'react';
import { Lock, Trophy, Star } from 'lucide-react';

const GameStageSelect = ({ stages, currentStage, unlockedStages, onStageSelect, earnedPrizes }) => {
  return (
    <div className="bg-card-bg rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-center text-text mb-6">Choose Your Challenge</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stages.map((stage, index) => {
          const isUnlocked = index <= unlockedStages;
          const isCompleted = earnedPrizes.includes(stage.prize);
          const isCurrent = index === currentStage;

          return (
            <button
              key={index}
              onClick={() => isUnlocked && onStageSelect(index)}
              disabled={!isUnlocked}
              className={`
                relative p-6 rounded-lg border-2 transition-all duration-200 transform hover:scale-105
                ${isCurrent 
                  ? 'border-primary bg-primary/10 ring-2 ring-primary/30' 
                  : isCompleted
                    ? 'border-green-400 bg-green-50 dark:bg-green-900/20'
                    : isUnlocked
                      ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-primary'
                      : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 cursor-not-allowed opacity-50'
                }
              `}
            >
              {/* Stage Number */}
              <div className="text-sm font-bold text-text/70 mb-2">Stage {index + 1}</div>

              {/* Prize */}
              <div className="text-4xl mb-3">{stage.prize}</div>

              {/* Stage Name */}
              <div className="font-bold text-lg text-text mb-2">{stage.name}</div>

              {/* Difficulty Range */}
              <div className="text-sm text-text/60 mb-3">
                Numbers: 1 - {stage.maxValue.toLocaleString()}
              </div>

              {/* Status Icons */}
              <div className="absolute top-2 right-2">
                {!isUnlocked && <Lock size={16} className="text-gray-400" />}
                {isCompleted && <Trophy size={16} className="text-yellow-500" />}
                {isCurrent && <Star size={16} className="text-primary animate-pulse" />}
              </div>

              {/* Completion Badge */}
              {isCompleted && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Trophy size={16} className="text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GameStageSelect;