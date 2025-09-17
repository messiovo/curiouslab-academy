// src/components/HeroSlider.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade'; // For fade effect

// Import your hero background images
import heroBg1 from '../assets/images/bg3.webp';
import heroBg2 from '../assets/images/bg2.webp';
import heroBg3 from '../assets/images/bg1.webp';

const slidesData = [
  {
    id: 1,
    image: heroBg1,
    title: "Making Learning Fun & Interactive for Kids!",
    subtitle: "CuriousLab Academy offers engaging educational programs that spark curiosity and foster a love for learning.",
    btnText: "Get Started",
    btnLink: "/enroll",
  },
  {
    id: 2,
    image: heroBg2,
    title: "Unlock Your Child's Potential",
    subtitle: "Our hands-on approach builds confidence and critical thinking skills in a vibrant, supportive environment.",
    btnText: "Explore Courses",
    btnLink: "/courses",
  },
  {
    id: 3,
    image: heroBg3,
    title: "Innovative Programs for Bright Futures",
    subtitle: "From science experiments to creative arts, discover a world of endless possibilities for young minds.",
    btnText: "Learn More",
    btnLink: "/about",
  },
];

const HeroSlider = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation, EffectFade]}
      effect="fade" // Use fade effect for smooth transitions
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{
        delay: 5000, // 5 seconds per slide
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      navigation={true}
      loop={true}
      className="w-full h-[70vh] md:h-screen" // Full viewport height
    >
      {slidesData.map((slide) => (
        <SwiperSlide key={slide.id}>
          <section
            className="relative h-full bg-cover bg-center text-white flex items-center justify-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Semi-transparent overlay */}
            <div className="absolute inset-0 bg-black/50 z-0"></div>

            {/* Slide Content */}
            <div className="relative z-10 container mx-auto px-6 text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                {slide.title}
              </h1>
              {slide.subtitle && (
                <p className="text-lg md:text-xl max-w-3xl mx-auto">
                  {slide.subtitle}
                </p>
              )}
              {slide.btnText && slide.btnLink && (
                <div className="pt-4">
                  <Link
                    to={slide.btnLink}
                    className="bg-primary text-white py-3 px-8 rounded-md text-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    {slide.btnText}
                  </Link>
                </div>
              )}
            </div>
          </section>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;