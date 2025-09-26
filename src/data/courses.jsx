// src/data/courses.jsx

import React from 'react';
import { FlaskConical, SquareRadical, Languages, Globe, Calculator, BrainCircuit, Code, Bot, Crown } from 'lucide-react';

// --- Import hero images for each course detail page ---
// You will need to add these image files to your `src/assets/images` folder
import scienceHero from '../assets/images/science-experiment.webp';
import mathHero from '../assets/images/math-hero.webp'; 
import englishHero from '../assets/images/english-hero.webp'; 
import languagesHero from '../assets/images/languages-hero.webp'; 
import abacusHero from '../assets/images/abacus-hero.webp'; 
import aiHero from '../assets/images/ai-hero.webp'; 
import codingHero from '../assets/images/coding-hero.webp'; 
import roboticsHero from '../assets/images/robotics-hero.webp'; 
import chessHero from '../assets/images/chess-hero.webp'; 


export const coursesData = [
  // --- Science Explorers ---
  {
    id: 'science-explorers',
    icon: <FlaskConical size={32} className="text-primary" />,
    title: 'Science Explorers',
    description: 'Discover the wonders of science through fun experiments and hands-on activities.',
    href: '/courses/science-explorers',
    heroImage: scienceHero,
    heroSubtitle: "Discover the wonders of science through fun experiments and hands-on activities.",
    about: "Our Science Explorers program is designed to ignite curiosity and foster a love for science in young minds. Through interactive live sessions, students will explore key concepts in physics, chemistry, and biology.",
    learningOutcomes: ["Fundamental Scientific Principles", "Think Like a Scientist", "Real-World Applications", "Collaborative Problem-Solving", "Safe Laboratory Practices"],
    courseStructure: [
      { title: "Grade-Level Customization", detail: "The curriculum is structured to match the learning capacity of students based on their grade level." },
      { title: "Regional Adaptation", detail: "Our course incorporates real-world examples and experiments relevant to each student’s country of residence." },
      { title: "Flexible Learning Approach", detail: "Our experiments are adaptable, ensuring every participant can engage, with or without a lab." },
    ],
    whoShouldEnroll: "This course is perfect for children ages 8-12 who are curious about how the world works. No prior science knowledge is required!",
    materials: ["Interactive Lesson Guides", "Video Demonstrations", "Live Session Access", "Practice Quizzes & Assignments"],
    overview: { ageGroup: "8-17 years", sessions: "Once/Twice per week", sessionLength: "60 - 120 minutes", classSize: "Max 8 students", price: "₦25,000 (or $20) per hour" },
    instructor: { name: "Dr. Ada Johnson", title: "PhD in Science Education", bio: "10+ years of experience teaching young scientists. Specializes in making complex concepts accessible and fun." },
    reviews: [
      { rating: 5, text: "My son looks forward to every class! He's constantly talking about the experiments.", author: "- Mrs. Bello" },
      { rating: 5, text: "The way complex concepts are broken down for kids is amazing. Highly recommend!", author: "- Mr. Adekunle" },
    ]
  },

  // --- Math Wiz ---
  {
    id: 'math-wizards',
    icon: <SquareRadical size={32} className="text-primary" />,
    title: 'Math Wiz',
    description: 'Master mathematical concepts through interactive games and problem-solving challenges.',
    href: '/courses/math-wizards',
    heroImage: mathHero,
    heroSubtitle: "Build confidence and mastery in mathematics through interactive games and challenges.",
    about: "The Math Wiz program transforms mathematics from a daunting subject into an exciting adventure. We use gamified learning and real-world problems to build a strong foundation in arithmetic, algebra, and geometry.",
    learningOutcomes: ["Core Mathematical Concepts", "Problem-Solving Strategies", "Logical Reasoning", "Data Analysis", "Financial Literacy Basics"],
    courseStructure: [
        { title: "Personalized Pace", detail: "Students progress through levels at their own speed, ensuring mastery before moving on." },
        { title: "Interactive Challenges", detail: "Weekly puzzles and competitive games make practicing math concepts fun and engaging." },
    ],
    whoShouldEnroll: "Perfect for students aged 7-14 looking to strengthen their math skills, overcome math anxiety, or get ahead.",
    materials: ["Gamified Learning Platform Access", "Weekly Challenge Sets", "Live Tutoring Sessions", "Progress Tracker"],
    overview: { ageGroup: "7-14 years", sessions: "Twice per week", sessionLength: "60 minutes", classSize: "Max 6 students", price: "₦15,000 (or $15) per hour" },
    instructor: { name: "Mr. Femi Adebayo", title: "M.Sc. in Mathematics", bio: "A patient and enthusiastic educator who makes numbers come alive for students of all levels." },
    reviews: [ { rating: 5, text: "My daughter used to hate math, but now she loves the weekly challenges!", author: "- Mrs. Adeyemi" } ]
  },
  
  // --- English Express ---
  {
    id: 'english-express',
    icon: <Languages size={32} className="text-primary" />,
    title: 'English Express',
    description: 'Improve reading, writing, and speaking skills through our engaging language program.',
    href: '/courses/english-express',
    heroImage: englishHero, 
    heroSubtitle: "Enhance your child's communication skills and foster a love for literature.",
    about: "English Express is a comprehensive language arts program designed to boost proficiency and confidence in reading, writing, and public speaking. We explore classic literature, creative writing, and effective communication techniques.",
    learningOutcomes: ["Reading Comprehension", "Creative and Essay Writing", "Public Speaking Confidence", "Grammar and Vocabulary Expansion", "Critical Literary Analysis"],
    courseStructure: [ /* Add structure details */ ],
    whoShouldEnroll: "Students aged 8-15 who want to excel in their language arts studies and become confident communicators.",
    materials: ["Curated Reading List", "Online Writing Portfolio", "Interactive Grammar Tools"],
    overview: { ageGroup: "8-15 years", sessions: "Twice per week", sessionLength: "75 minutes", classSize: "Max 8 students", price: "₦15,000 (or $15) per hour" },
    instructor: { name: "Mrs. Helen Okoro", title: "B.A. in English & Literature", bio: "A passionate storyteller and educator dedicated to helping students find their voice." },
    reviews: [ { rating: 5, text: "My son's writing has improved dramatically. The feedback from Mrs. Okoro is always so helpful.", author: "- Mr. Eze" } ]
  },

  // --- Native Languages ---
  {
    id: 'native-languages',
    icon: <Globe size={32} className="text-primary" />,
    title: 'Native Languages',
    description: 'Learn beautiful Nigerian indigenous languages like Yoruba, Igbo, and Hausa.',
    href: '/courses/native-languages',
    heroImage: languagesHero, 
    heroSubtitle: "Connect with your heritage by learning to speak Nigeria's beautiful indigenous languages.",
    about: "This program offers immersive lessons in Yoruba, Igbo, and Hausa, taught by native speakers. We focus on conversational skills, cultural context, and building a strong connection to Nigerian heritage through language.",
    learningOutcomes: ["Conversational Fluency", "Cultural Understanding", "Reading and Writing in Native Script", "Traditional Greetings and Etiquette", "Storytelling and Proverbs"],
    courseStructure: [ /* Add structure details */ ],
    whoShouldEnroll: "Children and adults of all ages who wish to learn or reconnect with Nigerian languages.",
    materials: ["Interactive Video Lessons", "Cultural Storybooks", "Live Practice Sessions with Native Speakers"],
    overview: { ageGroup: "All ages", sessions: "Once per week", sessionLength: "90 minutes", classSize: "Max 10 students", price: "₦15,000 (or $20)" },
    instructor: { name: "Chief Adeola Alabi", title: "Cultural Heritage Expert", bio: "A native Yoruba speaker and storyteller dedicated to preserving and sharing Nigerian culture." },
    reviews: [ { rating: 5, text: "I'm so glad my children can now speak Yoruba with their grandparents. Thank you!", author: "- Mrs. Williams" } ]
  },

  // --- Abacus Mental Math ---
  {
    id: 'abacus-math',
    icon: <Calculator size={32} className="text-primary" />,
    title: 'Abacus Mental Math',
    description: 'Develop lightning-fast mental calculation skills using the ancient abacus technique.',
    href: '/courses/abacus-math',
    heroImage: abacusHero, 
    heroSubtitle: "Train your brain to perform complex calculations with incredible speed and accuracy.",
    about: "Our Abacus Mental Math course teaches the ancient art of the abacus to develop exceptional mental calculation abilities. This program is proven to enhance concentration, memory, and problem-solving skills.",
    learningOutcomes: ["High-Speed Mental Arithmetic", "Improved Concentration and Focus", "Enhanced Memory Retention", "Visualization Skills", "Boosted Academic Confidence"],
    courseStructure: [ /* Add structure details */ ],
    whoShouldEnroll: "Ideal for children aged 6-12 looking for a fun way to gain a significant advantage in mathematics.",
    materials: ["Physical Abacus Kit", "Online Practice Portal", "Speed Drills and Competitions"],
    overview: { ageGroup: "6-12 years", sessions: "Once per week", sessionLength: "60 minutes", classSize: "Max 10 students", price: "₦15,000 (or $20) per hour" },
    instructor: { name: "Ms. Mercy", title: "Certified Abacus Trainer", bio: "An expert in abacus techniques with a track record of training national-level competition winners." },
    reviews: [ { rating: 5, text: "The speed at which my son can do math in his head now is just unbelievable.", author: "- Parent" } ]
  },

  // --- AI Innovators ---
  {
    id: 'ai-innovators',
    icon: <BrainCircuit size={32} className="text-primary" />,
    title: 'AI Innovators',
    description: 'Explore the exciting world of Artificial Intelligence and build your own simple AI models.',
    href: '/courses/ai-innovators',
    heroImage: aiHero, 
    heroSubtitle: "Step into the future by learning the fundamentals of Artificial Intelligence and machine learning.",
    about: "Our AI Innovators course demystifies Artificial Intelligence for young learners. Students will discover what AI is, how it works, and how to build their own simple machine learning models for real-world applications.",
    learningOutcomes: ["Basics of Machine Learning", "Understanding Algorithms", "Building a Simple Chatbot", "Ethical AI Concepts", "Project-Based AI Creation"],
    courseStructure: [ /* Add structure details */ ],
    whoShouldEnroll: "Ideal for curious minds aged 12-17 interested in technology and the future of computing.",
    materials: ["Web-based Coding Environment", "AI Project Kits", "Interactive Video Lessons"],
    overview: { ageGroup: "12-17 years", sessions: "Once per week", sessionLength: "90 minutes", classSize: "Max 8 students", price: "₦25,000 (or $25) per hour" },
    instructor: { name: "Mr. Jerry Idahosa", title: "Bsc in Computer Science", bio: "A leading researcher in machine learning with a passion for inspiring the next generation of tech innovators." },
    reviews: [ { rating: 5, text: "The AI course was mind-blowing. I can't believe I built a working program!", author: "- Daniel, Age 14" } ]
  },
  
  // --- Coding for Kids ---
  {
    id: 'coding-for-kids',
    icon: <Code size={32} className="text-primary" />,
    title: 'Coding for Kids',
    description: 'Learn the fundamentals of programming with fun, project-based lessons in Scratch and Python.',
    href: '/courses/coding-for-kids',
    heroImage: codingHero,
    heroSubtitle: "From simple games to complex apps, start your journey to becoming a coding superstar.",
    about: "This course introduces the core concepts of programming in a fun and accessible way. Students start with visual block coding in Scratch and gradually move to text-based programming with Python, building games and animations along the way.",
    learningOutcomes: ["Programming Logic and Syntax", "Game Development Basics", "Problem Decomposition", "Python Fundamentals", "Creative Project Design"],
    courseStructure: [ /* Add structure details */ ],
    whoShouldEnroll: "Beginners aged 8-15 who are eager to learn how to create their own games and software.",
    materials: ["Scratch Account", "Online Python IDE", "Project Templates"],
    overview: { ageGroup: "8-15 years", sessions: "Once per week", sessionLength: "90 minutes", classSize: "Max 8 students", price: "₦20,000 (or $15) per hour" },
    instructor: { name: "Ms. Aisha Ibrahim", title: "Software Engineer", bio: "A professional developer with a knack for making coding easy and exciting for beginners." },
    reviews: [ { rating: 5, text: "I made my own game! It was the coolest thing I've ever done in a class.", author: "- Sam, Age 10" } ]
  },

  // --- Robotics Club ---
  {
    id: 'robotics-club',
    icon: <Bot size={32} className="text-primary" />,
    title: 'Robotics Club',
    description: 'Design, build, and program your own robots to solve challenges and compete.',
    href: '/courses/robotics-club',
    heroImage: roboticsHero, 
    heroSubtitle: "Bring your ideas to life by building and programming real-world robots.",
    about: "The Robotics Club is a hands-on program where students learn mechanical design, electronics, and programming to create their own robots. It's a perfect blend of engineering and creativity.",
    learningOutcomes: ["Mechanical Design Principles", "Basic Electronics and Circuitry", "Robot Programming (C++)", "Sensor Integration", "Team-Based Problem Solving"],
    courseStructure: [ /* Add structure details */ ],
    whoShouldEnroll: "Aspiring engineers and inventors aged 10-17 who love to build and tinker.",
    materials: ["Complete Robotics Kit (shipped to you)", "Online Simulation Software", "Team Collaboration Tools"],
    overview: { ageGroup: "10-17 years", sessions: "Once per week", sessionLength: "120 minutes", classSize: "Max 6 students", price: "₦25,000 (or $25) per hour" },
    instructor: { name: "Engr. David Adeleke", title: "Mechatronics Engineer", bio: "A robotics competition champion dedicated to mentoring the next generation of engineers." },
    reviews: [ { rating: 5, text: "Building the robot was challenging but so rewarding. Our team's robot won the maze challenge!", author: "- Tobi, Age 13" } ]
  },

  // --- Chess Champions ---
  {
    id: 'chess-champions',
    icon: <Crown size={32} className="text-primary" />,
    title: 'Chess Champions',
    description: 'Boost critical thinking and strategy through the timeless game of chess with our expert instructors.',
    href: '/courses/chess-champions',
    heroImage: chessHero, 
    heroSubtitle: "Master the art of strategy and become a formidable chess player.",
    about: "Our Chess Champions program is designed for all levels, from absolute beginners to tournament players. We focus on openings, middlegame strategy, endgame techniques, and tactical puzzles to sharpen the mind.",
    learningOutcomes: ["Chess Fundamentals and Rules", "Advanced Tactical Patterns", "Strategic Planning and Positional Play", "Endgame Principles", "Tournament Preparation"],
    courseStructure: [ /* Add structure details */ ],
    whoShouldEnroll: "Players of all ages (6+) who want to learn chess or dramatically improve their game.",
    materials: ["Online Chess Platform Membership", "Puzzle Database Access", "Live Tournament Entry"],
    overview: { ageGroup: "6+ years", sessions: "Once per week", sessionLength: "90 minutes", classSize: "Max 8 students", price: "₦15,000 (or $15)" },
    instructor: { name: "Grandmaster Bola Ajibade", title: "International Chess Grandmaster", bio: "A celebrated chess champion with years of experience coaching students to victory." },
    reviews: [ { rating: 5, text: "I finally understand openings! My rating has gone up 200 points since I started.", author: "- Michael, Age 15" } ]
  },
];