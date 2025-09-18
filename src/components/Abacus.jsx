
// src/components/Abacus.jsx
import React, { useState, useEffect } from 'react';
import AbacusRod from './AbacusRod';

const Abacus = ({ onValueChange }) => {
  // Initialize abacus state: [upperBead (0 or 1), lowerBeads (0-4)] for each rod
  const [rods, setRods] = useState([
    { upper: 0, lower: 0 }, // Hundred Thousands
    { upper: 0, lower: 0 }, // Ten Thousands
    { upper: 0, lower: 0 }, // Thousands
    { upper: 0, lower: 0 }, // Hundreds  
    { upper: 0, lower: 0 }, // Tens
    { upper: 0, lower: 0 }, // Ones
  ]);

  const placeValues = ['100K', '10K', '1K', '100s', '10s', '1s'];
  const placeValuesDesktop = ['100,000s', '10,000s', '1,000s', '100s', '10s', '1s'];

  const calculateTotal = () => {
    const multipliers = [100000, 10000, 1000, 100, 10, 1];
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
      { upper: 0, lower: 0 },
      { upper: 0, lower: 0 },
    ]);

    // Add haptic feedback on mobile
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
  };

  const setNumber = (number) => {
    if (number > 999999) number = 999999;
    if (number < 0) number = 0;
    
    const digits = number.toString().padStart(6, '0').split('').map(Number);
    const newRods = digits.map(digit => ({
      upper: digit >= 5 ? 1 : 0,
      lower: digit % 5
    }));
    
    setRods(newRods);

    // Add haptic feedback on mobile
    if ('vibrate' in navigator) {
      navigator.vibrate(15);
    }
  };

  const formatNumber = (number) => {
    return number.toLocaleString();
  };

  useEffect(() => {
    const total = calculateTotal();
    if (onValueChange) {
      onValueChange(total);
    }
  }, [rods, onValueChange]);

  return (
    <div className="bg-card-bg rounded-xl p-3 sm:p-6 lg:p-8 shadow-2xl w-full max-w-4xl mx-auto">
      {/* Abacus frame */}
      <div className="bg-amber-100 dark:bg-amber-900 p-2 sm:p-4 lg:p-6 rounded-lg border-2 sm:border-4 border-amber-800">
        {/* Mobile: Scrollable container for rods */}
        <div className="overflow-x-auto pb-2">
          <div className="flex justify-center items-center space-x-1 sm:space-x-2 lg:space-x-4 min-w-max">
            {rods.map((rod, index) => (
              <AbacusRod
                key={index}
                rodIndex={index}
                upperBeadActive={rod.upper}
                lowerBeadsActive={rod.lower}
                onBeadChange={handleBeadChange}
                placeValue={
                  <span>
                    <span className="sm:hidden">{placeValues[index]}</span>
                    <span className="hidden sm:inline">{placeValuesDesktop[index]}</span>
                  </span>
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-center items-center mt-3 sm:mt-6 space-y-3 sm:space-y-0 sm:space-x-4">
        {/* Mobile: Stack buttons and total vertically */}
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <button
            onClick={clearAbacus}
            className="w-full sm:w-auto bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-4 py-3 sm:py-2 rounded-lg font-semibold transition-colors touch-manipulation text-sm sm:text-base"
            aria-label="Clear abacus"
          >
            Clear
          </button>
          
          {/* Total display - larger on mobile */}
          <div className="text-xl sm:text-2xl font-bold text-primary text-center px-2 order-first sm:order-none">
            <div className="text-xs sm:text-sm text-text/70 font-normal">Total:</div>
            {formatNumber(calculateTotal())}
          </div>
          
          <button
            onClick={() => setNumber(Math.floor(Math.random() * 100000))}
            className="w-full sm:w-auto bg-green-500 hover:bg-green-600 active:bg-green-700 text-white px-4 py-3 sm:py-2 rounded-lg font-semibold transition-colors touch-manipulation text-sm sm:text-base"
            aria-label="Set random number"
          >
            Random
          </button>
        </div>
      </div>

      {/* Mobile: Instructions */}
      <div className="mt-3 sm:mt-4 text-center">
        <p className="text-xs sm:text-sm text-text/60">
          <span className="sm:hidden">Tap beads to count • Swipe to see all rods</span>
          <span className="hidden sm:inline">Click beads to move them • Red beads = 5 • Blue beads = 1</span>
        </p>
      </div>
    </div>
  );
};

export default Abacus;