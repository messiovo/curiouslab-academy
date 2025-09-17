
// src/components/Abacus.jsx
import React, { useState, useEffect } from 'react';
import AbacusRod from './AbacusRod';

const Abacus = ({ onValueChange }) => {
  // Initialize abacus state: [upperBead (0 or 1), lowerBeads (0-4)] for each rod
  const [rods, setRods] = useState([
    { upper: 0, lower: 0 }, // Thousands
    { upper: 0, lower: 0 }, // Hundreds  
    { upper: 0, lower: 0 }, // Tens
    { upper: 0, lower: 0 }, // Ones
  ]);

  const placeValues = ['1000s', '100s', '10s', '1s'];

  const calculateTotal = () => {
    const multipliers = [1000, 100, 10, 1];
    return rods.reduce((total, rod, index) => {
      return total + (rod.upper * 5 + rod.lower) * multipliers[index];
    }, 0);
  };

  const handleBeadChange = (rodIndex, beadIndex, newState) => {
    setRods(prevRods => {
      const newRods = [...prevRods];
      
      if (beadIndex === 0) {
        // Upper bead clicked
        newRods[rodIndex] = {
          ...newRods[rodIndex],
          upper: newState ? 1 : 0
        };
      } else {
        // Lower bead clicked
        const currentLower = newRods[rodIndex].lower;
        if (newState && currentLower < beadIndex) {
          // Activate this bead and all below it
          newRods[rodIndex] = {
            ...newRods[rodIndex],
            lower: beadIndex
          };
        } else if (!newState && currentLower >= beadIndex) {
          // Deactivate this bead and all above it
          newRods[rodIndex] = {
            ...newRods[rodIndex],
            lower: beadIndex - 1
          };
        }
      }
      
      return newRods;
    });
  };

  const clearAbacus = () => {
    setRods([
      { upper: 0, lower: 0 },
      { upper: 0, lower: 0 },
      { upper: 0, lower: 0 },
      { upper: 0, lower: 0 },
    ]);
  };

  const setNumber = (number) => {
    if (number > 9999) number = 9999;
    if (number < 0) number = 0;
    
    const digits = number.toString().padStart(4, '0').split('').map(Number);
    const newRods = digits.map(digit => ({
      upper: digit >= 5 ? 1 : 0,
      lower: digit % 5
    }));
    
    setRods(newRods);
  };

  useEffect(() => {
    const total = calculateTotal();
    if (onValueChange) {
      onValueChange(total);
    }
  }, [rods]);

  return (
    <div className="bg-card-bg rounded-xl p-8 shadow-2xl">
      {/* Abacus frame */}
      <div className="bg-amber-100 dark:bg-amber-900 p-6 rounded-lg border-4 border-amber-800">
        <div className="flex justify-center items-center space-x-4">
          {rods.map((rod, index) => (
            <AbacusRod
              key={index}
              rodIndex={index}
              upperBeadActive={rod.upper}
              lowerBeadsActive={rod.lower}
              onBeadChange={handleBeadChange}
              placeValue={placeValues[index]}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={clearAbacus}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          Clear
        </button>
        <div className="text-2xl font-bold text-primary">
          Total: {calculateTotal()}
        </div>
        <button
          onClick={() => setNumber(Math.floor(Math.random() * 1000))}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          Random
        </button>
      </div>
    </div>
  );
};

export default Abacus;