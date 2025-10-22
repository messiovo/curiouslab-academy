// src/pages/AbacusPage.jsx
import React, { useState, useEffect } from 'react';
import Abacus from '../components/Abacus';
import PracticeMode from '../components/PracticeMode';
import GameTime from '../components/GameTime';
import AuthModal from '../components/AuthModal';
import { BookOpen, Calculator, Brain, Target, GamepadIcon, ChevronDown, ChevronUp, User, LogOut, Crown } from 'lucide-react';
import { logout } from '../auth/authService';

const AbacusPage = ({ user, userProgress, onProgressUpdate }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [mode, setMode] = useState('free'); // 'free', 'practice', or 'game'
  const [showInstructions, setShowInstructions] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  // Check if user has premium access (logged in)
  const hasPremiumAccess = !!user;

  // Handle mode change - game mode now accessible without login
  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  // Handle successful authentication
  const handleAuthSuccess = (authenticatedUser) => {
    setShowAuthModal(false);
    console.log("User authenticated, staying in current mode");
  };

  // Handle login required from GameTime component
  const handleLoginRequired = () => {
    setShowAuthModal(true);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      setMode('free'); // Reset to free mode when logged out
      console.log("User logged out, switched to free mode");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Auto-refresh progress when user changes
  useEffect(() => {
    if (user && onProgressUpdate) {
      onProgressUpdate();
    }
  }, [user, onProgressUpdate]);

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Header */}
<div className="bg-card-bg shadow-lg">
  <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
    {/* Main content row - becomes column on mobile */}
    <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
      {/* Title and description */}
      <div className="text-center sm:text-left flex-1 order-2 sm:order-1">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2">
          Interactive Abacus
        </h1>
        <p className="text-text/70 text-sm sm:text-base lg:text-lg px-2 sm:px-0">
          Learn mental math by moving the beads!{' '}
          <span className="hidden sm:inline">Click beads to activate them.</span>
          <span className="sm:hidden">Tap beads to activate them.</span>
        </p>
      </div>
      
      {/* User Status - stacks under on mobile */}
      <div className="flex items-center justify-center sm:justify-end w-full sm:w-auto order-1 sm:order-2">
        {user ? (
          <div className="flex items-center space-x-2 bg-primary/10 rounded-lg px-3 py-2 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center space-x-2">
              <Crown size={16} className="text-yellow-500" />
              <div className="text-right sm:text-left">
                <p className="text-xs text-primary font-semibold">Premium User</p>
                <p className="text-xs text-text/60 truncate max-w-32 sm:max-w-24">
                  {user.displayName || user.email}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors"
              title="Logout"
            >
              <LogOut size={14} className="text-red-500" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowAuthModal(true)}
            className="flex items-center space-x-2 bg-primary text-white px-3 py-2 rounded-lg hover:bg-primary/80 transition-colors text-sm w-full sm:w-auto justify-center"
          >
            <User size={16} />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </div>
  </div>
</div>

      {/* Mode Selection */}
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Mobile: Stacked buttons */}
        <div className="flex flex-col sm:hidden space-y-2 mb-6">
          <button
            onClick={() => handleModeChange('free')}
            className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-colors touch-manipulation ${
              mode === 'free'
                ? 'bg-primary text-white'
                : 'bg-card-bg text-text active:bg-primary/20'
            }`}
          >
            <Calculator size={18} />
            <span>Free Mode</span>
          </button>
          <button
            onClick={() => handleModeChange('practice')}
            className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-colors touch-manipulation ${
              mode === 'practice'
                ? 'bg-primary text-white'
                : 'bg-card-bg text-text active:bg-primary/20'
            }`}
          >
            <Target size={18} />
            <span>Practice Mode</span>
          </button>
          <button
            onClick={() => handleModeChange('game')}
            className={`relative flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-colors touch-manipulation ${
              mode === 'game'
                ? 'bg-primary text-white'
                : 'bg-card-bg text-text active:bg-primary/20'
            }`}
          >
            <GamepadIcon size={18} />
            <span>Game Time</span>
            {!hasPremiumAccess && (
              <span className="text-xs bg-yellow-500 text-white px-2 py-0.5 rounded-full ml-2">
                2 Free
              </span>
            )}
          </button>
        </div>

        {/* Desktop: Horizontal buttons */}
        <div className="hidden sm:flex justify-center space-x-2 lg:space-x-4 mb-6 lg:mb-8">
          <button
            onClick={() => handleModeChange('free')}
            className={`flex items-center space-x-2 px-4 lg:px-6 py-2 lg:py-3 rounded-lg font-semibold transition-colors ${
              mode === 'free'
                ? 'bg-primary text-white'
                : 'bg-card-bg text-text hover:bg-primary/20'
            }`}
          >
            <Calculator size={20} />
            <span className="text-sm lg:text-base">Free Mode</span>
          </button>
          <button
            onClick={() => handleModeChange('practice')}
            className={`flex items-center space-x-2 px-4 lg:px-6 py-2 lg:py-3 rounded-lg font-semibold transition-colors ${
              mode === 'practice'
                ? 'bg-primary text-white'
                : 'bg-card-bg text-text hover:bg-primary/20'
            }`}
          >
            <Target size={20} />
            <span className="text-sm lg:text-base">Practice Mode</span>
          </button>
          <button
            onClick={() => handleModeChange('game')}
            className={`relative flex items-center space-x-2 px-4 lg:px-6 py-2 lg:py-3 rounded-lg font-semibold transition-colors ${
              mode === 'game'
                ? 'bg-primary text-white'
                : 'bg-card-bg text-text hover:bg-primary/20'
            }`}
          >
            <GamepadIcon size={20} />
            <span className="text-sm lg:text-base">Game Time</span>
            {!hasPremiumAccess && (
              <span className="text-xs bg-yellow-500 text-white px-2 py-0.5 rounded-full ml-2">
                2 Free Stages
              </span>
            )}
          </button>
        </div>

        {/* Free stages info banner for non-authenticated users in game mode */}
        {!user && mode === 'game' && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-400 rounded-xl p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Crown size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                  Try 2 Free Stages!
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Play Apple Race and Orange Challenge for free. Sign in to unlock all 5 stages and save your progress!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* User Progress Display */}
        {user && userProgress && (
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <User size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary">Welcome back!</h3>
                  <p className="text-sm text-text/60">
                    Stage {userProgress.currentStage + 1} • 
                    {userProgress.earnedPrizes?.length || 0} prizes earned
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-text/60">Total Score</p>
                <p className="text-lg font-bold text-primary">
                  {userProgress.totalScore?.toLocaleString() || 0}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="space-y-6">
          {/* GameTime Component - Now accessible without login */}
          {mode === 'game' && (
            <div className="w-full">
              <GameTime 
                currentValue={currentValue} 
                user={user}
                userProgress={userProgress}
                onProgressUpdate={onProgressUpdate}
                onLoginRequired={handleLoginRequired}
              />
            </div>
          )}

          {/* Practice Mode Component - Displayed above abacus */}
          {mode === 'practice' && (
            <div className="w-full mb-4">
              <PracticeMode currentValue={currentValue} />
            </div>
          )}

          {/* Abacus - Always visible */}
          <div className="w-full pt-0 md:py-6">
            <Abacus onValueChange={setCurrentValue} />
          </div>

          {/* Mobile: Collapsible Instructions */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full bg-card-bg rounded-xl p-4 shadow-lg flex items-center justify-between touch-manipulation"
            >
              <div className="flex items-center space-x-2">
                <BookOpen size={20} className="text-primary" />
                <span className="font-bold">How to Use</span>
              </div>
              {showInstructions ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            {showInstructions && (
              <div className="bg-card-bg rounded-b-xl p-4 shadow-lg -mt-2">
                <ul className="space-y-3 text-sm text-text/80">
                  <li className="flex items-start space-x-2">
                    <span className="text-primary font-bold text-base">1.</span>
                    <span>Tap red beads (top) to add 5</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary font-bold text-base">2.</span>
                    <span>Tap blue beads (bottom) to add 1-4</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary font-bold text-base">3.</span>
                    <span>Columns: 100K, 10K, 1K, 100s, 10s, 1s</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary font-bold text-base">4.</span>
                    <span>Use buttons to clear or randomize</span>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Mobile: Collapsible Tips */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowTips(!showTips)}
              className="w-full bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4 flex items-center justify-between touch-manipulation"
            >
              <div className="flex items-center space-x-2">
                <Brain size={18} className="text-primary" />
                <span className="font-bold">Mental Math Tips</span>
              </div>
              {showTips ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            {showTips && (
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-b-xl p-4 -mt-2">
                <div className="space-y-3 text-sm text-text/70">
                  <div>
                    <p className="font-semibold text-primary mb-1">Visualization:</p>
                    <p>Picture the beads in your mind when calculating</p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary mb-1">Practice Daily:</p>
                    <p>Spend 10-15 minutes daily for muscle memory</p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary mb-1">Start Simple:</p>
                    <p>Begin with single digits, progress to larger numbers</p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary mb-1">Speed Building:</p>
                    <p>Focus on accuracy first, speed comes naturally</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Desktop: Side-by-side layout */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8">
            {/* Instructions */}
            <div className="lg:col-span-1">
              <div className="bg-card-bg rounded-xl p-6 shadow-lg mb-6">
                <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                  <BookOpen size={24} className="text-primary" />
                  <span>How to Use</span>
                </h3>
                <ul className="space-y-3 text-text/80">
                  <li className="flex items-start space-x-2">
                    <span className="text-primary font-bold">1.</span>
                    <span>Click the red beads (top) to add 5 to each column</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary font-bold">2.</span>
                    <span>Click the blue beads (bottom) to add 1-4 to each column</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary font-bold">3.</span>
                    <span>Each column represents: 100000s, 10000s, 1000s, 100s, 10s, 1s</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary font-bold">4.</span>
                    <span>Use the buttons to clear or set random numbers</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Tips */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-3 flex items-center space-x-2">
                  <Brain size={20} className="text-primary" />
                  <span>Mental Math Tips</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-text/70">
                  <div>
                    <p className="font-semibold text-primary mb-1">Visualization:</p>
                    <p>Picture the beads in your mind when doing calculations</p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary mb-1">Practice Daily:</p>
                    <p>Spend 10-15 minutes daily to build muscle memory</p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary mb-1">Start Simple:</p>
                    <p>Begin with single digits, then progress to larger numbers</p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary mb-1">Speed Building:</p>
                    <p>Focus on accuracy first, speed will come naturally</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default AbacusPage;