// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, ChevronDown } from 'lucide-react';

// 1. Import your logo files
import logoLight from '../assets/images/logo-light.svg';
import logoDark from '../assets/images/logo-dark.svg';

// CuriousLab dropdown items - easily add more here
const curiousLabPrograms = [
  { title: 'CuriousLab Abacus', href: '/abacus-learning' },
  { title: 'CuriousLab 11+ Math', href: '/math-11-plus' },
  { title: 'CuriousLab 13+ Science', href: '/science-13-plus' },
  { title: 'CuriousLab English Express', href: '/english-express' },
  { title: 'CuriousLab AI Innovators', href: '/ai-innovators' },
  { title: 'CuriousLab Yoruba Heritage', href: '/yoruba-heritage' },
];

const navLinksData = [
  { title: 'Home', href: '/' },
  { title: 'Courses', href: '/courses' },
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
];

const mobileMenuVariants = {
  open: { opacity: 1, y: 0, transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
  closed: { opacity: 0, y: "-20px", transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const menuItemVariants = {
  open: { y: 0, opacity: 1, transition: { ease: "easeOut" } },
  closed: { y: 20, opacity: 0, transition: { ease: "easeIn" } },
};

const dropdownVariants = {
  open: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  closed: { 
    opacity: 0, 
    y: -10, 
    scale: 0.95,
    transition: { duration: 0.15, ease: "easeIn" }
  },
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMobileDropdownOpen(false); // Close mobile dropdown when toggling menu
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const NavLinks = ({ isMobile = false }) => (
    <>
      {navLinksData.map(link => (
        <motion.li key={link.title} variants={isMobile ? menuItemVariants : {}}>
          <Link 
            to={link.href} 
            onClick={isMobile ? toggleMobileMenu : undefined} 
            className="text-text hover:text-primary dark:hover:text-secondary transition-colors font-medium"
          >
            {link.title}
          </Link>
        </motion.li>
      ))}
      
      {/* CuriousLab Dropdown */}
      {isMobile ? (
        // Mobile dropdown
        <motion.li variants={menuItemVariants}>
          <button
            onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
            className="flex items-center w-full text-left text-text hover:text-primary dark:hover:text-secondary transition-colors font-medium"
          >
            CuriousLab Learning Platform & Games
            <ChevronDown 
              size={16} 
              className={`ml-1 transform transition-transform ${isMobileDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>
          <AnimatePresence>
            {isMobileDropdownOpen && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 ml-4 space-y-3 border-l-2 border-primary/20 pl-4"
              >
                {curiousLabPrograms.map(program => (
                  <motion.li 
                    key={program.title}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Link
                      to={program.href}
                      onClick={toggleMobileMenu}
                      className="text-text/80 hover:text-primary dark:hover:text-secondary transition-colors text-sm"
                    >
                      {program.title}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.li>
      ) : (
        // Desktop dropdown
        <li className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            onMouseEnter={() => setIsDropdownOpen(true)}
            className="flex items-center text-text hover:text-primary dark:hover:text-secondary transition-colors font-medium"
          >
            CuriousLab Learning Platform & Games
            <ChevronDown 
              size={16} 
              className={`ml-1 transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>
          
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={dropdownVariants}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                className="absolute top-full left-0 mt-2 w-64 bg-bg border border-black/10 dark:border-white/10 rounded-lg shadow-xl z-50"
              >
                <ul className="py-2">
                  {curiousLabPrograms.map((program, index) => (
                    <li key={program.title}>
                      <Link
                        to={program.href}
                        className="block px-4 py-3 text-text hover:bg-primary/10 dark:hover:bg-secondary/10 hover:text-primary dark:hover:text-secondary transition-colors"
                      >
                        {program.title}
                      </Link>
                      {index < curiousLabPrograms.length - 1 && (
                        <hr className="border-black/5 dark:border-white/5" />
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </li>
      )}
    </>
  );

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
            <NavLinks />
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
                  <NavLinks isMobile={true} />
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
