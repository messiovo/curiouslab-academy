// src/pages/CourseDetailPage.jsx

import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { coursesData } from '../data/courses.jsx';
import { Check, Star, GraduationCap } from 'lucide-react';

// Import reusable components
import Hero from '../components/Hero';
import CtaSection from '../components/CtaSection';

// A small helper component to render star ratings
const StarRating = ({ rating }) => (
  <div className="flex text-yellow-400">
    {[...Array(rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
  </div>
);

const CourseDetailPage = () => {
  // 1. Get the 'courseId' from the URL (e.g., "science-explorers")
  const { courseId } = useParams();
  
  // 2. Find the correct course object in our data file
  const course = coursesData.find(c => c.id === courseId);

  // 3. If no course is found, redirect to the main /courses page
  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  // 4. If a course is found, render the page with its data
  return (
    <div className="bg-bg text-text">
      <Hero
        title={course.title}
        subtitle={course.heroSubtitle}
        btnText="Enroll Now"
        btnLink="/enroll"
        image={course.heroImage}
      />

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Main Content Column */}
            <div className="lg:w-2/3 space-y-10">
              <div id="about">
                <h2 className="text-3xl font-bold mb-4">About This Course</h2>
                <p className="text-text/80 leading-relaxed">{course.about}</p>
              </div>

              <div id="learn">
                <h3 className="text-2xl font-bold mb-4">What You'll Learn</h3>
                <ul className="space-y-3">
                  {course.learningOutcomes.map(item => (
                    <li key={item} className="flex items-start"><Check size={20} className="text-secondary mr-3 flex-shrink-0 mt-1" />{item}</li>
                  ))}
                </ul>
              </div>
              
              <div id="structure">
                <h3 className="text-2xl font-bold mb-4">Course Structure</h3>
                <ol className="space-y-4 list-decimal list-inside">
                  {course.courseStructure.map(item => (
                    <li key={item.title} className="pl-2"><strong className="font-semibold">{item.title}:</strong> {item.detail}</li>
                  ))}
                </ol>
              </div>

              <div id="enroll">
                <h3 className="text-2xl font-bold mb-4">Who Should Enroll</h3>
                <p className="text-text/80">{course.whoShouldEnroll}</p>
              </div>
              
              <div id="materials">
                <h3 className="text-2xl font-bold mb-4">Course Materials</h3>
                <ul className="space-y-3">
                  {course.materials.map(item => (
                    <li key={item} className="flex items-start"><Check size={20} className="text-secondary mr-3 flex-shrink-0 mt-1" />{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar Column */}
            <aside className="lg:w-1/3">
              <div className="sticky top-28 space-y-6">
                
                {/* Course Overview Card */}
                <div className="bg-card-bg p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-4">Course Overview</h3>
                  <div className="space-y-3 text-sm">
                    {Object.entries(course.overview).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b border-black/5 dark:border-white/5 pb-2">
                        <span className="font-semibold capitalize text-text/80">{key.replace(/([A-Z])/g, ' $1')}:</span>
                        <span className="font-medium text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/enroll" className="mt-6 bg-primary text-white w-full block text-center py-3 rounded-md font-semibold hover:opacity-90 transition-opacity">Enroll Now</Link>
                </div>
                
                {/* Instructor Card */}
                <div className="bg-card-bg p-6 rounded-lg shadow-lg text-center">
                  <h3 className="text-xl font-bold mb-4">Instructor</h3>
                  <GraduationCap size={48} className="mx-auto text-primary mb-3" />
                  <h4 className="font-bold text-lg">{course.instructor.name}</h4>
                  <p className="text-sm text-text/70 mb-2">{course.instructor.title}</p>
                  <p className="text-sm text-text/80">{course.instructor.bio}</p>
                </div>
                
                {/* Reviews Card */}
                <div className="bg-card-bg p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-4">Parent Reviews</h3>
                  <div className="space-y-4">
                    {course.reviews.map((review, index) => (
                      <div key={index}>
                        <StarRating rating={review.rating} />
                        <p className="italic text-sm my-1">"{review.text}"</p>
                        <p className="text-xs text-right font-semibold">{review.author}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </aside>
          </div>
        </div>
      </section>

      <CtaSection
        title={`Ready to ignite your child's passion for ${course.title}?`}
        primaryBtnText="Enroll Now"
        primaryBtnLink="/enroll"
        secondaryBtnText="View All Courses"
        secondaryBtnLink="/courses"
      />
    </div>
  );
};

export default CourseDetailPage;