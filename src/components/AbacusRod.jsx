// src/components/AbacusRod.jsx
import React from 'react';
import AbacusBead from './AbacusBead';

const AbacusRod = ({ 
  rodIndex, 
  upperBeadActive, 
  lowerBeadsActive, 
  onBeadChange,
  placeValue 
}) => {
  return (
    <div className="relative flex flex-col items-center mx-1 sm:mx-2">
      {/* Place value label */}
      <div className="text-xs sm:text-sm font-semibold text-text/70 mb-1 sm:mb-2 h-3 sm:h-4 text-center">
        {placeValue}
      </div>
      
      {/* Upper section (5-value beads) */}
      <div className="relative h-16 sm:h-20 flex flex-col justify-start items-center">
        <AbacusBead
          position="upper"
          isActive={upperBeadActive}
          isUpperBead={true}
          onBeadChange={onBeadChange}
          rodIndex={rodIndex}
          beadIndex={0}
        />
      </div>

      {/* Rod with center bar (answer bar) */}
      <div className="w-0.5 sm:w-1 bg-amber-600 h-32 sm:h-40 relative flex items-center justify-center">
        {/* Center divider bar - this is where beads touch when active */}
        <div className="absolute w-12 sm:w-16 h-1.5 sm:h-2 bg-black top-8 sm:top-12 rounded-full shadow-md z-10"></div>
      </div>

      {/* Lower section (1-value beads) */}
      <div className="relative h-20 sm:h-24 flex flex-col justify-start items-center">
        {[0, 1, 2, 3].map((beadIndex) => (
          <div key={beadIndex} className="mb-0.5 sm:mb-1">
            <AbacusBead
              position="lower"
              isActive={lowerBeadsActive > beadIndex}
              isUpperBead={false}
              onBeadChange={onBeadChange}
              rodIndex={rodIndex}
              beadIndex={beadIndex + 1}
            />
          </div>
        ))}
      </div>

      {/* Current value display */}
      <div className="text-sm sm:text-base font-bold text-primary mt-1 sm:mt-2 h-5 sm:h-6 text-center">
        {upperBeadActive * 5 + lowerBeadsActive}
      </div>
    </div>
  );
};

export default AbacusRod;
