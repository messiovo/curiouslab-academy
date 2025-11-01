// src/components/oneColumn/PracticeGame.jsx
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Volume2, Send, RefreshCw, Award } from 'lucide-react';
import { speedSettings, feedbackMessages, msAbacusIntros } from '../../data/oneColumnNoFriends';
import { saveStageProgress } from '../../auth/oneColumnProgress';

const PracticeGame = ({ stage, speed, user, onBack }) => {
  const [gameState, setGameState] = useState('intro'); // 'intro', 'calling', 'answering', 'feedback', 'completed'
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [currentNumberIndex, setCurrentNumberIndex] = useState(0);
  const [displayedNumbers, setDisplayedNumbers] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showRoboBuddy, setShowRoboBuddy] = useState(false);
  const inputRef = useRef(null);

  const currentProblem = stage.problems[currentProblemIndex];
  const correctAnswer = stage.answers[currentProblemIndex];
  const speedDelay = speedSettings[speed].delay;

  // Start game intro
  useEffect(() => {
    if (gameState === 'intro') {
      const introMessage = msAbacusIntros[Math.floor(Math.random() * msAbacusIntros.length)];
      setFeedbackMessage(introMessage);
      setShowRoboBuddy(true);
      
      const timer = setTimeout(() => {
        setGameState('calling');
        setShowRoboBuddy(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [gameState]);

  // Call out numbers one by one
  useEffect(() => {
    if (gameState === 'calling' && currentProblem) {
      const numbers = currentProblem.split(/([+\-])/);
      
      if (currentNumberIndex < numbers.length) {
        const timer = setTimeout(() => {
          setDisplayedNumbers(prev => [...prev, numbers[currentNumberIndex]]);
          setCurrentNumberIndex(prev => prev + 1);
        }, speedDelay);
        
        return () => clearTimeout(timer);
      } else {
        // All numbers called, show answer input
        setGameState('answering');
        setTimeout(() => {
          inputRef.current?.focus();
        }, 500);
      }
    }
  }, [gameState, currentNumberIndex, currentProblem, speedDelay]);

  // Handle answer submission
  const handleSubmit = () => {
    const answer = parseInt(userAnswer);
    const correct = answer === correctAnswer;
    
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 1);
      // Get random feedback based on speed
      const speedFeedback = feedbackMessages.correct[speed];
      const randomFeedback = speedFeedback[Math.floor(Math.random() * speedFeedback.length)];
      setFeedbackMessage(randomFeedback);
    } else {
      const randomFeedback = feedbackMessages.incorrect[Math.floor(Math.random() * feedbackMessages.incorrect.length)];
      setFeedbackMessage(randomFeedback);
    }
    
    setShowRoboBuddy(true);
    setGameState('feedback');
    
    // Auto-advance after feedback
    setTimeout(() => {
      handleNext();
    }, 2500);
  };

  // Handle next problem
  const handleNext = () => {
    setShowRoboBuddy(false);
    
    if (currentProblemIndex < stage.problems.length - 1) {
      // Move to next problem
      setCurrentProblemIndex(prev => prev + 1);
      setCurrentNumberIndex(0);
      setDisplayedNumbers([]);
      setUserAnswer('');
      setIsCorrect(null);
      setGameState('calling');
    } else {
      // All problems completed
      setGameState('completed');
      saveProgress();
    }
  };

  // Save progress to Firebase
  const saveProgress = async () => {
    if (user) {
      try {
        const result = await saveStageProgress(
          user.uid,
          stage.id,
          score,
          speed,
          stage.problems.length
        );
        console.log('Progress saved:', result);
      } catch (error) {
        console.error('Failed to save progress:', error);
      }
    }
  };

  // Restart stage
  const handleRestart = () => {
    setCurrentProblemIndex(0);
    setCurrentNumberIndex(0);
    setDisplayedNumbers([]);
    setUserAnswer('');
    setIsCorrect(null);
    setScore(0);
    setGameState('intro');
  };

  // Render intro screen
  if (gameState === 'intro') {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-card-bg rounded-xl p-8 shadow-lg">
          <div className="text-7xl mb-4">👩‍🏫</div>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-primary)' }}>
            Get Ready!
          </h2>
          <p className="text-text/70 mb-6">{feedbackMessage}</p>
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(74, 144, 226, 0.1)' }}>
            <p className="text-sm text-text/70">
              <strong>Stage:</strong> {stage.title}<br />
              <strong>Speed:</strong> {speedSettings[speed].label}<br />
              <strong>Problems:</strong> {stage.problems.length}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Render completed screen
  if (gameState === 'completed') {
    const accuracy = Math.round((score / stage.problems.length) * 100);
    const passed = accuracy >= 80;

    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-card-bg rounded-xl p-8 shadow-lg">
          <div className="text-7xl mb-4">{passed ? '🎉' : '💪'}</div>
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-primary)' }}>
            {passed ? 'Excellent Work!' : 'Keep Practicing!'}
          </h2>
          
          {/* Score Card */}
          <div className="p-6 rounded-xl mb-6" style={{ backgroundColor: 'rgba(74, 144, 226, 0.1)' }}>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>{score}</p>
                <p className="text-sm text-text/60">Correct</p>
              </div>
              <div>
                <p className="text-3xl font-bold" style={{ color: accuracy >= 80 ? 'var(--color-secondary)' : 'var(--color-text)' }}>
                  {accuracy}%
                </p>
                <p className="text-sm text-text/60">Accuracy</p>
              </div>
              <div>
                <p className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>
                  {speedSettings[speed].label.split(' ')[0]}
                </p>
                <p className="text-sm text-text/60">Speed</p>
              </div>
            </div>
            
            {passed && (
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <Award size={20} />
                <span className="font-semibold">Stage Completed! 🎊</span>
              </div>
            )}
          </div>

          {/* RoboBuddy Message */}
          <div className="mb-6">
            <div className="text-6xl mb-3">🤖</div>
            <p className="text-text/70 italic">
              {passed 
                ? `"Beep boop! Amazing work! You've mastered this stage at ${speedSettings[speed].label} speed!"`
                : '"Keep practicing! You\'re getting better with every try. Beep boop!"'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleRestart}
              className="flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90 shadow-lg"
              style={{ backgroundColor: 'var(--color-secondary)', color: '#2d3748' }}
            >
              <RefreshCw size={20} />
              <span>Try Again</span>
            </button>
            <button
              onClick={onBack}
              className="flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90 shadow-lg"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              <ArrowLeft size={20} />
              <span>Back to Stages</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render main game screen
  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-card-bg transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <div className="text-right">
          <p className="text-sm text-text/60">Problem {currentProblemIndex + 1} of {stage.problems.length}</p>
          <p className="text-lg font-bold" style={{ color: 'var(--color-primary)' }}>
            Score: {score}/{stage.problems.length}
          </p>
        </div>
      </div>

      {/* Ms. Abacus Calling */}
      <div className="bg-card-bg rounded-xl p-8 shadow-lg mb-6">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="text-5xl">👩‍🏫</div>
          <div>
            <h3 className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>
              Ms. Abacus
            </h3>
            <p className="text-sm text-text/60">{speedSettings[speed].label}</p>
          </div>
        </div>

        {/* Number Display */}
        <div className="min-h-24 flex items-center justify-center mb-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {displayedNumbers.map((num, index) => (
              <span
                key={index}
                className="text-4xl font-bold animate-bounce"
                style={{ 
                  color: num === '+' || num === '-' ? 'var(--color-secondary)' : 'var(--color-primary)',
                  animationDelay: `${index * 0.1}s`,
                  animationDuration: '0.6s',
                  animationIterationCount: '1'
                }}
              >
                {num}
              </span>
            ))}
          </div>
        </div>

        {/* Answer Input */}
        {gameState === 'answering' && (
          <div className="space-y-4">
            <p className="text-center text-lg font-semibold text-text/70">
              What's your answer?
            </p>
            <div className="flex space-x-3">
              <input
                ref={inputRef}
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && userAnswer && handleSubmit()}
                className="flex-1 px-4 py-3 text-2xl text-center border-2 rounded-lg focus:outline-none focus:ring-2 bg-bg"
                style={{ borderColor: 'var(--color-primary)' }}
                placeholder="Type answer"
              />
              <button
                onClick={handleSubmit}
                disabled={!userAnswer}
                className="px-6 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                <Send size={24} />
              </button>
            </div>
          </div>
        )}

        {/* Feedback */}
        {gameState === 'feedback' && (
          <div className={`p-6 rounded-xl text-center animate-bounce ${isCorrect ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
            <p className={`text-2xl font-bold mb-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {isCorrect ? '✓ Correct!' : '✗ Not Quite'}
            </p>
            <p className="text-lg text-text/70">
              {isCorrect ? 'Your answer: ' : 'Correct answer: '}
              <span className="font-bold">{correctAnswer}</span>
            </p>
          </div>
        )}
      </div>

      {/* RoboBuddy Feedback */}
      {showRoboBuddy && (
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 shadow-lg text-center animate-bounce">
          <div className="text-6xl mb-3">🤖</div>
          <p className="text-lg font-semibold text-text italic">
            "{feedbackMessage}"
          </p>
        </div>
      )}
    </div>
  );
};

export default PracticeGame;