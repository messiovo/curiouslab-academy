// src/App.jsx

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function App() {
  return (
    <div>
      <Navbar />
      <main>
        {/* The <Routes> component manages which page is displayed */}
        
      </main>
       <Footer /> 
    </div>
  );
}

export default App;