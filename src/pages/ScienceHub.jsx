import React from 'react';
import { Link } from 'react-router-dom';
import { FlaskConical, Gamepad2, ArrowRight, Users, Sparkles } from 'lucide-react';

// Import your images
import heroBg from '../assets/images/science-hub-bg.webp';
import virtualLabBg from '../assets/images/virtual-lab-bg.webp';
import playgroundBg from '../assets/images/playground-bg.webp';

const ScienceHub = () => {
  return (
    <div className="min-h-screen bg-bg text-text pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="w-full relative">
        {/* If your image includes the "CuriousLab Science Hub" text, you just need the image. 
            If the text is separate, you can add an absolute div over the image. */}
        <img 
          src={heroBg} 
          alt="CuriousLab Science Hub" 
          className="w-full h-auto object-cover max-h-[450px]" 
        />
      </section>

      {/* 2. INTRO TEXT */}
      <section className="text-center py-12 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] dark:text-blue-400 mb-4">
          Your Interactive Science Learning Space
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
          Two exciting experiences. One science adventure!
        </p>
      </section>

      {/* 3. THE TWO CARDS */}
      <section className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* VIRTUAL SCIENCE LAB CARD */}
          <div className="bg-card-bg rounded-3xl overflow-hidden shadow-lg border border-blue-100 dark:border-gray-700 flex flex-col">
            {/* Card Image */}
            <div className="h-48 w-full overflow-hidden">
              <img 
                src={virtualLabBg} 
                alt="Virtual Science Lab" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Card Content */}
            <div className="p-6 flex flex-col flex-grow items-center text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 text-primary p-3 rounded-full mb-4 inline-block -mt-12 relative z-10 border-4 border-card-bg">
                <FlaskConical size={28} />
              </div>
              <h2 className="text-2xl font-bold text-primary mb-2">
                Virtual Science Lab
              </h2>
              <p className="text-text mb-6 flex-grow opacity-90">
                Investigate real science ideas with virtual experiments and simulations.
              </p>

              {/* Badge */}
              <div className="bg-blue-50 dark:bg-blue-900/40 text-primary text-sm font-semibold py-2 px-4 rounded-full mb-4 flex items-center gap-2">
                <Users size={16} />
                Best for: Discoverers (Ages 8–10)
              </div>
              
              <p className="text-sm text-text opacity-80 mb-6 text-left w-full px-2">
                • Do experiments, take observations, record results and draw conclusions.
              </p>

              {/* Button */}
              <Link 
                to="/virtual-science-lab" 
                className="mt-auto w-full bg-primary hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-opacity"
              >
                <FlaskConical size={20} />
                Explore the Virtual Science Lab
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>

          {/* SCIENCE PLAYGROUND CARD */}
          <div className="bg-card-bg rounded-3xl overflow-hidden shadow-lg border border-purple-100 dark:border-gray-700 flex flex-col">
            {/* Card Image */}
            <div className="h-48 w-full overflow-hidden">
              <img 
                src={playgroundBg} 
                alt="Science Playground" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Card Content */}
            <div className="p-6 flex flex-col flex-grow items-center text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 p-3 rounded-full mb-4 inline-block -mt-12 relative z-10 border-4 border-card-bg">
                <Gamepad2 size={28} />
              </div>
              <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                Science Playground
              </h2>
              <p className="text-text mb-6 flex-grow opacity-90">
                Learn, play and solve fun science missions with Maya, Isio and RoboBuddy.
              </p>

              {/* Badge */}
              <div className="bg-purple-50 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-sm font-semibold py-2 px-4 rounded-full mb-4 flex items-center gap-2">
                <Users size={16} />
                Best for: Explorers (Ages 5–7)
              </div>
              
              <p className="text-sm text-text opacity-80 mb-6 text-left w-full px-2">
                • Play interactive games, solve challenges, explore and discover science ideas.
              </p>

              {/* Button */}
              <Link 
                to="/science-playground" 
                className="mt-auto w-full bg-[#8B5CF6] hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-opacity"
              >
                <Gamepad2 size={20} />
                Enter the Science Playground
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 4. BOTTOM CLUB BANNER */}
      <section className="container mx-auto px-4 max-w-5xl mt-16">
        <div className="bg-[#D1FAE5] dark:bg-green-900/30 rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-md border border-green-200 dark:border-green-800">
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-green-900 dark:text-green-300 mb-2 flex items-center justify-center md:justify-start gap-2">
                <Sparkles className="text-yellow-500" size={24} />
                Join Our CuriousLab Science Club!
              </h2>
              <p className="text-green-800 dark:text-green-200 max-w-2xl">
                A fun, interactive community where young scientists explore new topics, run mini investigations, share their discoveries and grow their curiosity.
              </p>
            </div>
            
            <Link 
              to="/join-science-club" 
              className="whitespace-nowrap bg-secondary hover:opacity-90 text-black font-bold py-3 px-8 rounded-full shadow-md transition-all flex items-center gap-2"
            >
              <Users size={20} />
              Join the Science Club
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ScienceHub;