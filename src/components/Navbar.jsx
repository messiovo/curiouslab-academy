// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';

// 1. Import your logo files
import logoLight from '../assets/images/logo-light.svg';
import logoDark from '../assets/images/logo-dark.svg';

const navLinksData = [
  { title: 'Home', href: '/' },
  { title: 'Courses', href: '/courses' },
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
  //{ title: 'Career', href: '/careers' },
  { title: 'Ms. Abacus by CuriousLab', href: '/abacus-learning' },
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

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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