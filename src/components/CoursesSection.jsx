// src/components/CoursesSection.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FlaskConical, SquareRadical, Languages, Globe, Calculator, BrainCircuit } from 'lucide-react';

// Data for the courses is managed in this array, making it easy to update.
const coursesData = [
  {
    icon: <FlaskConical size={32} className="text-primary" />,
    title: 'Science Explorers',
    description: 'Discover the wonders of science through fun experiments and hands-on activities that make learning exciting and memorable.',
    href: '/courses/science-explorers',
  },
  {
    icon: <SquareRadical size={32} className="text-primary" />,
    title: 'Math Wiz',
    description: 'Master mathematical concepts through interactive games and problem-solving challenges designed to build confidence.',
    href: '/courses/math-wizards',
  },
  {
    icon: <Languages size={32} className="text-primary" />,
    title: 'English Express',
    description: 'Improve reading, writing, listening, and speaking skills in English through our engaging language program for young learners.',
    href: '/courses/english-express',
  },
  {
    icon: <Globe size={32} className="text-primary" />,
    title: 'Native Languages',
    description: 'Learn beautiful Nigerian indigenous languages like Yoruba, Igbo, and Hausa with native speakers.',
    href: '/courses/native-languages',
  },
  {
    icon: <Calculator size={32} className="text-primary" />,
    title: 'Abacus Mental Math',
    description: 'Develop lightning-fast mental calculation skills using the ancient abacus technique for improved concentration.',
    href: '/courses/abacus-math',
  },
 {
  icon: <BrainCircuit size={32} className="text-primary" />,
  title: 'AI Innovators',
  description: 'Explore the exciting world of Artificial Intelligence. Learn the basics of machine learning and build your own simple AI models.',
  href: '/courses/ai-innovators',
},
];

const CoursesSection = () => {
  return (
    <section className="py-20 bg-card-bg text-text">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold">Featured Courses</h2>
        </div>
        
        {/* Responsive grid for the course cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coursesData.map((course) => (
            <div 
              key={course.title}
              className="bg-bg p-8 rounded-lg shadow-lg flex flex-col items-center text-center transition-transform transform hover:-translate-y-2"
            >
              <div className="bg-primary/10 p-4 rounded-full mb-6">
                {course.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{course.title}</h3>
              <p className="flex-grow mb-6 text-text/80">{course.description}</p>
              <Link
                to={course.href}
                className="font-semibold text-primary  hover:underline"
              >
                View Course
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;