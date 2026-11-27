// src/pages/SciencePlaygroundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SimulationFrame from '../components/SimulationFrame';

// The route of your Science Hub page (the page with the two big cards).
// If your hub lives at a different address, change this one line.
const HUB_PATH = '/science-hub';

const SciencePlaygroundPage = () => (
  <main className="bg-bg text-text">
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link
        to={HUB_PATH}
        className="mb-4 inline-flex items-center gap-2 font-semibold text-purple-600 dark:text-purple-400 hover:underline"
      >
        <ArrowLeft size={18} aria-hidden="true" />
        Back to the Science Hub
      </Link>

      <h1 className="mb-2 text-3xl font-extrabold md:text-4xl text-purple-600 dark:text-purple-400">
        Science Playground
      </h1>
      <p className="mb-6 max-w-2xl text-text/80">
        For Explorers (ages 5–7). Play with Maya, Isio and RoboBuddy and discover how your body senses the world.
      </p>

      <SimulationFrame
        src="/simulations/science-playground.html"
        title="Science Playground: Me and My Senses"
        initialHeight={1100}
      />
    </div>
  </main>
);

export default SciencePlaygroundPage;
