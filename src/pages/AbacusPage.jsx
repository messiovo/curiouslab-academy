// src/pages/AbacusPage.jsx
import React, { useState } from 'react';
import Abacus from '../components/Abacus';
import PracticeMode from '../components/PracticeMode';
import GameTime from '../components/GameTime';
import { BookOpen, Calculator, Brain, Target, GamepadIcon, ChevronDown, ChevronUp } from 'lucide-react';

const AbacusPage = () => {
  const [currentValue, setCurrentValue] = useState(0);
  const [mode, setMode] = useState('free'); // 'free', 'practice', or 'game'
  const [showInstructions, setShowInstructions] = useState(false);
  const [showTips, setShowTips] = useState(false);

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Header */}
      <div className="bg-card-bg shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2">
              Interactive Abacus
            </h1>
            <p className="text-text/70 text-sm sm:text-base lg:text-lg px-2">
              Learn mental math by moving the beads!{' '}
              <span className="hidden sm:inline">Click beads to activate them.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Mode Selection */}
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Mobile: Stacked buttons */}
        <div className="flex flex-col sm:hidden space-y-2 mb-6">
          <button
            onClick={() => setMode('free')}
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
            onClick={() => setMode('practice')}
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
            onClick={() => setMode('game')}
            className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-colors touch-manipulation ${
              mode === 'game'
                ? 'bg-primary text-white'
                : 'bg-card-bg text-text active:bg-primary/20'
            }`}
          >
            <GamepadIcon size={18} />
            <span>Game Time</span>
          </button>
        </div>

        {/* Desktop: Horizontal buttons */}
        <div className="hidden sm:flex justify-center space-x-2 lg:space-x-4 mb-6 lg:mb-8">
          <button
            onClick={() => setMode('free')}
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
            onClick={() => setMode('practice')}
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
            onClick={() => setMode('game')}
            className={`flex items-center space-x-2 px-4 lg:px-6 py-2 lg:py-3 rounded-lg font-semibold transition-colors ${
              mode === 'game'
                ? 'bg-primary text-white'
                : 'bg-card-bg text-text hover:bg-primary/20'
            }`}
          >
            <GamepadIcon size={20} />
            <span className="text-sm lg:text-base">Game Time</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* GameTime Component - Displayed above abacus in vertical stack */}
          {mode === 'game' && (
            <div className="w-full">
              <GameTime currentValue={currentValue} />
            </div>
          )}

          {/* Practice Mode Component - Displayed above abacus */}
          {mode === 'practice' && (
            <div className="w-full mb-4">
              <PracticeMode currentValue={currentValue} />
            </div>
          )}

          {/* Abacus - Always visible at the bottom */}
          <div className="w-full">
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
    </div>
  );
};

export default AbacusPage;