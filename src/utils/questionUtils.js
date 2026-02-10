// utils/questionUtils.js
import { oneColumnStages } from '../data/oneColumnNoFriends';

export const getRandomQuestionsForStage = (stageId, count = 7) => {
  // Find the stage by ID
  const stage = oneColumnStages.find(stage => stage.id === stageId);
  
  if (!stage) {
    return [];
  }
  
  const { problems, answers } = stage;
  
  // If we have fewer problems than requested, return all
  if (problems.length <= count) {
    return problems.map((problem, index) => ({
      id: index,
      problem,
      answer: answers[index]
    }));
  }
  
  // Select random indices for questions
  const selectedIndices = [];
  while (selectedIndices.length < count) {
    const randomIndex = Math.floor(Math.random() * problems.length);
    if (!selectedIndices.includes(randomIndex)) {
      selectedIndices.push(randomIndex);
    }
  }
  
  // Sort indices to maintain original order (optional)
  selectedIndices.sort((a, b) => a - b);
  
  // Return the selected questions
  return selectedIndices.map(index => ({
    id: index,
    problem: problems[index],
    answer: answers[index]
  }));
};

// Alternative: Get random but sequential questions
export const getRandomSequentialQuestions = (stageId, count = 7) => {
  const stage = oneColumnStages.find(stage => stage.id === stageId);
  
  if (!stage) {
    return [];
  }
  
  const { problems, answers } = stage;
  
  // If we have fewer problems than requested, return all
  if (problems.length <= count) {
    return problems.map((problem, index) => ({
      id: index,
      problem,
      answer: answers[index]
    }));
  }
  
  // Get a random starting point
  const maxStartIndex = problems.length - count;
  const startIndex = Math.floor(Math.random() * (maxStartIndex + 1));
  
  // Return sequential questions starting from random index
  return Array.from({ length: count }, (_, i) => ({
    id: startIndex + i,
    problem: problems[startIndex + i],
    answer: answers[startIndex + i]
  }));
};