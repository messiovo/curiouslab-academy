// src/data/oneColumnNoFriends.js

export const oneColumnStages = [
  {
    id: 1,
    title: "1 Column – 5 Rows",
    description: "Start with 5 number sequences",
    free: true,
    problems: [
      "1+1-1+2-3",
      "2-1+3-1-1",
      "6-1+2-5+2",
      "1+5+2-3+1",
      "3+5-6+1+1",
      "4-2+7-3-1",
      "9-2-1+1-6",
      "3-1+0+5-1",
      "5+1+2-3-5",
      "2+1+6-2-2",
      "2+2-1-1+1",
      "5+2+1-3+1",
      "1+5+2-6+1",
      "3+1-3+5-2",
      "4-1-2-1+5",
      "7+2-6-1-2",
      "2+1+6-3-5",
      "8-2-5+3-2",
      "3-1-1+5-6",
      "9-2-1+3-7",
      "1+7+1-4+1",
      "4-1-2+6-2",
      "2+1+5-6+2",
      "5+1+1-2+4",
      "3-2+3+5-8",
      "6+2+1-4-5",
      "1+3-2+5+1",
      "4-2+1-3+6",
      "5+2+1-3+2",
      "7-1+3-2-5"
    ],
    answers: [0, 2, 4, 6, 4, 5, 1, 6,0,5,3,6,3,5,5,0,1,2,0,2,6,5,4,9,1,0,8,6,7,2]
  },
  {
    id: 2,
    title: "1 Column – 6 Rows",
    description: "Add one more number to the sequence",
    free: true,
    problems: [
      "1+2-1+2+5-3",
      "4-2+1-1+6-5",
      "6-5-1+3+1-2",
      "1+6-2+4-7-1",
      "3+1-4+5+3-2",
      "4-1-1+6-3+2",
      "8-1-1+2-5+1",
      "2+1+1-4+5+3",
      "1+8-3-1+2-7",
      "5+2+1-6-1+2"
    ],
    answers: [6, 3, 2, 1, 6, 7, 4, 8, 0,3],
  },
  {
    id: 3,
    title: "1 Column – 7 Rows",
    description: "Introduce subtraction with addition",
    free: false,
    problems: [
      "5+2-1+2-1+3-6",
      "1+1-2+4+5-1-7",
      "5+3-6-1+2+5-3",
      "6+1-2+4-7-1-1",
      "3-2+1+5-1-5+3",
      "7+1+1-4+2-6-1",
      "1+1-2+5-5+4-3",
      "2-1+3-1+6-1-5",
      "4-2+7-4+1-5+3",
      "3-1-1+6-7+5+2"
    ],
    answers: [2, 1, 5, 0, 4, 0, 1, 3, 4, 7],
  },
  {
    id: 4,
    title: "1 Column – 8 Rows",
    description: "More complex addition and subtraction",
    free: false,
    problems: [
      "2+3+1+4+2",
      "5+2-1+3+1",
      "4+1+3-2+2",
      "3+4+2-1+3",
      "6-2+3+1+2",
      "5+1+2-3+4",
      "4+3-1+2+1",
      "7-2+1+3+2"
    ],
    answers: [12, 10, 8, 11, 10, 9, 9, 11],
  },
  {
    id: 5,
    title: "1 Column – 9 Rows",
    description: "Longer sequences with mixed operations",
    free: false,
    problems: [
      "3+2+1+4-2+3",
      "5+1+2-1+3+2",
      "4+3+2-2+1+3",
      "6-1+2+3-2+4",
      "3+4+1-2+3+1",
      "5+2-1+3+2-3",
      "4+1+3+2-1+2",
      "7-2+3+1+2-3"
    ],
    answers: [11, 12, 11, 12, 10, 8, 11, 8],
  },
  {
    id: 6,
    title: "1 Column – 10 Rows",
    description: "Master level - longest sequences!",
    free: false,
    problems: [
      "2+3+1+4+2-1+3",
      "5+1+2-1+3+2-2+4",
      "4+3+2-2+1+3+2-1",
      "6-1+2+3-2+4+1+2",
      "3+4+1-2+3+1-1+4",
      "5+2-1+3+2-3+1+3",
      "4+1+3+2-1+2+3-2",
      "7-2+3+1+2-3+4+1"
    ],
    answers: [14, 14, 12, 15, 13, 12, 12, 13],
  },
];

// Speed configurations (in milliseconds)
export const speedSettings = {
  slow: { delay: 1500, label: "Slow 🐢" },
  medium: { delay: 1000, label: "Medium 🚶" },
  superfast: { delay: 600, label: "Super Fast ⚡" }
};

// RoboBuddy feedback messages
export const feedbackMessages = {
  correct: {
    slow: [
      "That was awesome!",
      "Perfect! You've got this!",
      "Excellent work! Keep it up!",
      "Wow! You're really good at this!",
      "Amazing! Your beads are moving beautifully!"
    ],
    medium: [
      "Wow! You're quick with those beads!",
      "Impressive speed! Great job!",
      "You're getting faster! Love it!",
      "Speedy and accurate - perfect combo!",
      "Your fingers are flying! Awesome!"
    ],
    superfast: [
      "You're faster than my circuits!",
      "INCREDIBLE! Lightning speed!",
      "WOW! Are you sure you're human?",
      "SUPER FAST! You're a math ninja!",
      "BLAZING! My processors can barely keep up!"
    ]
  },
  incorrect: [
    "Oops! Let's try again. You've got this!",
    "Almost there! Give it another shot!",
    "Not quite, but I believe in you! Keep trying!",
    "Close! Let's move those beads again!",
    "Don't worry! Even robots make mistakes. Try once more!",
    "Take your time and try again! You can do it!"
  ],
  encouragement: [
    "Beep boop! Let's practice together!",
    "I'm here to help you become a math champion!",
    "Remember: accuracy first, speed comes naturally!",
    "Every problem makes you stronger!",
    "You're doing great! Keep moving those beads!"
  ]
};

// Ms. Abacus voice text (for TTS or display)
export const msAbacusIntros = [
  "Hello, my dear student! I'm Ms. Abacus, and I'm so excited to practice with you today!",
  "Welcome back! Ms. Abacus here, ready to help you master those beads!",
  "Good day! Let's work together and make math fun!",
  "Hi there! Ms. Abacus at your service. Let's get those fingers moving!"
];