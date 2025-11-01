
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Crown, ArrowLeft, Lock, Trophy, Target, Zap } from 'lucide-react';
import { logout } from '../auth/authService';
import AuthModal from '../components/AuthModal';
import StageCard from '../components/one column/StageCard';
import PracticeGame from '../components/one column/PracticeGame';
import { oneColumnStages } from '../data/oneColumnNoFriends';
import { getOneColumnProgress, getProgressSummary } from '../auth/oneColumnProgress';

const OneColumnNoFriends = ({ user, onAuthChange }) => {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentView, setCurrentView] = useState('stages');
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedSpeed, setSelectedSpeed] = useState('medium');
  const [userProgress, setUserProgress] = useState(null);
  const [progressSummary, setProgressSummary] = useState(null);

  useEffect(() => {
    const loadProgress = async () => {
      if (user) {
        const progress = await getOneColumnProgress(user.uid);
        const summary = await getProgressSummary(user.uid);
        setUserProgress(progress);
        setProgressSummary(summary);
      } else {
        setUserProgress(null);
        setProgressSummary(null);
      }
    };
    loadProgress();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      if (onAuthChange) onAuthChange(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleStageSelect = (stage, speed) => {
    if (!stage.free && !user) {
      setShowAuthModal(true);
      return;
    }
    setSelectedStage(stage);
    setSelectedSpeed(speed);
    setCurrentView('practice');
  };

  const handleBackToStages = async () => {
    setCurrentView('stages');
    setSelectedStage(null);
    
    if (user) {
      const progress = await getOneColumnProgress(user.uid);
      const summary = await getProgressSummary(user.uid);
      setUserProgress(progress);
      setProgressSummary(summary);
    }
  };

  const handleAuthSuccess = (authenticatedUser) => {
    setShowAuthModal(false);
    if (onAuthChange) onAuthChange(authenticatedUser);
  };

  return (
    <div className="min-h-screen bg-bg text-text">
      <div className="bg-card-bg shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left flex-1">
              <div className="flex items-center justify-center sm:justify-start space-x-2 mb-2">
                <button
                  onClick={() => navigate('/abacus-learning')}
                  className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                  title="Back to Dashboard"
                >
                  <ArrowLeft size={24} style={{ color: 'var(--color-primary)' }} />
                </button>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: 'var(--color-primary)' }}>
                  1 Column (No Friends)
                </h1>
              </div>
              <p className="text-text/70 text-sm sm:text-base lg:text-lg px-2 sm:px-0 sm:ml-14">
                Practice single-column addition and subtraction — no complements needed! Let's move those beads!
              </p>
            </div>
            
            <div className="flex items-center justify-center sm:justify-end w-full sm:w-auto">
              {user ? (
                <div className="flex items-center space-x-2 rounded-lg px-3 py-2 w-full sm:w-auto justify-between sm:justify-start"
                  style={{ backgroundColor: 'rgba(74, 144, 226, 0.1)' }}>
                  <div className="flex items-center space-x-2">
                    <Crown size={16} className="text-yellow-500" />
                    <div className="text-right sm:text-left">
                      <p className="text-xs font-semibold" style={{ color: 'var(--color-primary)' }}>Premium User</p>
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
                  className="flex items-center space-x-2 text-white px-3 py-2 rounded-lg transition-colors text-sm w-full sm:w-auto justify-center hover:opacity-90"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  <User size={16} />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {user && progressSummary && currentView === 'stages' && (
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="bg-card-bg border-2 rounded-xl p-4" 
            style={{ borderColor: 'var(--color-primary)' }}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(74, 144, 226, 0.2)' }}>
                  <Trophy size={24} style={{ color: 'var(--color-primary)' }} />
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: 'var(--color-primary)' }}>
                    Your Progress
                  </h3>
                  <p className="text-sm text-text/60">
                    {progressSummary.completedStages} of {progressSummary.totalStages} stages completed
                  </p>
                </div>
              </div>
              <div className="flex space-x-6 text-center">
                <div>
                  <p className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                    {progressSummary.overallAccuracy}%
                  </p>
                  <p className="text-xs text-text/60">Accuracy</p>
                </div>
                <div>
                  <p className="text-2xl font-bold" style={{ color: 'var(--color-secondary)' }}>
                    {progressSummary.totalProblemsCompleted}
                  </p>
                  <p className="text-xs text-text/60">Problems</p>
                </div>
                <div>
                  <Zap size={24} style={{ color: progressSummary.bestSpeed === 'superfast' ? 'var(--color-secondary)' : 'var(--color-primary)' }} />
                  <p className="text-xs text-text/60 capitalize">{progressSummary.bestSpeed}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 py-8">
        {currentView === 'stages' ? (
          <>
            <div className="mb-8 rounded-xl p-6 text-center"
              style={{ background: 'linear-gradient(to right, rgba(74, 144, 226, 0.1), rgba(255, 222, 33, 0.1))' }}>
              <div className="text-5xl mb-3">👩‍🏫</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-primary)' }}>
                Welcome to Ms. Abacus's Class!
              </h3>
              <p className="text-text/70 max-w-2xl mx-auto">
                I'll call out number sequences, and you solve them using your physical abacus. 
                Choose your speed and let's practice together! 🎯
              </p>
            </div>

            {!user && (
              <div className="mb-6 rounded-xl p-4 border-2"
                style={{ 
                  background: 'rgba(255, 222, 33, 0.1)',
                  borderColor: 'var(--color-secondary)'
                }}>
                <div className="flex items-start space-x-3">
                  <Target size={24} style={{ color: 'var(--color-secondary)' }} />
                  <div>
                    <h4 className="font-semibold mb-1" style={{ color: 'var(--color-primary)' }}>
                      Try 2 Free Stages!
                    </h4>
                    <p className="text-sm text-text/70">
                      Start with 5 and 6 rows for free. Sign in to unlock all 6 stages and save your progress!
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {oneColumnStages.map((stage) => (
                <StageCard
                  key={stage.id}
                  stage={stage}
                  isLocked={!stage.free && !user}
                  onSelect={handleStageSelect}
                  userProgress={userProgress?.stages[stage.id]}
                  onLoginRequired={() => setShowAuthModal(true)}
                />
              ))}
            </div>

            <div className="mt-12 bg-card-bg rounded-xl p-6 max-w-2xl mx-auto text-center">
              <div className="text-6xl mb-4">🤖</div>
              <p className="text-text/70 italic">
                "Beep boop! I'm RoboBuddy, here to cheer you on! Remember: accuracy first, speed comes naturally. 
                Let's make math fun together!" 💙
              </p>
            </div>
          </>
        ) : (
          <PracticeGame
            stage={selectedStage}
            speed={selectedSpeed}
            user={user}
            onBack={handleBackToStages}
          />
        )}
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default OneColumnNoFriends;

