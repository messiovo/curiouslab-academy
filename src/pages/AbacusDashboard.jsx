// src/pages/AbacusDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, Brain, Sparkles, ArrowRight, BookOpen } from 'lucide-react';

const AbacusDashboard = () => {
  const navigate = useNavigate();

  const modules = [
  {
    id: 'place-value',
    emoji: '🟩',
    title: 'Place Value',
    description:
      'Master the fundamentals of place value using the interactive abacus. Learn to represent numbers from 1 to 999,999.',
    route: '/abacus/place-value',
    color:
      'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
    borderColor: 'border-green-300 dark:border-green-700',
    available: true,
  },
  {
    id: '1-column-no-friends',
    emoji: '🟦',
    title: '1 Column (No Complement)',
    description:
      'Practice single-column arithmetic without using complement techniques. Build foundational skills step by step.',
    route: '/abacus/1-column-no-friends',
    color:
      'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
    borderColor: 'border-blue-300 dark:border-blue-700',
    available: false,
  },
  {
    id: '1-column-small-friends',
    emoji: '🟪',
    title: '1 Column (Small Friends)',
    description:
      'Learn to use small friends (complements of 5) to perform faster additions and subtractions on the abacus.',
    route: '/abacus/1-column-small-friends',
    color:
      'from-purple-50 to-fuchsia-50 dark:from-purple-900/20 dark:to-fuchsia-900/20',
    borderColor: 'border-purple-300 dark:border-purple-700',
    available: false,
  },
  {
    id: '1-column-big-friends',
    emoji: '🟥',
    title: '1 Column (Big Friends)',
    description:
      'Master big friends (complements of 10) to handle complex single-column arithmetic operations efficiently.',
    route: '/abacus/1-column-big-friends',
    color:
      'from-rose-50 to-red-50 dark:from-rose-900/20 dark:to-red-900/20',
    borderColor: 'border-rose-300 dark:border-rose-700',
    available: false,
  },
  {
    id: '1-column-small-big-friends',
    emoji: '🟧',
    title: '1 Column (Small & Big Friends)',
    description:
      'Combine both small and big friend techniques to solve challenging addition and subtraction problems with speed and accuracy.',
    route: '/abacus/1-column-small-big-friends',
    color:
      'from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20',
    borderColor: 'border-orange-300 dark:border-orange-700',
    available: false,
  },
  {
    id: 'mind-abacus',
    emoji: '🟨',
    title: 'Mind Abacus',
    description:
      'Visualize the abacus in your mind and perform lightning-fast mental calculations without physical beads.',
    route: '/abacus/mind-abacus',
    color:
      'from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20',
    borderColor: 'border-yellow-300 dark:border-yellow-700',
    available: false,
  },
  {
    id: '2-columns',
    emoji: '🟫',
    title: '2 Columns',
    description:
      'Advance to multi-column arithmetic, combining carry-over and borrowing for complex calculations.',
    route: '/abacus/2-columns',
    color:
      'from-stone-50 to-neutral-50 dark:from-stone-900/20 dark:to-neutral-900/20',
    borderColor: 'border-stone-300 dark:border-stone-700',
    available: false,
  },
  
];


  const handleModuleClick = (module) => {
    if (module.available) {
      navigate(module.route);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-primary/20">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <BookOpen size={40} className="text-primary" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
                Abacus Learning Dashboard
              </h1>
            </div>
            <p className="text-text/70 text-base sm:text-lg">
             Join Ms. Abacus and RoboBuddy on a journey to sharpen your mind, one bead at a time! Start with Place Value to learn the basics!
            </p>
          </div>
        </div>
      </div>

      {/* Module Cards */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {modules.map((module) => (
            <div
              key={module.id}
              onClick={() => handleModuleClick(module)}
              className={`
                relative bg-gradient-to-br ${module.color} 
                border-2 ${module.borderColor}
                rounded-2xl p-6 shadow-lg
                transition-all duration-300 transform
                ${module.available 
                  ? 'hover:scale-105 hover:shadow-2xl cursor-pointer' 
                  : 'opacity-75 cursor-not-allowed'
                }
              `}
            >
              {/* Coming Soon Badge */}
              {!module.available && (
                <div className="absolute -top-3 -right-3 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  Coming Soon
                </div>
              )}

              {/* Icon */}
              <div className="flex items-center justify-center mb-4">
                <div className="text-6xl mb-2">{module.emoji}</div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-text mb-3 text-center">
                {module.title}
              </h2>

              {/* Description */}
              <p className="text-text/70 text-sm mb-6 text-center min-h-[4rem]">
                {module.description}
              </p>

              {/* Button */}
              <button
                className={`
                  w-full py-3 px-4 rounded-lg font-semibold
                  transition-all duration-200
                  flex items-center justify-center space-x-2
                  ${module.available
                    ? 'bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg'
                    : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  }
                `}
                disabled={!module.available}
              >
                <span>{module.available ? 'Start Learning' : 'Coming Soon'}</span>
                {module.available && <ArrowRight size={18} />}
              </button>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-card-bg rounded-xl p-6 shadow-lg max-w-3xl mx-auto">
          <div className="flex items-start space-x-4">
            <div className="text-4xl">🤖</div>
            <div>
              <h3 className="text-xl font-bold text-primary mb-2">
                Learning with RoboBuddy
              </h3>
              <p className="text-text/70 text-sm mb-3">
                Hi there! I'm RoboBuddy, your guide through the world of abacus learning. 
                Start with <span className="font-semibold text-primary">Place Value</span> to understand 
                how the abacus represents numbers, then move on to more advanced techniques!
              </p>
              <div className="bg-primary/10 rounded-lg p-3 text-sm text-text/80">
                <p className="font-semibold text-primary mb-1">💡 Pro Tip:</p>
                <p>
                  Practice for 10-15 minutes daily. Consistency is key to building strong mental math skills!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="mt-8 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 max-w-3xl mx-auto">
          <h3 className="text-lg font-bold text-text mb-4 text-center">Your Learning Path</h3>
          <div className="flex items-center justify-between max-w-md mx-auto">
            {modules.map((module, index) => (
              <React.Fragment key={module.id}>
                <div className="flex flex-col items-center">
                  <div 
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center
                      border-2 transition-all duration-300
                      ${module.available
                        ? 'bg-primary border-primary text-white'
                        : 'bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500'
                      }
                    `}
                  >
                    {module.available ? '✓' : index + 1}
                  </div>
                  <span className="text-xs mt-2 text-text/60 text-center max-w-[4rem]">
                    {module.title.split(' ')[0]}
                  </span>
                </div>
                {index < modules.length - 1 && (
                  <div className="flex-1 h-0.5 bg-gray-300 dark:bg-gray-600 mx-2" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbacusDashboard;