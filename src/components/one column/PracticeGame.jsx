// src/components/oneColumn/PracticeGame.jsx
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, RefreshCw, Award, Volume2, VolumeX } from 'lucide-react';
import { speedSettings, feedbackMessages } from '../../data/oneColumnNoFriends';
import { saveStageProgress } from '../../auth/oneColumnProgress';
import AnimatedCharacter from '../AnimatedCharacter';
import { ttsService } from '../../utils/ttsService'; // Import TTS service

const PracticeGame = ({ stage, speed, user, onBack, questions }) => {
  const [gameState, setGameState] = useState('intro');
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [currentNumberIndex, setCurrentNumberIndex] = useState(0);
  const [displayedNumbers, setDisplayedNumbers] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showRoboBuddy, setShowRoboBuddy] = useState(false);
  const [roboBuddyMood, setRoboBuddyMood] = useState('happy');
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const inputRef = useRef(null);

  // USE questions prop instead of stage.problems
  const currentQuestion = questions[currentProblemIndex];
  const currentProblem = currentQuestion?.problem || '';
  const correctAnswer = currentQuestion?.answer || 0;
  const speedDelay = speedSettings[speed].delay;

  // Initialize TTS service
  useEffect(() => {
    // Load TTS service on component mount
    return () => {
      // Clean up TTS on unmount
      ttsService.stop();
    };
  }, []);

  // Toggle mute function
  const toggleMute = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    
    if (newMuteState) {
      ttsService.mute();
    } else {
      ttsService.unmute();
    }
  };

  // Convert feedback messages to RoboBuddy format with robot sounds
  const convertToRoboBuddyMessage = (message) => {
    const robotSounds = ['Beep boop', 'Whirr', 'bzzt', 'boop'];
    const randomSound = robotSounds[Math.floor(Math.random() * robotSounds.length)];
    return `${randomSound} ${message}`;
  };

  // Speak numbers one by one
  const speakCurrentNumber = () => {
    if (!currentProblem || isMuted) return;
    
    const numbers = currentProblem.split(/([+\-])/);
    if (currentNumberIndex < numbers.length) {
      const currentNumber = numbers[currentNumberIndex];
      
      // Speak the number/operator
      ttsService.speakAbacusSequence([currentNumber], {
        speed: speed,
        character: 'teacher', // Ms. Abacus voice
        onStart: () => setIsSpeaking(true),
        onEnd: () => setIsSpeaking(false)
      });
    }
  };

  // Start game intro
  useEffect(() => {
    if (gameState === 'intro') {
      const introMessage = "Beep boop Hello! I'm RoboBuddy! Let's practice together and have fun with numbers!Get ready!!! Whirr";
      setFeedbackMessage(introMessage);
      setShowRoboBuddy(true);
      setRoboBuddyMood('happy');
      
      // Speak intro message with RoboBuddy voice
      if (!isMuted) {
        ttsService.speakText(introMessage, {
          speed: speed,
          character: 'robot',
          pitch: 0.8
        });
      }
      
      const timer = setTimeout(() => {
        setGameState('calling');
        setShowRoboBuddy(false);
      }, 9000);
      
      return () => clearTimeout(timer);
    }
  }, [gameState, speed, isMuted]);

  // Call out numbers one by one
  useEffect(() => {
    if (gameState === 'calling' && currentProblem) {
      const numbers = currentProblem.split(/([+\-])/);
      
      if (currentNumberIndex < numbers.length) {
        const timer = setTimeout(() => {
          const currentNumber = numbers[currentNumberIndex];
          setDisplayedNumbers(prev => [...prev, currentNumber]);
          
          // Speak the number
          speakCurrentNumber();
          
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
  }, [gameState, currentNumberIndex, currentProblem, speedDelay, isMuted, speed]);

  // Handle answer submission
  const handleSubmit = () => {
    const answer = parseInt(userAnswer);
    const correct = answer === correctAnswer;
    
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 1);
      const speedFeedback = feedbackMessages.correct[speed];
      const randomFeedback = speedFeedback[Math.floor(Math.random() * speedFeedback.length)];
      const robofiedMessage = convertToRoboBuddyMessage(randomFeedback);
      setFeedbackMessage(robofiedMessage);
      setRoboBuddyMood('excited');
      
      // Speak feedback with RoboBuddy voice
      if (!isMuted) {
        ttsService.speakText(robofiedMessage, {
          speed: speed,
          character: 'robot',
          pitch: 0.8
        });
      }
    } else {
      const randomFeedback = feedbackMessages.incorrect[Math.floor(Math.random() * feedbackMessages.incorrect.length)];
      const robofiedMessage = convertToRoboBuddyMessage(randomFeedback);
      setFeedbackMessage(robofiedMessage);
      setRoboBuddyMood('sad');
      
      // Speak feedback with RoboBuddy voice
      if (!isMuted) {
        ttsService.speakText(robofiedMessage, {
          speed: speed,
          character: 'robot',
          pitch: 0.7
        });
      }
    }
    
    setShowRoboBuddy(true);
    setGameState('feedback');
    
    // Auto-advance after feedback
    setTimeout(() => {
      handleNext();
    }, 3500);
  };

  // Handle next problem
  const handleNext = () => {
    setShowRoboBuddy(false);
    
    if (currentProblemIndex < questions.length - 1) {
      setCurrentProblemIndex(prev => prev + 1);
      setCurrentNumberIndex(0);
      setDisplayedNumbers([]);
      setUserAnswer('');
      setIsCorrect(null);
      setRoboBuddyMood('happy');
      setGameState('calling');
    } else {
      setGameState('completed');
      saveProgress();
    }
  };

  // Repeat current problem
  const handleRepeat = () => {
    ttsService.stop();
    setCurrentNumberIndex(0);
    setDisplayedNumbers([]);
    setGameState('calling');
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
          questions.length
        );
        console.log('Progress saved:', result);
      } catch (error) {
        console.error('Failed to save progress:', error);
      }
    }
  };

  // Restart stage
  const handleRestart = () => {
    ttsService.stop();
    setCurrentProblemIndex(0);
    setCurrentNumberIndex(0);
    setDisplayedNumbers([]);
    setUserAnswer('');
    setIsCorrect(null);
    setScore(0);
    setRoboBuddyMood('happy');
    setGameState('intro');
  };

  // Safety check - if no questions
  if (!questions || questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-card-bg rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-primary)' }}>
            No Questions Available
          </h2>
          <p className="text-text/70 mb-6">There are no questions for this stage.</p>
          <button
            onClick={onBack}
            className="flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90 shadow-lg mx-auto"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <ArrowLeft size={20} />
            <span>Back to Stages</span>
          </button>
        </div>
      </div>
    );
  }

  // Render intro screen
  if (gameState === 'intro') {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-card-bg rounded-xl p-8 shadow-lg">
          {/* RoboBuddy Intro */}
          <div className="mb-6">
            <AnimatedCharacter 
              mood={roboBuddyMood}
              message={feedbackMessage}
              position={0}
            />
          </div>

          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-primary)' }}>
            Get Ready!
          </h2>
          
          <div className="p-4 rounded-lg mb-6" style={{ backgroundColor: 'rgba(74, 144, 226, 0.1)' }}>
            <p className="text-sm text-text/70">
              <strong>Stage:</strong> {stage.title}<br />
              <strong>Speed:</strong> {speedSettings[speed].label}<br />
              <strong>Questions:</strong> {questions.length}
            </p>
          </div>

          <button
            onClick={() => setGameState('calling')}
            className="w-full py-3 text-lg font-semibold text-white rounded-lg transition-all hover:opacity-90 shadow-lg"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Start Practice
          </button>
        </div>
      </div>
    );
  }

  // Render completed screen
  if (gameState === 'completed') {
    const accuracy = Math.round((score / questions.length) * 100);
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
                <span className="font-semibold">Session Completed! 🎊</span>
              </div>
            )}
          </div>

          {/* RoboBuddy Message */}
          <div className="mb-6">
            <AnimatedCharacter 
              mood={passed ? 'winner' : 'happy'}
              message={passed 
                ? `Beep boop Amazing work! You've completed ${questions.length} questions at ${speedSettings[speed].label} speed! Whirr You're a math champion!`
                : `boop Keep practicing! You completed ${questions.length} questions. Beep beep I believe in you!`}
              position={0}
            />
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
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-card-bg transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          
          <button
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-card-bg transition-colors"
            title={isMuted ? "Unmute voice" : "Mute voice"}
          >
            {isMuted ? (
              <VolumeX size={20} className="text-red-500" />
            ) : (
              <Volume2 size={20} className="text-primary" />
            )}
          </button>
        </div>
        
        <div className="text-right">
          <p className="text-sm text-text/60">Question {currentProblemIndex + 1} of {questions.length}</p>
          <p className="text-lg font-bold" style={{ color: 'var(--color-primary)' }}>
            Score: {score}/{questions.length}
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
            {isSpeaking && (
              <span className="text-2xl animate-pulse">🔊</span>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={handleRepeat}
            className="px-4 py-2 rounded-lg font-semibold transition-all hover:opacity-90"
            style={{ 
              backgroundColor: 'rgba(74, 144, 226, 0.1)',
              color: 'var(--color-primary)'
            }}
          >
            Repeat Numbers
          </button>
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
          <div className={`p-6 rounded-xl text-center ${isCorrect ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
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

      {/* RoboBuddy Feedback with AnimatedCharacter */}
      {showRoboBuddy && (
        <div className="mb-6">
          <AnimatedCharacter 
            mood={roboBuddyMood}
            message={feedbackMessage}
            position={0}
          />
        </div>
      )}
    </div>
  );
};

export default PracticeGame;