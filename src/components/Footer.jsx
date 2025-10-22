// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone } from 'lucide-react';

// Import your logo files
import logoLight from '../assets/images/logo-light.svg';
import logoDark from '../assets/images/logo-dark.svg';

const quickLinks = [
  { title: 'About Us', href: '/about' },
  { title: 'Courses', href: '/courses' },
  { title: 'Contact', href: '/contact' },
  { title: 'Terms of Service', href: '/terms-of-service' },
  { title: 'Privacy Policy', href: '/privacy-policy' },
  { title: 'Ms. Abacus by CuriousLab', href: '/abacus-learning' },
];

// Custom SVG icons for X (Twitter) and TikTok
const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const TiktokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.528V6.79a4.831 4.831 0 0 1-3.77-1.104l.001.003z"/>
  </svg>
);

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61576976462758', icon: <Facebook size={20} /> },
  { label: 'X (Twitter)', href: 'https://x.com/curiousLabKids', icon: <XIcon /> },
  { label: 'Instagram', href: 'https://www.instagram.com/curiouslab_academy/', icon: <Instagram size={20} /> },
  { label: 'TikTok', href: 'https://www.tiktok.com/@curiouslabacademy', icon: <TiktokIcon /> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/107929771/admin/dashboard/', icon: <Linkedin size={20} /> },
  { label: 'YouTube', href: '#', icon: <Youtube size={20} /> },
];

const Footer = () => {
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

          {/* Column 3: Programs */}
          <div>
            <h3 className="font-bold text-lg mb-4">Our Products</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/abacus-learning" 
                  className="hover:text-primary dark:hover:text-secondary transition-colors text-sm block"
                >
                  Ms. Abacus by CuriousLab
                </Link>
              </li>
              {/* Add other programs here as direct links when needed */}
              { <li>
                <Link to="/readlab" className="hover:text-primary dark:hover:text-secondary transition-colors text-sm block">
                  ReadLab by CuriousLab
                </Link>
              </li> }
              { <li>
                <Link to="/science-quest" className="hover:text-primary dark:hover:text-secondary transition-colors text-sm block">
                  Science Quest 
                </Link>
              </li> }
               { <li>
                <Link to="/thinklab" className="hover:text-primary dark:hover:text-secondary transition-colors text-sm block">
                  ThinkLab (Critical Thinking & Logic)
                </Link>
              </li> }
            </ul>
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