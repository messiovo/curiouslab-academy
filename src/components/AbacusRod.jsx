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
    <div className="relative flex flex-col items-center mx-2">
      {/* Place value label */}
      <div className="text-xs font-semibold text-text/70 mb-2 h-4">
        {placeValue}
      </div>
      
      {/* Upper section (5-value beads) */}
      <div className="relative h-20 flex flex-col justify-start items-center">
        <AbacusBead
          position="upper"
          isActive={upperBeadActive}
          isUpperBead={true}
          onDrag={onBeadChange}
          rodIndex={rodIndex}
          beadIndex={0}
        />
      </div>

      {/* Rod with center bar (answer bar) */}
      <div className="w-1 bg-amber-600 h-40 relative flex items-center justify-center">
        {/* Center divider bar - this is where beads touch when active */}
        <div className="absolute w-16 h-2 bg-black top-12 rounded-full shadow-md z-10"></div>
      </div>

      {/* Lower section (1-value beads) */}
      <div className="relative h-24 flex flex-col justify-start items-center">
        {[0, 1, 2, 3].map((beadIndex) => (
          <div key={beadIndex} className="mb-1">
            <AbacusBead
              position="lower"
              isActive={lowerBeadsActive > beadIndex}
              isUpperBead={false}
              onDrag={onBeadChange}
              rodIndex={rodIndex}
              beadIndex={beadIndex + 1}
            />
          </div>
        ))}
      </div>

      {/* Current value display */}
      <div className="text-sm font-bold text-primary mt-2 h-6">
        {upperBeadActive * 5 + lowerBeadsActive}
      </div>
    </div>
  );
};

export default AbacusRod;
