import React, { useState } from 'react';
import { Download, FileText, Sparkles, Calculator, Search, X } from 'lucide-react';
import Hero from '../components/Hero';
import CtaSection from '../components/CtaSection';
import contactHeroImage from '../assets/images/support-team.jpg';

const FreeResourcesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Resource data for filtering
  const resources = [
    {
      id: 'number-friends',
      title: 'Number Friends Worksheet Pack',
      subtitle: 'Friends of 3–10',
      description: 'Make number bonds fun! This colourful worksheet pack helps children practise number friends from 3 to 10.',
      features: [
        'Friends of 3 through 10',
        'Colourful number-bond puzzles',
        'Matching and number-bond activities',
        'Great for home or classroom practice'
      ],
      downloadLink: '/worksheets/number-friends-3-10.pdf',
      downloadText: 'Download Free Worksheet',
      badge: 'FREE MATH RESOURCE',
      icon: Sparkles,
      fileIcon: FileText,
      fileLabel: 'Number Friends',
      fileSub: 'Friends of 3–10'
    },
    {
      id: 'abacus',
      title: 'One-Column Abacus Practice Pack',
      subtitle: 'One-Column, No Compliment Practice Questions',
      description: 'Help your child strengthen their abacus skills with this printable practice pack. Children can practise one-column addition and subtraction while developing speed, accuracy, and confidence.',
      features: [
        'One-column abacus practice questions',
        'Addition and subtraction practice',
        'Builds speed and calculation accuracy',
        'Great for home or classroom practice'
      ],
      downloadLink: '/worksheets/free-abacus-practice.pdf',
      downloadText: 'Download Free Abacus Practice',
      badge: 'FREE ABACUS RESOURCE',
      icon: Calculator,
      fileIcon: FileText,
      fileLabel: 'Free Abacus Practice',
      fileSub: 'One-Column, No Compliment Practice Questions'
    },
    {
      id: 'break-it-apart',
      title: 'Break-It-Apart Worksheet',
      subtitle: 'Number Town Mission',
      description: 'Help children master place value and addition with this engaging "Break-It-Apart" worksheet. Kids break numbers into tens and ones, add the parts, then put them back together.',
      features: [
        'Step-by-step number breaking strategy',
        'Worked example with guided practice',
        '6 practice cases with self-assessment',
        'Bonus: "Make Your Own Mystery" section'
      ],
      downloadLink: '/worksheets/break-it-apart.pdf',
      downloadText: 'Download Break-It-Apart Worksheet',
      badge: 'FREE MATH RESOURCE',
      icon: Sparkles,
      fileIcon: FileText,
      fileLabel: 'Break-It-Apart',
      fileSub: 'Number Town Mission'
    }
  ];

  // Filter resources based on search term
  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-bg text-text">

      {/* Hero Section */}
      <Hero
        title="Free Learning Resources"
        subtitle="Fun, practical resources to help children learn, practise, and grow."
        image={contactHeroImage}
      />

      {/* Search Bar */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text/50" size={20} />
              <input
                type="text"
                placeholder="Search resources by title, description, or feature..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-xl border border-text/20 bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent text-text placeholder-text/50"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text/50 hover:text-text transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </div>
            <p className="text-sm text-text/60 mt-2 text-center">
              {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'} found
            </p>
          </div>
        </div>
      </section>

      {/* Resource Sections */}
      {filteredResources.map((resource, index) => (
        <section key={resource.id} className={index === filteredResources.length - 1 ? 'pb-20' : 'pb-0'}>
          <div className="container mx-auto px-6">
            {/* Section Heading */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <resource.icon className="text-primary" size={32} />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {resource.title}
              </h2>
              <p className="text-text/80 text-lg">
                {resource.description}
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
                        <resource.icon className="text-primary" size={28} />
                      </div>
                      <div>
                        <p className="text-sm text-primary font-semibold">
                          {resource.badge}
                        </p>
                        <h3 className="text-2xl font-bold">
                          {resource.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-text/80 mb-6 leading-relaxed">
                      {resource.description}
                    </p>

                    <div className="space-y-3 mb-8">
                      {resource.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <span className="text-primary">✓</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Download Button */}
                    <a
                      href={resource.downloadLink}
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
                      {resource.downloadText}
                    </a>
                  </div>

                  {/* Right Side */}
                  <div className="bg-primary/5 p-8 md:p-10 flex items-center justify-center">
                    <div className="text-center">
                      <div className="bg-white rounded-2xl shadow-md p-8 mb-5">
                        <resource.fileIcon
                          className="mx-auto text-primary mb-4"
                          size={64}
                        />
                        <p className="text-sm font-semibold text-primary mb-2">
                          CURIOUSLAB ACADEMY
                        </p>
                        <h4 className="text-xl font-bold mb-2">
                          {resource.fileLabel}
                        </h4>
                        <p className="text-text/70">
                          {resource.fileSub}
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
      ))}

      {/* "No results" message */}
      {filteredResources.length === 0 && (
        <section className="pb-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center bg-card-bg rounded-2xl p-8">
              <Search className="mx-auto text-text/50 mb-4" size={32} />
              <h3 className="text-2xl font-bold mb-3">
                No resources found
              </h3>
              <p className="text-text/75">
                Try adjusting your search terms or browse all our available resources above.
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 text-primary font-semibold hover:underline"
              >
                Clear search
              </button>
            </div>
          </div>
        </section>
      )}

      {/* More Resources Coming Soon */}
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