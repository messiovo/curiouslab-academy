// src/pages/AbacusPage.jsx
import React, { useState } from 'react';
import Abacus from '../components/Abacus';
import PracticeMode from '../components/PracticeMode';
import { BookOpen, Calculator, Brain, Target } from 'lucide-react';

const AbacusPage = () => {
  const [currentValue, setCurrentValue] = useState(0);
  const [mode, setMode] = useState('free'); // 'free' or 'practice'

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Header */}
      <div className="bg-card-bg shadow-lg">
        <div className="container mx-auto px-6 py-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              Interactive Abacus
            </h1>
            <p className="text-text/70 text-lg">
              Learn mental math by moving the beads! Click beads to activate them.
            </p>
          </div>
        </div>
      </div>

      {/* Mode Selection */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setMode('free')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
              mode === 'free'
                ? 'bg-primary text-white'
                : 'bg-card-bg text-text hover:bg-primary/20'
            }`}
          >
            <Calculator size={20} />
            <span>Free Mode</span>
          </button>
          <button
            onClick={() => setMode('practice')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
              mode === 'practice'
                ? 'bg-primary text-white'
                : 'bg-card-bg text-text hover:bg-primary/20'
            }`}
          >
            <Target size={20} />
            <span>Practice Mode</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                  <span>Each column represents: 1000s, 100s, 10s, 1s</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary font-bold">4.</span>
                  <span>Use the buttons to clear or set random numbers</span>
                </li>
              </ul>
            </div>

            {/* Practice Mode Component */}
            {mode === 'practice' && (
              <PracticeMode currentValue={currentValue} />
            )}
          </div>

          {/* Abacus */}
          <div className="lg:col-span-2">
            <Abacus onValueChange={setCurrentValue} />
            
            {/* Tips */}
            <div className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6">
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
  );
};

export default AbacusPage;