
import { db } from '../firebase/firebase';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

export const getOneColumnProgress = async (userId) => {
  try {
    const userRef = doc(db, 'userProgress', userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      return data.modules?.['1-column-no-friends'] || initializeProgress();
    }
    
    return initializeProgress();
  } catch (error) {
    console.error("Error fetching 1 Column progress:", error);
    return initializeProgress();
  }
};

const initializeProgress = () => ({
  stages: {
    1: { completed: false, score: 0, speed: 'slow', attempts: 0 },
    2: { completed: false, score: 0, speed: 'slow', attempts: 0 },
    3: { completed: false, score: 0, speed: 'slow', attempts: 0 },
    4: { completed: false, score: 0, speed: 'slow', attempts: 0 },
    5: { completed: false, score: 0, speed: 'slow', attempts: 0 },
    6: { completed: false, score: 0, speed: 'slow', attempts: 0 },
  },
  bestSpeed: 'slow',
  overallAccuracy: 0,
  totalProblemsCompleted: 0,
  lastPlayedTimestamp: null
});

export const saveStageProgress = async (userId, stageId, score, speed, totalProblems) => {
  try {
    const userRef = doc(db, 'userProgress', userId);
    const userSnap = await getDoc(userRef);

    const accuracy = Math.round((score / totalProblems) * 100);
    const completed = accuracy >= 80;

    const stageData = {
      completed,
      score,
      accuracy,
      speed,
      attempts: 1,
      timestamp: Date.now()
    };

    if (userSnap.exists()) {
      const data = userSnap.data();
      const moduleData = data.modules?.['1-column-no-friends'] || initializeProgress();
      
      if (moduleData.stages[stageId]) {
        stageData.attempts = (moduleData.stages[stageId].attempts || 0) + 1;
      }

      moduleData.stages[stageId] = stageData;
      
      if (completed) {
        const speedRank = { slow: 1, medium: 2, superfast: 3 };
        const currentBestRank = speedRank[moduleData.bestSpeed] || 1;
        const newSpeedRank = speedRank[speed] || 1;
        
        if (newSpeedRank > currentBestRank) {
          moduleData.bestSpeed = speed;
        }
      }

      const completedStages = Object.values(moduleData.stages).filter(s => s.completed);
      if (completedStages.length > 0) {
        const totalAccuracy = completedStages.reduce((sum, s) => sum + (s.accuracy || 0), 0);
        moduleData.overallAccuracy = Math.round(totalAccuracy / completedStages.length);
      }

      moduleData.totalProblemsCompleted = (moduleData.totalProblemsCompleted || 0) + totalProblems;
      moduleData.lastPlayedTimestamp = Date.now();

      await updateDoc(userRef, {
        [`modules.1-column-no-friends`]: moduleData
      });

      console.log(`Stage ${stageId} progress saved:`, stageData);
      return { success: true, unlockNext: completed, moduleData };
    } else {
      const moduleData = initializeProgress();
      moduleData.stages[stageId] = stageData;
      moduleData.totalProblemsCompleted = totalProblems;
      moduleData.lastPlayedTimestamp = Date.now();

      await setDoc(userRef, {
        userId,
        modules: {
          '1-column-no-friends': moduleData
        }
      });

      console.log(`New user progress created with stage ${stageId}`);
      return { success: true, unlockNext: completed, moduleData };
    }
  } catch (error) {
    console.error("Error saving stage progress:", error);
    return { success: false, error: error.message };
  }
};

export const getProgressSummary = async (userId) => {
  try {
    const progress = await getOneColumnProgress(userId);
    
    const completedStages = Object.values(progress.stages).filter(s => s.completed).length;
    const totalStages = Object.keys(progress.stages).length;
    
    return {
      completedStages,
      totalStages,
      overallAccuracy: progress.overallAccuracy,
      bestSpeed: progress.bestSpeed,
      totalProblemsCompleted: progress.totalProblemsCompleted,
      progressPercentage: Math.round((completedStages / totalStages) * 100)
    };
  } catch (error) {
    console.error("Error getting progress summary:", error);
    return {
      completedStages: 0,
      totalStages: 6,
      overallAccuracy: 0,
      bestSpeed: 'slow',
      totalProblemsCompleted: 0,
      progressPercentage: 0
    };
  }
};
