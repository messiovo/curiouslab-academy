// src/components/GameTime.jsx
import React, { useState, useEffect } from 'react';
import AnimatedCharacter from './AnimatedCharacter';
import ProgressRace from './ProgressRace';
import GameStageSelect from './GameStageSelect';
import { RefreshCw, Home, Trophy } from 'lucide-react';
import { updateUserStage, completeStage, updateGameStats } from '../auth/userProgress';

const GameTime = ({ currentValue, onSetTarget, user, userProgress, onProgressUpdate, onLoginRequired }) => {
  const [gameStages] = useState([
    { name: "Apple Race", maxValue: 99, prize: "🍎", steps: 10 },
    { name: "Orange Challenge", maxValue: 999, prize: "🍊", steps: 10 },
    { name: "Banana Contest", maxValue: 9999, prize: "🍌", steps: 10 },
    { name: "Grape Gathering", maxValue: 99999, prize: "🍇", steps: 10 },
    { name: "Watermelon Winner", maxValue: 999999, prize: "🍉", steps: 10 },
  ]);

  // Initialize state from userProgress or defaults
  const [currentStage, setCurrentStage] = useState(0);
  const [gameState, setGameState] = useState('stageSelect'); 
  const [playerProgress, setPlayerProgress] = useState(0);
  const [characterProgress, setCharacterProgress] = useState(0);
  const [characterMood, setCharacterMood] = useState('happy');
  const [characterMessage, setCharacterMessage] = useState('');
  const [unlockedStages, setUnlockedStages] = useState(1);
  const [earnedPrizes, setEarnedPrizes] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isCharacterSpeaking, setIsCharacterSpeaking] = useState(false);
  const [targetNumber, setTargetNumber] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);

  // Load user progress when component mounts or user changes
  useEffect(() => {
    if (user && userProgress) {
      setCurrentStage(userProgress.currentStage || 0);
      setUnlockedStages(userProgress.unlockedStages || 0);
      setEarnedPrizes(userProgress.earnedPrizes || []);
      console.log("Game state loaded from user progress:", {
        currentStage: userProgress.currentStage,
        unlockedStages: userProgress.unlockedStages,
        earnedPrizes: userProgress.earnedPrizes
      });
    } else if (!user) {
      // Reset to defaults for non-authenticated users
      setCurrentStage(0);
      setUnlockedStages(1);
      setEarnedPrizes([]);
      setGameState('stageSelect');
    }
  }, [user, userProgress]);

  const handleSpeakComplete = () => {
    setIsCharacterSpeaking(false);
  };
  
  const characterMessages = {
    start: [
      "Beep boop Hello friend, my name is RoboBuddy! Are you ready to race? Let's see who gets the fruit first!",
      "Whirrr... hey friend, I'm RoboBuddy! Do you think you can beat me? Ha ha, buzzt",
      "Boop I'm RoboBuddy, and I'm super fast. But maybe... just maybe, you're faster!",
      "Hello human! RoboBuddy here, beep boop Let's have some fun! May the best player win!"
    ],
    correct: [
      "Nice work! Beep boop You're getting good at this!",
      "Wow! Whirrr You're fast!",
      "bzzt Impressive! You're keeping up with me, RoboBuddy! ",
      "Beep beep Great job! This is exciting"
    ],
    nearEnd: [
      "Beep beep Oh no! You're so close to the fruit! ",
      "This is getting intense! My gears are spinning, whirr whirr",
      "You might actually beat me! bzzt bzzt",
      "Boop I can almost taste that fruit... or can you? "
    ],
    playerWin: [
      "Congratulations! You won the {prize}! My sensors say beep boop, you deserved it!",
      "Amazing! You earned that {prize}! Save me a digital bite, whirr",
      "You're too good! Enjoy your {prize}, champion! Bzzt",
      "Wow! You really are fast! That {prize} is all yours! Beep"
    ],
    characterWin: [
      "Ha ha! RoboBuddy got the {prize} this time! Whirr",
      " beep boop Better luck next time! This {prize} is delicious... even for a robot",
      "Ooh! I win! Want to try again, human friend? ",
      "boop Nice try! I'll share this {prize} with you—robots are generous too"
    ]
  };

  const getRandomMessage = (type, prize = '') => {
    const messages = characterMessages[type];
    const message = messages[Math.floor(Math.random() * messages.length)];
    return message.replace('{prize}', prize);
  };

  const generateNewProblem = () => {
    const stage = gameStages[currentStage];
    const newTarget = Math.floor(Math.random() * stage.maxValue) + 1;
    setTargetNumber(newTarget);
    setIsCorrect(null);
    if (onSetTarget) onSetTarget(newTarget);
  };

  const startStage = async (stageIndex) => {
    setCurrentStage(stageIndex);
    setGameState('playing');
    setPlayerProgress(0);
    setCharacterProgress(0);
    setCharacterMood('happy');
    setCharacterMessage(getRandomMessage('start'));
    setCurrentScore(0);
    setCurrentStreak(0);
    generateNewProblem();

    // Update user's current stage if authenticated
    if (user) {
      try {
        await updateUserStage(user.uid, stageIndex);
        if (onProgressUpdate) onProgressUpdate();
      } catch (error) {
        console.error("Failed to update current stage:", error);
      }
    }
  };

  const checkAnswer = async () => {
    const correct = currentValue === targetNumber;
    setIsCorrect(correct);

    if (correct) {
      const newPlayerProgress = playerProgress + 1;
      const newScore = currentScore + (targetNumber * (currentStreak + 1)); // Bonus for streaks
      const newStreak = currentStreak + 1;
      
      setPlayerProgress(newPlayerProgress);
      setCurrentScore(newScore);
      setCurrentStreak(newStreak);
      setCharacterMood('excited');
      
      // Character also progresses (but slower)
      if (Math.random() < 0.7) { // 70% chance character progresses
        setCharacterProgress(prev => prev + 1);
      }

      if (newPlayerProgress >= gameStages[currentStage].steps) {
        // Player wins the stage!
        setCharacterMessage(getRandomMessage('playerWin', gameStages[currentStage].prize));
        setCharacterMood('winner');
        
        // Update progress for authenticated users
        if (user) {
          try {
            // Complete current stage and unlock next
            const nextStage = await completeStage(user.uid, currentStage, gameStages[currentStage].prize);
            
            // Update game statistics
            await updateGameStats(user.uid, newScore, newStreak);
            
            // Update local state
            if (currentStage === unlockedStages) {
              setUnlockedStages(Math.min(nextStage, gameStages.length - 1));
            }
            if (!earnedPrizes.includes(gameStages[currentStage].prize)) {
              setEarnedPrizes(prev => [...prev, gameStages[currentStage].prize]);
            }
            
            // Refresh parent component's user progress
            if (onProgressUpdate) onProgressUpdate();
            
            console.log(`Stage ${currentStage + 1} completed! Score: ${newScore}, Streak: ${newStreak}`);
          } catch (error) {
            console.error("Failed to save stage completion:", error);
            // Still update local state even if save fails
            if (currentStage === unlockedStages) {
              setUnlockedStages(prev => Math.min(prev + 1, gameStages.length - 1));
            }
            if (!earnedPrizes.includes(gameStages[currentStage].prize)) {
              setEarnedPrizes(prev => [...prev, gameStages[currentStage].prize]);
            }
          }
        } else {
          // For non-authenticated users, only update local state
          if (currentStage === unlockedStages) {
            setUnlockedStages(prev => Math.min(prev + 1, gameStages.length - 1));
          }
          if (!earnedPrizes.includes(gameStages[currentStage].prize)) {
            setEarnedPrizes(prev => [...prev, gameStages[currentStage].prize]);
          }
        }
        
        setTimeout(() => {
          setGameState('completed');
        }, 3000);
      } else if (newPlayerProgress >= gameStages[currentStage].steps - 2) {
        setCharacterMessage(getRandomMessage('nearEnd'));
        setCharacterMood('excited');
        setTimeout(generateNewProblem, 1500);
      } else {
        setCharacterMessage(getRandomMessage('correct'));
        setCharacterMood('excited');
        setTimeout(generateNewProblem, 1500);
      }
    } else {
      // Wrong answer - reset streak
      setCurrentStreak(0);
      setCharacterMood('sad');
      setCharacterMessage("Try again! You can do this!");
      setTimeout(() => {
        setCharacterMood('happy');
      }, 2000);
    }

    // Check if character wins
    if (characterProgress >= gameStages[currentStage].steps) {
      setCharacterMessage(getRandomMessage('characterWin', gameStages[currentStage].prize));
      setCharacterMood('winner');
      
      // Save game stats even if player loses (for authenticated users)
      if (user && currentScore > 0) {
        try {
          await updateGameStats(user.uid, currentScore, currentStreak);
          if (onProgressUpdate) onProgressUpdate();
        } catch (error) {
          console.error("Failed to save game stats:", error);
        }
      }
      
      setTimeout(() => {
        setGameState('completed');
      }, 3000);
    }
  };

  const restartStage = () => {
    startStage(currentStage);
  };

  const goToStageSelect = () => {
    setGameState('stageSelect');
    setCharacterMessage('');
  };

 const handleLoginRequired = (stageNumber) => {
  console.log(`Login required for stage ${stageNumber}`);
  if (onLoginRequired) {
    onLoginRequired();
  }
};

  if (gameState === 'stageSelect') {
    return (
      <div className="space-y-6">
        <GameStageSelect
          stages={gameStages}
          currentStage={currentStage}
          unlockedStages={unlockedStages}
          onStageSelect={startStage}
          earnedPrizes={earnedPrizes}
          user={user}
          onLoginRequired={handleLoginRequired}
        />
        
        {/* Earned Prizes Display */}
        {earnedPrizes.length > 0 && (
          <div className="bg-card-bg rounded-xl p-4 text-center">
            <h3 className="font-bold text-lg text-text mb-2 flex items-center justify-center space-x-2">
              <Trophy size={20} className="text-yellow-500" />
              <span>Your Fruit Collection</span>
            </h3>
            <div className="text-4xl space-x-2 mb-2">
              {earnedPrizes.map((prize, index) => (
                <span key={index} className="inline-block animate-bounce" style={{ animationDelay: `${index * 0.1}s` }}>
                  {prize}
                </span>
              ))}
            </div>
            {user && userProgress && (
              <div className="text-sm text-text/60">
                Total Score: {userProgress.totalScore?.toLocaleString() || 0} • 
                Games Played: {userProgress.gamesPlayed || 0} •
                Best Streak: {userProgress.bestStreak || 0}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  if (gameState === 'completed') {
    const playerWon = playerProgress >= gameStages[currentStage].steps;
    return (
      <div className="text-center space-y-6">
        <div className="text-6xl mb-4">
          {playerWon ? '🎉' : '😅'}
        </div>
        
        <h2 className="text-3xl font-bold text-text">
          {playerWon ? 'Congratulations!' : 'Good Try!'}
        </h2>
        
        <div className="text-8xl">
          {gameStages[currentStage].prize}
        </div>

        {/* Score Display */}
        {playerWon && (
          <div className="bg-primary/10 rounded-xl p-4">
            <h3 className="font-bold text-primary mb-2">Game Stats</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-secondary">{currentScore.toLocaleString()}</p>
                <p className="text-sm text-text/60">Points</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{currentStreak}</p>
                <p className="text-sm text-text/60">Best Streak</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{playerProgress}</p>
                <p className="text-sm text-text/60">Correct</p>
              </div>
            </div>
          </div>
        )}
        
        <AnimatedCharacter 
          mood={characterMood} 
          message={characterMessage}
          position={characterProgress}
          onSpeakComplete={handleSpeakComplete}
        />
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={restartStage}
            className="bg-primary hover:bg-primary/80 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
          >
            <RefreshCw size={20} />
            <span>Try Again</span>
          </button>
          <button
            onClick={goToStageSelect}
            className="bg-secondary hover:bg-secondary/80 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
          >
            <Home size={20} />
            <span>Choose Stage</span>
          </button>
        </div>
      </div>
    );
  }

  // Playing state - Updated layout with score display
  return (
    <div className="space-y-6">
      {/* Score and Stats Bar */}
      {user && (
        <div className="bg-primary/5 rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-lg font-bold text-primary">{currentScore.toLocaleString()}</p>
                <p className="text-xs text-text/60">Score</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-green-600">{currentStreak}</p>
                <p className="text-xs text-text/60">Streak</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-text/60">
                Stage {currentStage + 1}: {gameStages[currentStage].name}
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(playerProgress / gameStages[currentStage].steps) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-primary font-bold">
                  {playerProgress}/{gameStages[currentStage].steps}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Character - Top */}
      <div className="flex justify-center">
        <AnimatedCharacter 
          mood={characterMood} 
          message={characterMessage}
          position={characterProgress}
          onSpeakComplete={handleSpeakComplete}
        />
      </div>

      {/* Progress Race - Below Character */}
      <ProgressRace
        playerProgress={playerProgress}
        characterProgress={characterProgress}
        totalSteps={gameStages[currentStage].steps}
        prize={gameStages[currentStage].prize}
      />

      {/* Current Challenge - Below Race */}
      <div className="bg-card-bg rounded-xl p-6 text-center shadow-lg">
        <h2 className="text-2xl font-bold text-text mb-4">
          {gameStages[currentStage].name}
        </h2>
        
        <div className="mb-4">
          <p className="text-lg mb-2 text-text/80">Show me this number:</p>
          <div className="text-5xl font-bold text-primary mb-4">{targetNumber}</div>
          
          <div className="flex justify-center items-center space-x-4 mb-4">
            <div className="text-sm text-text/70">
              Your answer: <span className="font-bold text-secondary">{currentValue}</span>
            </div>
            {isCorrect !== null && (
              <div className={`flex items-center space-x-1 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                <span className="font-semibold">
                  {isCorrect ? 'Correct!' : 'Try again!'}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={checkAnswer}
            className="bg-primary hover:bg-primary/80 text-white px-8 py-3 rounded-lg font-semibold transition-colors text-lg mb-4"
          >
            Check Answer
          </button>
        </div>

        {/* Controls - Below Challenge */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={generateNewProblem}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
          >
            <RefreshCw size={16} />
            <span>New Number</span>
          </button>
          <button
            onClick={goToStageSelect}
            className="bg-secondary hover:bg-secondary/80 text-gray-800 px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
          >
            <Home size={16} />
            <span>Stages</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameTime;