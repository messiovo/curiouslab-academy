import { 
  doc, 
  setDoc, 
  getDoc,
  updateDoc 
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

// Default progress for new users
const getDefaultProgress = () => ({
  currentStage: 0,
  unlockedStages: 0, // Only stage 1 (index 0) unlocked initially
  earnedPrizes: [],
  totalScore: 0,
  gamesPlayed: 0,
  bestStreak: 0,
  achievements: [],
  createdAt: new Date(),
  lastUpdated: new Date()
});

// Save complete user progress
export const saveUserProgress = async (userId, progressData) => {
  try {
    const userRef = doc(db, 'users', userId);
    const dataToSave = {
      ...progressData,
      lastUpdated: new Date(),
    };
    
    await setDoc(userRef, dataToSave, { merge: true });
    console.log("Progress saved successfully for user:", userId);
    return dataToSave;
  } catch (error) {
    console.error("Error saving user progress:", error);
    throw new Error("Failed to save progress. Please try again.");
  }
};

// Get user progress (creates default for new users)
export const getUserProgress = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      console.log("User progress loaded:", userData);
      return userData;
    } else {
      // Create default progress for new user
      console.log("New user detected, creating default progress");
      const defaultProgress = getDefaultProgress();
      await saveUserProgress(userId, defaultProgress);
      return defaultProgress;
    }
  } catch (error) {
    console.error("Error getting user progress:", error);
    return getDefaultProgress(); // Return default if error occurs
  }
};

// Update user's current stage and unlock new stages
export const updateUserStage = async (userId, newStage, earnedPrize = null) => {
  try {
    const userRef = doc(db, 'users', userId);
    
    // Get current progress
    const currentProgress = await getUserProgress(userId);
    
    const updateData = {
      currentStage: newStage,
      unlockedStages: Math.max(newStage, currentProgress.unlockedStages), // Keep highest unlocked
      lastUpdated: new Date()
    };
    
    // Add earned prize if provided
    if (earnedPrize && !currentProgress.earnedPrizes.includes(earnedPrize)) {
      updateData.earnedPrizes = [...currentProgress.earnedPrizes, earnedPrize];
      console.log("New prize earned:", earnedPrize);
    }
    
    await updateDoc(userRef, updateData);
    console.log(`Stage updated to ${newStage + 1} for user:`, userId);
    return updateData;
  } catch (error) {
    console.error("Error updating stage progress:", error);
    throw new Error("Failed to update stage progress.");
  }
};

// Update game statistics after each game
export const updateGameStats = async (userId, gameScore, streak = 0) => {
  try {
    const userRef = doc(db, 'users', userId);
    const currentProgress = await getUserProgress(userId);
    
    const updateData = {
      totalScore: (currentProgress.totalScore || 0) + gameScore,
      gamesPlayed: (currentProgress.gamesPlayed || 0) + 1,
      lastUpdated: new Date()
    };
    
    // Update best streak if this one is better
    if (streak > (currentProgress.bestStreak || 0)) {
      updateData.bestStreak = streak;
      console.log("New best streak achieved:", streak);
    }
    
    await updateDoc(userRef, updateData);
    console.log("Game stats updated - Score:", gameScore, "Games played:", updateData.gamesPlayed);
    return updateData;
  } catch (error) {
    console.error("Error updating game stats:", error);
    throw new Error("Failed to update game statistics.");
  }
};

// Unlock next stage after completing current stage
export const completeStage = async (userId, completedStage, earnedPrize) => {
  try {
    const nextStage = completedStage + 1;
    await updateUserStage(userId, nextStage, earnedPrize);
    console.log(`Stage ${completedStage + 1} completed! Stage ${nextStage + 1} unlocked.`);
    return nextStage;
  } catch (error) {
    console.error("Error completing stage:", error);
    throw new Error("Failed to complete stage.");
  }
};

// Get user statistics for display
export const getUserStats = async (userId) => {
  try {
    const progress = await getUserProgress(userId);
    return {
      totalScore: progress.totalScore || 0,
      gamesPlayed: progress.gamesPlayed || 0,
      bestStreak: progress.bestStreak || 0,
      stagesCompleted: progress.earnedPrizes.length,
      currentStage: progress.currentStage + 1, // Display as 1-indexed
      achievements: progress.achievements || []
    };
  } catch (error) {
    console.error("Error getting user stats:", error);
    return null;
  }
};