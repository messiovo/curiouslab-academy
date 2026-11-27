// src/components/SimulationCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { MicroscopeArt, FlaskArt, HeartArt, FoodWebArt } from './LabArt';

const ART = { microscope: MicroscopeArt, heart: HeartArt, web: FoodWebArt, flask: FlaskArt };

const SimulationCard = ({ title, description, href, art = 'flask', featured = false, tags = [] }) => {
  const Art = ART[art] || FlaskArt;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="vsl-cardwrap"
    >
      <Link to={href} className={`vsl-card ${featured ? 'featured' : ''}`}>
        <div className="vsl-card-body">
          <div className="vsl-card-art"><Art size={130} /></div>
          <div>
            <h3>{title}</h3>
            <p>{description}</p>
            {tags.length > 0 && (
              <ul className="vsl-tags">
                {tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            )}
          </div>
        </div>
        <span className="vsl-cta">
          Start Exploring
          <ArrowRight size={20} aria-hidden="true" />
        </span>
      </Link>
    </motion.div>
  );
};

export default SimulationCard;
