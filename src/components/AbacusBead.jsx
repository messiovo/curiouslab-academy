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
        w-8 h-6 rounded-full border-2 cursor-pointer transition-all duration-200 transform hover:scale-105
        ${isUpperBead 
          ? isActive 
            ? 'bg-red-500 border-red-600 translate-y-8' 
            : 'bg-red-400 border-red-500 translate-y-0'
          : isActive 
            ? 'bg-blue-500 border-blue-600 translate-y-0' 
            : 'bg-blue-400 border-blue-500 translate-y-6'
        }
        shadow-lg hover:shadow-xl
      `}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none'
      }}
    />
  );
};

export default AbacusBead;
