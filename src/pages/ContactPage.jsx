import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

// Import reusable components
import Hero from '../components/Hero';
import CtaSection from '../components/CtaSection';
import FaqSection from '../components/FaqSection'; 

// Import page-specific images
import contactHeroImage from '../assets/images/support-team.jpg';

// --- Data for the page ---
const contactDetails = [
  { icon: <Mail />, title: "Email", lines: ["info@curiouslabacademy.com", "support@curiouslabacademy.com"] },
  { icon: <Phone />, title: "Phone", lines: ["+234 815 301 0297", "+1 (555) 123-4567 (Intl)"] },
  { icon: <MapPin />, title: "Location", lines: ["Lekki Phase 1,", "Lagos, Nigeria"] },
  { icon: <Clock />, title: "Office Hours", lines: ["Mon – Fri: 09:00 – 18:00 (WAT)", "Saturday: 10:00 – 16:00 (WAT)"] },
];

// --- Main ContactPage Component ---

const ContactPage = () => {
  const [subject, setSubject] = useState('');
  const [showDemoFields, setShowDemoFields] = useState(false);

  useEffect(() => {
    setShowDemoFields(subject === 'Book a Demo Class');
  }, [subject]);
  
  // Generate Saturday time slots in 24-hour format from 9:00 to 17:00
  const timeSlots = Array.from({ length: 9 }, (_, i) => {
    const hour = 9 + i;
    return `${String(hour).padStart(2, '0')}:00`;
  });

  return (
    <div className="bg-bg text-text">
      <Hero
        title="Have Questions? We're Here to Help!"
        subtitle="Reach out to us for inquiries about our live classes, courses, and schedules."
        image={contactHeroImage}
      />

      <section className="py-20" id="contact-form">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Details Column */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Get in Touch</h2>
              {contactDetails.map(item => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="text-primary mt-1">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    {item.lines.map(line => <p key={line} className="text-text/80">{line}</p>)}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form Column */}
            <div className="bg-card-bg p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              {/* Form now submits to the specified email address using a mailto action */}
              <form 
                action="mailto:mercy@curiouslabacademy.com" 
                method="post" 
                encType="text/plain"
                className="space-y-6"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name</label>
                  <input type="text" id="name" name="name" className="w-full p-3 rounded-md bg-bg border border-black/10 dark:border-white/10" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                  <input type="email" id="email" name="email" className="w-full p-3 rounded-md bg-bg border border-black/10 dark:border-white/10" required />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                  <select id="subject" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full p-3 rounded-md bg-bg border border-black/10 dark:border-white/10" required>
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Course Information">Course Information</option>
                    <option value="Book a Demo Class">Book a Demo Class</option>
                    <option value="Technical Support">Technical Support</option>
                  </select>
                </div>
                
                <AnimatePresence>
                  {showDemoFields && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-primary/10 p-4 rounded-md">
                        <label htmlFor="demo-time" className="block text-sm font-medium mb-1">Select a time for this Saturday</label>
                        <select id="demo-time" name="demo-time" className="w-full p-3 rounded-md bg-bg border border-black/10 dark:border-white/10" required>
                          <option value="">Select a time slot</option>
                          {timeSlots.map(time => <option key={time} value={time}>{time}</option>)}
                        </select>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Your Message</label>
                  <textarea id="message" name="message" rows="5" className="w-full p-3 rounded-md bg-bg border border-black/10 dark:border-white/10" required></textarea>
                </div>
                <button type="submit" className="w-full bg-primary text-white py-3 rounded-md font-semibold hover:opacity-90 transition-opacity">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Use the new reusable FAQ component */}
      <FaqSection />

      <CtaSection
        title="We'd love to hear from you! Let's make learning fun together."
        primaryBtnText="Enroll Now"
        primaryBtnLink="/enroll"
        secondaryBtnText="View Courses"
        secondaryBtnLink="/courses"
      />
    </div>
  );
};

export default ContactPage;
