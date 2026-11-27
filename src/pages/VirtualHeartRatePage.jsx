// src/pages/VirtualHeartRatePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SimulationFrame from '../components/SimulationFrame';
import { HeartArt } from '../components/LabArt';
import '../styles/virtual-lab.css';

const VirtualHeartRatePage = () => (
  <main className="vsl vsl-page">
    <div className="vsl-wrap">
      <Link to="/virtual-science-lab" className="vsl-back">
        <ArrowLeft size={16} aria-hidden="true" />
        Back to Virtual Science Lab
      </Link>

      <div className="vsl-pagehead">
        <span className="vsl-badge"><HeartArt size={38} /></span>
        <h1>Heart Rate Investigation</h1>
      </div>
      <p className="vsl-sub">Predict, count the pulse, test three activities and find out how exercise changes a heartbeat.</p>

      <SimulationFrame src="/simulations/virtual-heart-rate.html" title="Heart Rate Investigation" className="vsl-frame" />
    </div>
  </main>
);

export default VirtualHeartRatePage;
