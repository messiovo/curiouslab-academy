// src/pages/NotFoundPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, AlertCircle } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-bg text-text flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <AlertCircle size={80} className="mx-auto text-primary" />
          <h1 className="text-6xl font-bold mt-4">404</h1>
          <h2 className="text-2xl font-semibold mt-2">Page Not Found</h2>
        </motion.div>
        
        <motion.p 
          className="text-text/70 mb-8 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Oops! The page you're looking for seems to have wandered off into the digital void.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link 
            to="/"
            className="bg-primary text-white py-3 px-6 rounded-md font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Home size={20} />
            Go Home
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="border border-primary text-primary py-3 px-6 rounded-md font-medium hover:bg-primary/10 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </motion.div>
        
        <motion.div 
          className="mt-12 pt-8 border-t border-black/10 dark:border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p className="text-text/60">
            Need help? <Link to="/contact" className="text-primary hover:underline">Contact us</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;