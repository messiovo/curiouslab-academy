// src/pages/AboutPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Search, CalendarCheck, Laptop, Presentation, ListChecks, Star, Video, CalendarDays, Gamepad2, Check } from 'lucide-react';

// Import reusable components
import Hero from '../components/Hero'; 
import TestimonialsSlider from '../components/TestimonialsSlider';
import CtaSection from '../components/CtaSection';

// Import page-specific images
import aboutHeroImage from '../assets/images/live-class.webp';
import whoWeAreImage from '../assets/images/virtual-class.webp';


// --- Data for repetitive sections ---

const processStepsData = [
  { icon: <Search />, title: "1. Explore Courses", description: "Browse our diverse course offerings and select the perfect program for your child's interests.", points: ["Detailed course descriptions", "Age-appropriate learning paths", "Free trial class available"] },
  { icon: <CalendarCheck />, title: "2. Schedule Classes", description: "Live classes that are tailored to fit your family's schedule across different time zones.", points: ["Flexible scheduling options", "Small class sizes (max 8)", "30-120 minute sessions"] },
  { icon: <Laptop />, title: "3. Join Live Session", description: "Access our interactive virtual classroom with just one click - no complicated software required.", points: ["Real-time video and audio", "Interactive whiteboard", "Screen sharing capabilities"] },
  { icon: <Presentation />, title: "4. Engage & Learn", description: "Participate in dynamic lessons with hands-on activities, games, and collaborative projects.", points: ["Live Q&A with instructors", "Breakout rooms for group work", "Instant feedback and support"] },
  { icon: <ListChecks />, title: "5. Practice & Progress", description: "Reinforce learning with fun homework assignments and track your child's progress over time.", points: ["Interactive practice exercises", "Progress reports", "Certificate of completion"] },
  { icon: <Star />, title: "6. Celebrate Success", description: "Watch your child gain confidence and skills while developing a lifelong love for learning.", points: ["Showcase projects", "Performance celebrations", "Continued learning paths"] },
];

const whyChooseUsData = [
    { icon: <Video />, title: "Live Interactive Lessons", description: "Real-time classes with expert instructors who engage students through dynamic teaching methods." },
    { icon: <Presentation />, title: "Expert Educators", description: "Passionate and qualified teachers with specialized training in online education for children." },
    { icon: <CalendarDays />, title: "Flexible Scheduling", description: "Convenient class times to fit your child's routine, with options for different time zones." },
    { icon: <Gamepad2 />, title: "Fun & Engaging Learning", description: "Interactive activities, quizzes, and live participation make lessons exciting and memorable." },
];


// --- Main AboutPage Component ---

const AboutPage = () => {
  return (
    <div className="bg-bg text-text">
      <Hero
        title="Bringing Learning to Life with Interactive Live Classes!"
        subtitle="CuriousLabAcademy offers engaging live sessions in Science, Math, and Languages, making learning fun and accessible from anywhere."
        btnText="Join a Live Class Today"
        btnLink="/enroll"
        image={aboutHeroImage}
      />

      {/* Who We Are Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-xl md:text-3xl font-bold mb-4">Who We Are</h2>
              <p className="text-text/80 pb-4">
                CuriousLabAcademy is an innovative online learning platform that offers interactive, instructor-led live classes for children worldwide. Our mission is to make Science, Mathematics, and Languages engaging and accessible through fun, structured, and expert-led lessons.
              </p>
              <p className="text-text/80 pb-4">
                In addition to our core subjects, we introduce children to the Abacus (Soroban) method, a proven tool for building strong foundations in arithmetic and enhancing mental calculation skills. Through hands-on practice and game-based learning, we aim to develop children’s 
                cognitive abilities, focus, memory, and problem-solving skills in a way that feels both exciting and rewarding.
              </p>
              <p className="text-text/80">
                Our specially designed Abacus games and activities help learners progress from basic bead movements to advanced mental math, fostering confidence and a lifelong love for learning.
              </p>
            </div>
            <div className="md:w-1/2">
              <img src={whoWeAreImage} alt="Students in a virtual class" className="rounded-lg shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* How Our Live Classes Work Section */}
      <section className="py-20 bg-card-bg">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold">How Our Live Classes Work</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {processStepsData.map(step => (
              <div key={step.title} className="bg-bg p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="bg-primary/10 text-primary p-4 rounded-full mb-6 w-max">{step.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-text/80 mb-4">{step.description}</p>
                <ul className="space-y-2 text-left">
                    {step.points.map(point => (
                        <li key={point} className="flex items-start"><Check size={20} className="text-secondary mr-2 flex-shrink-0 mt-1" /> {point}</li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Mission & Vision Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-primary/10 p-8 rounded-lg">
                    <h2 className="text-xl md:text-3xl font-bold mb-4">Our Mission</h2>
                    <p className="text-text/80">To inspire a love for learning by offering live, interactive classes that encourage curiosity, critical thinking, and academic excellence.</p>
                </div>
                <div className="bg-primary/10 p-8 rounded-lg">
                    <h2 className="text-xl md:text-3xl font-bold mb-4">Our Vision</h2>
                    <p className="text-text/80">To build a global learning community where children feel empowered to explore, learn, and excel in a dynamic virtual environment.</p>
                </div>
            </div>
        </div>
      </section>
            {/* Why Choose Us Section */}
        <section className="py-20 bg-card-bg">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold">Why Choose CuriousLab Academy?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUsData.map(reason => (
                <div 
                key={reason.title} 
                className="bg-bg p-8 rounded-lg shadow-lg text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                >
                <div className="bg-primary/10 text-primary p-4 rounded-full mb-6 w-max mx-auto">{reason.icon}</div>
                <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
                <p className="text-text/80">{reason.description}</p>
                </div>
            ))}
            </div>
        </div>
        </section>
      
      <TestimonialsSlider />

      <CtaSection
        title="Join our next live class and experience learning like never before!"
        primaryBtnText="Sign Up for a Live Class"
        primaryBtnLink="/enroll"
        secondaryBtnText="Contact Us"
        secondaryBtnLink="/contact"
      />
    </div>
  );
};

export default AboutPage;