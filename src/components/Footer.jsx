
// src/components/Footer.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, ChevronDown } from 'lucide-react';

// Import your logo files
import logoLight from '../assets/images/logo-light.svg';
import logoDark from '../assets/images/logo-dark.svg';

// CuriousLab programs (same as navbar)
const curiousLabPrograms = [
  { title: 'CuriousLab Abacus', href: '/abacus-learning' },
  { title: 'CuriousLab 11+ Math', href: '/math-11-plus' },
  { title: 'CuriousLab 13+ Science', href: '/science-13-plus' },
  { title: 'CuriousLab English Express', href: '/english-express' },
  { title: 'CuriousLab AI Innovators', href: '/ai-innovators' },
  { title: 'CuriousLab Yoruba Heritage', href: '/yoruba-heritage' },
];

const quickLinks = [
  { title: 'About Us', href: '/about' },
  { title: 'Courses', href: '/courses' },
  { title: 'Contact', href: '/contact' },
  { title: 'Terms of Service', href: '/terms-of-service' },
  { title: 'Privacy Policy', href: '/privacy-policy' },
  
];

const socialLinks = [
  { label: 'Facebook', href: '#', icon: <Facebook size={20} /> },
  { label: 'Twitter', href: '#', icon: <Twitter size={20} /> },
  { label: 'Instagram', href: '#', icon: <Instagram size={20} /> },
  { label: 'LinkedIn', href: '#', icon: <Linkedin size={20} /> },
  { label: 'YouTube', href: '#', icon: <Youtube size={20} /> },
];

const Footer = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <footer className="bg-card-bg text-text border-t border-black/10 dark:border-white/10">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: About */}
          <div className="space-y-4">
            <Link to="/">
              <img src={logoLight} alt="CuriousLab Academy Logo" className="h-8 block dark:hidden" />
              <img src={logoDark} alt="CuriousLab Academy Logo" className="h-8 hidden dark:block" />
            </Link>
            <p className="text-sm">
              CuriousLab Academy is dedicated to making learning an exciting adventure for children through interactive and engaging educational programs.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.title}>
                  <Link to={link.href} className="hover:text-primary dark:hover:text-secondary transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: CuriousLab Programs */}
          <div>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center font-bold text-lg mb-4 hover:text-primary dark:hover:text-secondary transition-colors"
            >
              CuriousLab Learning Platforms & Games
              <ChevronDown 
                size={16} 
                className={`ml-2 transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ${isDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-20 opacity-70'}`}>
              <ul className="space-y-2">
                {curiousLabPrograms.map(program => (
                  <li key={program.title}>
                    <Link 
                      to={program.href} 
                      className="hover:text-primary dark:hover:text-secondary transition-colors text-sm block"
                    >
                      {program.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4: Connect With Us */}
          <div>
            <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map(social => (
                <a 
                  key={social.label} 
                  href={social.href} 
                  aria-label={social.label}
                  className="p-2 rounded-full bg-bg hover:text-primary dark:hover:text-secondary transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="space-y-2 text-sm">
              <p className="flex items-center">
                <Mail size={16} className="mr-2 flex-shrink-0" /> info@curiouslabacademy.com
              </p>
              <p className="flex items-center">
                <Phone size={16} className="mr-2 flex-shrink-0" /> +234 815-301-0297
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 pt-6 border-t border-black/10 dark:border-white/10 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} CuriousLab Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;