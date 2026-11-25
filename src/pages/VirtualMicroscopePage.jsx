// src/pages/VirtualMicroscopePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SimulationFrame from '../components/SimulationFrame';

const VirtualMicroscopePage = () => (
  <main className="bg-bg text-text">
    <div className="container mx-auto px-6 py-8">
      <Link
        to="/virtual-science-lab"
        className="mb-4 inline-flex items-center gap-2 font-semibold text-primary hover:underline"
      >
        <ArrowLeft size={18} aria-hidden="true" />
        Back to Virtual Science Lab
      </Link>

      <h1 className="mb-2 text-3xl font-extrabold md:text-4xl">Virtual Microscope Simulation</h1>
      <p className="mb-6 max-w-2xl text-text/80">
        Pick a specimen, choose a lens, and turn the focus until the picture is sharp.
      </p>

      <SimulationFrame src="/simulations/virtual-microscope.html" title="Virtual Microscope Simulation" />
    </div>
  </main>
);

export default VirtualMicroscopePage;
