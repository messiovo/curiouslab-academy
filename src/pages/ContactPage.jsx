// src/pages/ContactPage.jsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, ChevronDown, Check } from 'lucide-react';

// Import reusable components
import Hero from '../components/Hero';
import CtaSection from '../components/CtaSection';

// Import page-specific images
import contactHeroImage from '../assets/images/support-team.jpg';

// --- Data for the page ---
const contactDetails = [
  { icon: <Mail />, title: "Email", lines: ["info@curiouslabacademy.com", "support@curiouslabacademy.com"] },
  { icon: <Phone />, title: "Phone", lines: ["+234 815 301 0297", "+1 (555) 123-4567 (Intl)"] },
  { icon: <MapPin />, title: "Location", lines: ["Lekki Phase 1,", "Lagos, Nigeria"] },
  { icon: <Clock />, title: "Office Hours", lines: ["Mon – Fri: 9am – 6pm (WAT)", "Saturday: 10am – 4pm (WAT)"] },
];

const faqData = [
    { question: "How do I join a live session?", answer: "After enrolling, you'll receive a welcome email with a unique link to join your scheduled live classes. Simply click the link at your class time to join." },
    { question: "What subjects do you offer?", answer: "We offer a variety of subjects including Science, Math, Abacus, Chess, AI, Coding, Robotics, and Nigerian languages (Yoruba, Igbo, Hausa)." },
    { question: "Can I book a trial class?", answer: "Yes! We offer a free 30-minute trial class for all our courses. Use the contact form to select 'Book a Demo Class' to schedule one." },
    { question: "What technology do I need?", answer: "You'll need a computer or tablet with a stable internet connection, a modern web browser, and a microphone. A webcam is recommended but not required." },
];

// --- Helper Components ---

// Reusable animated FAQ item
const FaqItem = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-black/10 dark:border-white/10">
            <button onClick={() => setIsOpen(!isOpen)} className="flex justify-between items-center w-full py-4 text-left">
                <span className="font-semibold">{item.question}</span>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                    <ChevronDown size={20} />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-4 text-text/80">{item.answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- Main ContactPage Component ---

const ContactPage = () => {
  const [subject, setSubject] = useState('');
  const [showDemoFields, setShowDemoFields] = useState(false);

  useEffect(() => {
    setShowDemoFields(subject === 'Book a Demo Class');
  }, [subject]);
  
  // Generate Saturday time slots
  const timeSlots = Array.from({ length: 10 }, (_, i) => {
    const hour = 8 + i;
    return `${hour}:00 AM`;
  }).map(time => time.replace('12:00 AM', '12:00 PM').replace('13:00', '1:00').replace('14:00', '2:00').replace('15:00', '3:00').replace('16:00', '4:00').replace('17:00', '5:00 PM'));

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
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name</label>
                  <input type="text" id="name" className="w-full p-3 rounded-md bg-bg border border-black/10 dark:border-white/10" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                  <input type="email" id="email" className="w-full p-3 rounded-md bg-bg border border-black/10 dark:border-white/10" required />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                  <select id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full p-3 rounded-md bg-bg border border-black/10 dark:border-white/10" required>
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
                        <select id="demo-time" className="w-full p-3 rounded-md bg-bg border border-black/10 dark:border-white/10" required>
                          <option value="">Select a time slot</option>
                          {timeSlots.map(time => <option key={time} value={time}>{time}</option>)}
                        </select>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Your Message</label>
                  <textarea id="message" rows="5" className="w-full p-3 rounded-md bg-bg border border-black/10 dark:border-white/10" required></textarea>
                </div>
                <button type="submit" className="w-full bg-primary text-white py-3 rounded-md font-semibold hover:opacity-90 transition-opacity">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 bg-card-bg">
          <div className="container mx-auto px-6 max-w-4xl">
              <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
              </div>
              <div>
                  {faqData.map((item, index) => <FaqItem key={index} item={item} />)}
              </div>
          </div>
      </section>

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