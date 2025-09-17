// src/components/TestimonialsSlider.jsx

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Quote, User } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Manage all testimonials in this easy-to-edit array
const testimonialsData = [
  {
    quote: "My daughter used to hate math, but after joining Math Wizards, she can't wait for her next lesson! It's been a game-changer.",
    author: 'Sarah Adeyemi',
    role: 'Parent of 8-year-old',
  },
  {
    quote: "The AI Innovators course was incredible. My son built a simple chatbot and now he's fascinated with technology's future.",
    author: 'Tunde Okoro',
    role: 'Parent of 11-year-old',
  },
  {
    quote: "The Science Explorers program has ignited a passion for learning in my son that I've never seen before. Highly recommended!",
    author: 'Uche Okafor',
    role: 'Parent of 10-year-old',
  },
  {
    quote: "I learned Yoruba so fast! The teachers make it really fun with songs and games. It's my favorite class now.",
    author: 'Aisha Bello',
    role: 'Student, Age 9',
  },
  {
    quote: "An outstanding program. The hands-on activities are fantastic and my daughter's confidence has soared since she started.",
    author: 'Funke Williams',
    role: 'Parent of 7-year-old',
  },
  {
    quote: "The English Express course helped me so much with my writing. I feel much more prepared for my exams.",
    author: 'Chinedu Eze',
    role: 'Student, Age 12',
  },
];

const TestimonialsSlider = () => {
  return (
    <section className="py-20 bg-bg text-text">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold">What Parents & Kids Say</h2>
        </div>

        <Swiper
          className="testimonial-slider"
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          loop={true}
          slidesPerView={1}
          breakpoints={{
            // when window width is >= 640px
            640: {
              slidesPerView: 1,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 2,
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonialsData.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-card-bg p-8 rounded-lg shadow-lg flex flex-col min-h-[280px] lg:min-h-[320px]">
                <Quote size={32} className="text-primary mb-4 flex-shrink-0" />
                <p className="flex-grow text-text/90 italic mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="pt-6 border-t border-black/10 dark:border-white/10 flex items-center flex-shrink-0">
                  <div className="bg-primary/20 p-2 rounded-full mr-4">
                    <User size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.author}</h4>
                    <p className="text-sm text-text/70">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <style jsx>{`
          .testimonial-slider {
            padding-bottom: 3rem;
          }
          
          .testimonial-slider .swiper-slide {
            height: auto;
            display: flex;
          }
          
          .testimonial-slider .swiper-slide > div {
            width: 100%;
          }
        `}</style>
      </div>
    </section>
  );
};

export default TestimonialsSlider;