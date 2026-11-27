// src/pages/VirtualScienceLab.jsx
// Landing page. Your existing Navbar and Footer come from the app layout, so they are not repeated here.
import React from 'react';
import SimulationCard from '../components/SimulationCard';
import { simulations } from '../data/simulations';
import { AtomArt, BooksArt, FlaskArt } from '../components/LabArt';
import '../styles/virtual-lab.css';

// Who welcomes the children? Change to 'maya' to swap the character (use id 'maya' for Maya).
const GUIDE = { id: 'isio-labcoat', name: 'Isio' };

const VirtualScienceLab = () => (
  <main className="vsl">
    <div className="vsl-bubble" style={{ width: 260, height: 260, left: -80, top: 120 }} aria-hidden="true" />
    <div className="vsl-bubble" style={{ width: 180, height: 180, right: -40, top: 360 }} aria-hidden="true" />

    <section className="vsl-hero-img" aria-labelledby="vsl-title">
      <img
        src="/images/virtual-lab/hero.webp"
        alt="RoboBuddy giving a thumbs up in a bright science lab with a flask, test tubes and a microscope"
      />
      <div className="vsl-hero-title">
        <h1 id="vsl-title">Virtual <span>Science Lab</span></h1>
        <span className="vsl-tagline">Explore, experiment and make discoveries.</span>
      </div>
    </section>

    <div className="vsl-wrap">
      <section className="vsl-welcome" aria-label="Welcome">
        <img className="vsl-guide" src={`/images/virtual-lab/${GUIDE.id}.webp`} alt={`${GUIDE.name}, your science guide`} />
        <p className="vsl-say">
          Hi, explorer! I’m {GUIDE.name}. Welcome to the Virtual Science Lab! Choose a simulation below and start exploring.
        </p>
      </section>

      <section className="vsl-cards" aria-label="Simulations">
        {simulations.map((sim) => (
          <SimulationCard key={sim.slug} {...sim} />
        ))}

        <div className="vsl-cardwrap"><div className="vsl-card vsl-soon">
          <FlaskArt size={96} />
          <h3>More experiments coming soon!</h3>
          <p>New simulations and hands-on experiments are on the way.</p>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }} aria-hidden="true">
            <AtomArt size={54} />
            <BooksArt size={96} />
          </div>
        </div></div>
      </section>
    </div>
  </main>
);

export default VirtualScienceLab;
