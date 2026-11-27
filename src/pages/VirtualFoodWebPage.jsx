// src/pages/VirtualFoodWebPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SimulationFrame from '../components/SimulationFrame';
import { FoodWebArt } from '../components/LabArt';
import '../styles/virtual-lab.css';

const VirtualFoodWebPage = () => (
  <main className="vsl vsl-page">
    <div className="vsl-wrap">
      <Link to="/virtual-science-lab" className="vsl-back">
        <ArrowLeft size={16} aria-hidden="true" />
        Back to Virtual Science Lab
      </Link>

      <div className="vsl-pagehead">
        <span className="vsl-badge"><FoodWebArt size={38} /></span>
        <h1>Food Web Lab</h1>
      </div>
      <p className="vsl-sub">Build two food webs, check who eats whom, then remove one organism and see what happens.</p>

      <SimulationFrame src="/simulations/virtual-food-web.html" title="Food Web Lab" className="vsl-frame" />
    </div>
  </main>
);

export default VirtualFoodWebPage;
