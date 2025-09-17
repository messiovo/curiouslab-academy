// src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone } from 'lucide-react';

// Import your logo files (same as in the Navbar)
import logoLight from '../assets/images/logo-light.svg';
import logoDark from '../assets/images/logo-dark.svg';

const quickLinks = [
  { title: 'About Us', href: '/about' },
  { title: 'Courses', href: '/courses' },
  { title: 'Contact', href: '/contact' },
  { title: 'Abacus Learning Platform', href: '/abacus-learning'  },
  
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
  return (
    <footer className="bg-card-bg text-text border-t border-black/10 dark:border-white/10">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          
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
          <div className="md:mx-auto">
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

          {/* Column 3: Connect With Us */}
          <div className="lg:mx-auto">
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
            <div className="space-y-2">
              <p className="flex items-center">
                <Mail size={16} className="mr-2" /> info@curiouslabacademy.com
              </p>
              <p className="flex items-center">
                <Phone size={16} className="mr-2" /> +234 815-301-0297
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