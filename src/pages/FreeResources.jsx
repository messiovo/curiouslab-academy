import React from 'react';

import { Download, FileText, Sparkles, Calculator } from 'lucide-react';

import Hero from '../components/Hero';

import CtaSection from '../components/CtaSection';

import contactHeroImage from '../assets/images/support-team.jpg';

const FreeResourcesPage = () => {
  return (
    <div className="bg-bg text-text">

      {/* Hero Section */}
      <Hero
        title="Free Learning Resources"
        subtitle="Fun, practical resources to help children learn, practise, and grow."
        image={contactHeroImage}
      />

      {/* ========================= */}
      {/* Number Friends Resource */}
      {/* ========================= */}

      <section className="py-20">
        <div className="container mx-auto px-6">

          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <Sparkles className="text-primary" size={32} />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Number Friends: 3–10
            </h2>

            <p className="text-text/80 text-lg">
              Help your child discover number bonds through fun,
              colourful friendship puzzles and activities.
            </p>
          </div>

          {/* Resource Card */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-card-bg rounded-2xl shadow-lg overflow-hidden">

              <div className="grid grid-cols-1 md:grid-cols-2">

                {/* Left Side */}
                <div className="p-8 md:p-10">

                  <div className="flex items-center gap-3 mb-6">

                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Calculator
                        className="text-primary"
                        size={28}
                      />
                    </div>

                    <div>
                      <p className="text-sm text-primary font-semibold">
                        FREE MATH RESOURCE
                      </p>

                      <h3 className="text-2xl font-bold">
                        Number Friends Worksheet Pack
                      </h3>
                    </div>

                  </div>

                  <p className="text-text/80 mb-6 leading-relaxed">
                    Make number bonds fun! This colourful worksheet pack
                    helps children practise number friends from
                    <strong> 3 to 10</strong>.
                  </p>

                  <div className="space-y-3 mb-8">

                    <div className="flex items-center gap-3">
                      <span className="text-primary">✓</span>
                      <span>Friends of 3 through 10</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-primary">✓</span>
                      <span>Colourful number-bond puzzles</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-primary">✓</span>
                      <span>Matching and number-bond activities</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-primary">✓</span>
                      <span>Great for home or classroom practice</span>
                    </div>

                  </div>

                  {/* Download Button */}
                  <a
                    href="/worksheets/number-friends-3-10.pdf"
                    download
                    className="inline-flex items-center justify-center gap-3
                    w-full md:w-auto
                    bg-primary text-white
                    px-7 py-4 rounded-lg
                    font-semibold
                    hover:opacity-90
                    transition-opacity"
                  >
                    <Download size={20} />
                    Download Free Worksheet
                  </a>

                </div>

                {/* Right Side */}
                <div className="bg-primary/5 p-8 md:p-10 flex items-center justify-center">

                  <div className="text-center">

                    <div className="bg-white rounded-2xl shadow-md p-8 mb-5">

                      <FileText
                        className="mx-auto text-primary mb-4"
                        size={64}
                      />

                      <p className="text-sm font-semibold text-primary mb-2">
                        CURIOUSLAB ACADEMY
                      </p>

                      <h4 className="text-xl font-bold mb-2">
                        Number Friends
                      </h4>

                      <p className="text-text/70">
                        Friends of 3–10
                      </p>

                    </div>

                    <p className="text-sm text-text/70">
                      Printable • Colourful • Child-friendly
                    </p>

                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </section>


      {/* ========================= */}
      {/* Free Abacus Practice */}
      {/* ========================= */}

      <section className="pb-20">
        <div className="container mx-auto px-6">

          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-12">

            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <Calculator
                  className="text-primary"
                  size={32}
                />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Free Abacus Practice
            </h2>

            <p className="text-text/80 text-lg">
              Give your child extra practice with simple one-column
              abacus questions designed to build speed, accuracy,
              and confidence with numbers.
            </p>

          </div>


          {/* Abacus Resource Card */}
          <div className="max-w-5xl mx-auto">

            <div className="bg-card-bg rounded-2xl shadow-lg overflow-hidden">

              <div className="grid grid-cols-1 md:grid-cols-2">

                {/* Left Side */}
                <div className="p-8 md:p-10">

                  <div className="flex items-center gap-3 mb-6">

                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Calculator
                        className="text-primary"
                        size={28}
                      />
                    </div>

                    <div>

                      <p className="text-sm text-primary font-semibold">
                        FREE ABACUS RESOURCE
                      </p>

                      <h3 className="text-2xl font-bold">
                        One-Column Abacus Practice Pack
                      </h3>

                    </div>

                  </div>


                  <p className="text-text/80 mb-6 leading-relaxed">
                    Help your child strengthen their abacus skills with
                    this printable practice pack. Children can practise
                    one-column addition and subtraction while developing
                    speed, accuracy, and confidence.
                  </p>


                  {/* Features */}
                  <div className="space-y-3 mb-8">

                    <div className="flex items-center gap-3">
                      <span className="text-primary">✓</span>
                      <span>One-column abacus practice questions</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-primary">✓</span>
                      <span>Addition and subtraction practice</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-primary">✓</span>
                      <span>Builds speed and calculation accuracy</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-primary">✓</span>
                      <span>Great for home or classroom practice</span>
                    </div>

                  </div>


                  {/* Download Button */}
                  <a
                    href="/worksheets/free-abacus-practice.pdf"
                    download
                    className="inline-flex items-center justify-center gap-3
                    w-full md:w-auto
                    bg-primary text-white
                    px-7 py-4 rounded-lg
                    font-semibold
                    hover:opacity-90
                    transition-opacity"
                  >
                    <Download size={20} />
                    Download Free Abacus Practice
                  </a>

                </div>


                {/* Right Side */}
                <div className="bg-primary/5 p-8 md:p-10 flex items-center justify-center">

                  <div className="text-center">

                    <div className="bg-white rounded-2xl shadow-md p-8 mb-5">

                      <FileText
                        className="mx-auto text-primary mb-4"
                        size={64}
                      />

                      <p className="text-sm font-semibold text-primary mb-2">
                        CURIOUSLAB ACADEMY
                      </p>

                      <h4 className="text-xl font-bold mb-2">
                        Free Abacus Practice
                      </h4>

                      <p className="text-text/70">
                        One-Column, No Compliment Practice Questions
                      </p>

                    </div>

                    <p className="text-sm text-text/70">
                      Printable • Beginner-friendly • Practice-ready
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ========================= */}
      {/* More Resources Coming Soon */}
      {/* ========================= */}

      <section className="pb-20">
        <div className="container mx-auto px-6">

          <div className="max-w-3xl mx-auto text-center bg-card-bg rounded-2xl p-8">

            <Sparkles
              className="mx-auto text-primary mb-4"
              size={28}
            />

            <h3 className="text-2xl font-bold mb-3">
              More Resources Coming Soon!
            </h3>

            <p className="text-text/75">
              We're creating more fun learning resources for curious
              young minds. Check back soon for maths, science,
              reading, abacus, and other learning activities.
            </p>

          </div>

        </div>
      </section>


      {/* CTA */}
      <CtaSection
        title="Want more fun ways to help your child learn?"
        primaryBtnText="Explore Our Courses"
        primaryBtnLink="/courses"
        secondaryBtnText="Enroll Now"
        secondaryBtnLink="/enroll"
      />

    </div>
  );
};

export default FreeResourcesPage;