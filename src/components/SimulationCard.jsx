// src/components/SimulationCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const SimulationCard = ({ title, description, href, icon: Icon, tags = [] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    whileHover={{ y: -4 }}
    className="h-full"
  >
    <Link
      to={href}
      className="group flex h-full flex-col rounded-2xl border border-black/10 dark:border-white/10 bg-card-bg p-6 shadow-sm transition-shadow hover:shadow-lg focus-visible:outline-2 focus-visible:outline-primary"
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/15 text-primary">
        {Icon && <Icon size={30} aria-hidden="true" />}
      </div>

      <h3 className="mb-2 text-xl font-bold text-text">{title}</h3>
      <p className="mb-4 flex-1 text-text/80">{description}</p>

      {tags.length > 0 && (
        <ul className="mb-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-gray-900">
              {tag}
            </li>
          ))}
        </ul>
      )}

      <span className="inline-flex items-center gap-2 font-semibold text-primary">
        Start exploring
        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  </motion.div>
);

export default SimulationCard;
