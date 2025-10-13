// src/components/GameStageSelect.jsx
import React from 'react';
import { Lock, Trophy, Star, Crown, User } from 'lucide-react';

const GameStageSelect = ({ 
  stages, 
  currentStage, 
  unlockedStages, 
  onStageSelect, 
  earnedPrizes, 
  user,
  onLoginRequired 
}) => {
  // Define which stages require premium access (stages 3+ = index 2+)
  const PREMIUM_STAGE_START = 2;

  const handleStageClick = (index) => {
    const isPremiumStage = index >= PREMIUM_STAGE_START;
    const hasAuth = !!user;
    const isUnlockedByProgress = index <= unlockedStages;

    // Check if stage requires authentication
    if (isPremiumStage && !hasAuth) {
      if (onLoginRequired) {
        onLoginRequired(index + 1); // Pass stage number (1-indexed) to parent
      }
      return;
    }

    // Check if stage is unlocked by game progress
    if (isUnlockedByProgress) {
      onStageSelect(index);
    }
  };

  return (
    <div className="bg-card-bg rounded-xl p-6 shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-text mb-2">Choose Your Challenge</h2>
        {user ? (
          <div className="flex items-center justify-center space-x-2 text-sm text-primary">
            <Crown size={16} className="text-yellow-500" />
            <span>Premium Access Unlocked</span>
          </div>
        ) : (
          <p className="text-sm text-text/60">
            Sign in to unlock premium stages (3+) and save your progress
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stages.map((stage, index) => {
          const isPremiumStage = index >= PREMIUM_STAGE_START;
          const hasAuth = !!user;
          const isUnlockedByProgress = index <= unlockedStages;
          const isUnlocked = isUnlockedByProgress && (isPremiumStage ? hasAuth : true);
          const isCompleted = earnedPrizes.includes(stage.prize);
          const isCurrent = index === currentStage;
          const needsAuth = isPremiumStage && !hasAuth;

          return (
            <button
              key={index}
              onClick={() => handleStageClick(index)}
              disabled={!isUnlocked && !needsAuth} // Allow clicking auth-required stages
              className={`
                relative p-6 rounded-lg border-2 transition-all duration-200 transform hover:scale-105
                ${isCurrent 
                  ? 'border-primary bg-primary/10 ring-2 ring-primary/30' 
                  : isCompleted
                    ? 'border-green-400 bg-green-50 dark:bg-green-900/20'
                    : isUnlocked
                      ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-primary'
                      : needsAuth
                        ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 hover:from-yellow-100 hover:to-amber-100 dark:hover:from-yellow-900/30 dark:hover:to-amber-900/30 cursor-pointer'
                        : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 cursor-not-allowed opacity-50'
                }
                ${isPremiumStage ? 'ring-1 ring-yellow-200 dark:ring-yellow-800' : ''}
              `}
            >
              {/* Premium Badge */}
              {isPremiumStage && (
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Crown size={12} className="text-white" />
                </div>
              )}

              {/* Stage Number */}
              <div className="text-sm font-bold text-text/70 mb-2 flex items-center justify-between">
                <span>Stage {index + 1}</span>
                {isPremiumStage && (
                  <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full">
                    Premium
                  </span>
                )}
              </div>

              {/* Prize */}
              <div className="text-4xl mb-3">{stage.prize}</div>

              {/* Stage Name */}
              <div className="font-bold text-lg text-text mb-2">{stage.name}</div>

              {/* Difficulty Range */}
              <div className="text-sm text-text/60 mb-3">
                Numbers: 1 - {stage.maxValue.toLocaleString()}
              </div>

              {/* Auth Required Message */}
              {needsAuth && (
                <div className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded mb-2 flex items-center justify-center space-x-1">
                  <User size={12} />
                  <span>Login Required</span>
                </div>
              )}

              {/* Status Icons */}
              <div className="absolute top-2 right-2 flex space-x-1">
                {!isUnlocked && !needsAuth && <Lock size={16} className="text-gray-400" />}
                {needsAuth && <User size={16} className="text-yellow-600" />}
                {isCompleted && <Trophy size={16} className="text-yellow-500" />}
                {isCurrent && <Star size={16} className="text-primary animate-pulse" />}
              </div>

              {/* Completion Badge */}
              {isCompleted && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center z-10">
                  <Trophy size={16} className="text-white" />
                </div>
              )}

              {/* Premium Overlay for unauthenticated users */}
              {needsAuth && (
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/20 to-transparent rounded-lg pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>

      {/* Premium Info Footer */}
      {!user && (
        <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Crown size={24} className="text-yellow-600" />
              <div>
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">
                  Unlock Premium Stages
                </h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Sign in for free to access stages 3+ and save your progress
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-yellow-600 dark:text-yellow-400">
                {stages.length - PREMIUM_STAGE_START} Premium Stages
              </p>
              <p className="text-lg font-bold text-yellow-800 dark:text-yellow-200">
                Free Account
              </p>
            </div>
          </div>
        </div>
      )}

      {/* User Progress Summary for authenticated users */}
      {user && (
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <Trophy size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-primary">
                  Welcome, {user.displayName || 'Player'}!
                </h4>
                <p className="text-sm text-text/60">
                  Current Stage: {currentStage + 1} • Prizes: {earnedPrizes.length}/{stages.length}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-primary/60">Progress</p>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(earnedPrizes.length / stages.length) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-bold text-primary">
                  {Math.round((earnedPrizes.length / stages.length) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameStageSelect;