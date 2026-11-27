// src/pages/VirtualMicroscopePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SimulationFrame from '../components/SimulationFrame';
import { SmallMicroscopeIcon } from '../components/LabArt';
import '../styles/virtual-lab.css';

const VirtualMicroscopePage = () => (
  <main className="vsl vsl-page">
    <div className="vsl-wrap">
      <Link to="/virtual-science-lab" className="vsl-back">
        <ArrowLeft size={16} aria-hidden="true" />
        Back to Virtual Science Lab
      </Link>

      <div className="vsl-pagehead">
        <span className="vsl-badge"><SmallMicroscopeIcon /></span>
        <h1>Virtual Microscope Simulation</h1>
      </div>
      <p className="vsl-sub">Pick a specimen, choose a lens, and turn the focus until the picture is sharp.</p>

      <SimulationFrame src="/simulations/virtual-microscope.html" title="Virtual Microscope Simulation" className="vsl-frame" />
    </div>
  </main>
);

export default VirtualMicroscopePage;
