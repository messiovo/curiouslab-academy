// src/pages/VirtualScienceLab.jsx
import React from 'react';
import { FlaskConical } from 'lucide-react';
import SimulationCard from '../components/SimulationCard';
import { simulations } from '../data/simulations';

const VirtualScienceLab = () => (
  <main className="bg-bg text-text">
    {/* Header */}
    <section className="bg-primary/10 dark:bg-primary/20">
      <div className="container mx-auto px-6 py-16 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-gray-900">
          <FlaskConical size={32} aria-hidden="true" />
        </div>
        <h1 className="mb-3 text-4xl font-extrabold md:text-5xl">Virtual Science Lab</h1>
        <p className="mx-auto max-w-2xl text-lg text-text/80">
          Hands-on science you can do from anywhere. Pick a simulation, explore, and make discoveries.
        </p>
      </div>
    </section>

    {/* Simulation cards */}
    <section className="container mx-auto px-6 py-12">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {simulations.map((sim) => (
          <SimulationCard key={sim.slug} {...sim} />
        ))}

        {/* Placeholder so the grid never looks empty */}
        <div className="flex h-full min-h-48 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-black/20 dark:border-white/20 p-6 text-center text-text/60">
          <p className="text-lg font-semibold">More simulations coming soon</p>
          <p className="text-sm">New experiments are added all the time.</p>
        </div>
      </div>
    </section>
  </main>
);

export default VirtualScienceLab;
