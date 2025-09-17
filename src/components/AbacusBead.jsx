// src/components/AbacusBead.jsx
import React from 'react';

const AbacusBead = ({ 
  position, 
  isActive, 
  isUpperBead, 
  onDrag, 
  rodIndex, 
  beadIndex 
}) => {
  const handleMouseDown = (e) => {
    e.preventDefault();
    onDrag(rodIndex, beadIndex, !isActive);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    onDrag(rodIndex, beadIndex, !isActive);
  };

  return (
    <div
      className={`
        w-8 h-6 rounded-full border-2 cursor-pointer transition-all duration-300 transform hover:scale-105
        ${isUpperBead 
          ? isActive 
            ? 'bg-red-500 border-red-600 shadow-lg' 
            : 'bg-red-300 border-red-400 shadow-md'
          : isActive 
            ? 'bg-blue-500 border-blue-600 shadow-lg' 
            : 'bg-blue-300 border-blue-400 shadow-md'
        }
        hover:shadow-xl
      `}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        // Position beads to touch the center bar when active
        transform: isUpperBead 
          ? isActive 
            ? 'translateY(105px)' // Move down to touch center bar
            : 'translateY(8px)'   // Rest position away from center
          : isActive 
            ? 'translateY(-105px)'  // Move up to touch center bar
            : 'translateY(24px)'  // Rest position away from center
      }}
    />
  );
};

export default AbacusBead;