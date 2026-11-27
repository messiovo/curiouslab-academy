// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, ChevronDown } from 'lucide-react';

// 1. Import your logo files
import logoLight from '../assets/images/logo-light.svg';
import logoDark from '../assets/images/logo-dark.svg';

// 2. Restructured Data
const mainNavLinks = [
  { title: 'Home', href: '/' },
  { title: 'Courses', href: '/courses' },
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
];

const exploreLinks = [
  { title: 'Science Hub', href: '/science-hub' }, // Point this to your new Science Hub page
  { title: 'Free Resources', href: '/free-resources' },
  { title: 'Ms. Abacus', href: '/abacus-learning' },
];

const mobileMenuVariants = {
  open: { opacity: 1, y: 0, transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
  closed: { opacity: 0, y: "-20px", transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const menuItemVariants = {
  open: { y: 0, opacity: 1, transition: { ease: "easeOut" } },
  closed: { y: 20, opacity: 0, transition: { ease: "easeIn" } },
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsExploreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <header className="bg-bg text-text sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img src={logoLight} alt="CuriousLab Academy Logo" className="h-8 block dark:hidden" />
          <img src={logoDark} alt="CuriousLab Academy Logo" className="h-8 hidden dark:block" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-8">
            {/* Main Links */}
            {mainNavLinks.map((link) => (
              <li key={link.title}>
                <Link
                  to={link.href}
                  className="text-text hover:text-primary dark:hover:text-secondary transition-colors font-medium"
                >
                  {link.title}
                </Link>
              </li>
            ))}

            {/* Explore Dropdown */}
            <li className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsExploreOpen(!isExploreOpen)}
                className="flex items-center space-x-1 text-text hover:text-primary dark:hover:text-secondary transition-colors font-medium focus:outline-none"
              >
                <span>Explore</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${isExploreOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isExploreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-4 w-48 bg-bg border border-gray-200 dark:border-gray-700 rounded-md shadow-lg py-2"
                  >
                    {exploreLinks.map((link) => (
                      <Link
                        key={link.title}
                        to={link.href}
                        onClick={() => setIsExploreOpen(false)}
                        className="block px-4 py-2 text-text hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary transition-colors"
                      >
                        {link.title}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link to="/enroll" className="hidden md:block bg-secondary text-white py-2 px-5 rounded-md font-semibold hover:opacity-90 transition-opacity">
            Enroll Now
          </Link>
          <button onClick={toggleMobileMenu} className="md:hidden p-2 z-50">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="md:hidden absolute top-full left-0 w-full bg-bg shadow-lg border-t border-black/10 dark:border-white/10"
            >
              <nav className="p-6">
                <ul className="flex flex-col space-y-5">
                  {/* Mobile Main Links */}
                  {mainNavLinks.map((link) => (
                    <motion.li key={link.title} variants={menuItemVariants}>
                      <Link
                        to={link.href}
                        onClick={toggleMobileMenu}
                        className="text-text hover:text-primary dark:hover:text-secondary transition-colors font-medium block"
                      >
                        {link.title}
                      </Link>
                    </motion.li>
                  ))}

                  {/* Mobile Explore Section (Simplified for mobile) */}
                  <motion.li variants={menuItemVariants} className="pt-2">
                    <span className="text-gray-500 dark:text-gray-400 font-semibold uppercase text-xs tracking-wider">Explore</span>
                    <ul className="mt-3 flex flex-col space-y-3 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                      {exploreLinks.map((link) => (
                        <li key={link.title}>
                          <Link
                            to={link.href}
                            onClick={toggleMobileMenu}
                            className="text-text hover:text-primary dark:hover:text-secondary transition-colors font-medium block"
                          >
                            {link.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.li>

                  {/* Mobile Enroll Button */}
                  <motion.li variants={menuItemVariants} className="pt-4">
                    <Link to="/enroll" onClick={toggleMobileMenu} className="bg-primary text-white text-center w-full block py-2 px-5 rounded-md font-semibold hover:opacity-90 transition-opacity">
                      Enroll Now
                    </Link>
                  </motion.li>
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;