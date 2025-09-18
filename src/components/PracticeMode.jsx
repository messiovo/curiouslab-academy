import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';

const PracticeMode = ({ currentValue, onSetTarget }) => {
  const [targetNumber, setTargetNumber] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const generateNewProblem = () => {
    const newTarget = Math.floor(Math.random() * 99999) + 1;
    setTargetNumber(newTarget);
    setIsCorrect(null);
    if (onSetTarget) onSetTarget(newTarget);
  };

  const checkAnswer = () => {
    const correct = currentValue === targetNumber;
    setIsCorrect(correct);
    setAttempts(prev => prev + 1);
    
    if (correct) {
      setScore(prev => prev + 1);
      setTimeout(() => {
        generateNewProblem();
      }, 1500);
    }
  };

  useEffect(() => {
    generateNewProblem();
  }, []);

  return (
    <div className="bg-card-bg rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-center mb-4 text-text">Practice Mode</h3>
      
      <div className="text-center mb-4">
        <p className="text-lg mb-2 text-text/80">Set the abacus to show:</p>
        <div className="text-4xl font-bold text-primary mb-4">{targetNumber}</div>
        
        <div className="flex justify-center items-center space-x-4 mb-4">
          <div className="text-sm text-text/70">
            Your answer: <span className="font-bold text-secondary">{currentValue}</span>
          </div>
          {isCorrect !== null && (
            <div className={`flex items-center space-x-1 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {isCorrect ? <CheckCircle size={20} /> : <XCircle size={20} />}
              <span className="font-semibold">
                {isCorrect ? 'Correct!' : 'Try again!'}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={checkAnswer}
          className="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-lg font-semibold transition-colors mb-4"
        >
          Check Answer
        </button>

        <div className="flex justify-center space-x-6 text-sm text-text/70">
          <div>Score: <span className="font-bold text-green-600">{score}</span></div>
          <div>Attempts: <span className="font-bold">{attempts}</span></div>
          <div>Accuracy: <span className="font-bold text-primary">
            {attempts > 0 ? Math.round((score / attempts) * 100) : 0}%
          </span></div>
        </div>

        <button
          onClick={generateNewProblem}
          className="mt-4 bg-secondary hover:bg-secondary/80 text-gray-800 px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2 mx-auto"
        >
          <RefreshCw size={16} />
          <span>New Problem</span>
        </button>
      </div>
    </div>
  );
};

export default PracticeMode;