
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
      <div className="relative h-16 flex flex-col justify-start items-center">
        <AbacusBead
          position="upper"
          isActive={upperBeadActive}
          isUpperBead={true}
          onDrag={onBeadChange}
          rodIndex={rodIndex}
          beadIndex={0}
        />
      </div>

      {/* Rod */}
      <div className="w-1 bg-amber-800 h-32 relative">
        {/* Separator bar */}
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-amber-900 rounded"></div>
      </div>

      {/* Lower section (1-value beads) */}
      <div className="relative h-16 flex flex-col justify-start items-center space-y-1">
        {[0, 1, 2, 3].map((beadIndex) => (
          <AbacusBead
            key={beadIndex}
            position="lower"
            isActive={lowerBeadsActive > beadIndex}
            isUpperBead={false}
            onDrag={onBeadChange}
            rodIndex={rodIndex}
            beadIndex={beadIndex + 1}
          />
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
