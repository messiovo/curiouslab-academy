import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

// --- Data for the component ---
const faqData = [
    { question: "How do I join a live session?", answer: "After enrolling, you'll receive a welcome email with a unique link to join your scheduled live classes. Simply click the link at your class time to join." },
    { question: "What subjects do you offer?", answer: "We offer a variety of subjects including Science, Math, Abacus, Chess, AI, Coding, Robotics, and Nigerian languages (Yoruba, Igbo, Hausa)." },
    { question: "Can I book a trial class?", answer: "Yes! We offer a free 30-minute trial class for all our courses. Use the contact form to select 'Book a Demo Class' to schedule one." },
    { question: "What technology do I need?", answer: "You'll need a computer or tablet with a stable internet connection, a modern web browser, and a microphone. A webcam is recommended but not required." },
];

// --- Helper Component for a single FAQ item ---
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


// --- Main Reusable FAQ Section Component ---
const FaqSection = () => {
  return (
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
  );
};

export default FaqSection;
