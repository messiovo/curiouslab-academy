// src/components/AbacusBead.jsx
import React, { useState, useCallback } from 'react';

const AbacusBead = ({ 
  position, 
  isActive, 
  isUpperBead, 
  onBeadChange, 
  rodIndex, 
  beadIndex 
}) => {
  const [isPressed, setIsPressed] = useState(false);

  // Unified handler for both mouse and touch events
  const handleInteractionStart = useCallback((e) => {
    e.preventDefault();
    setIsPressed(true);
    onBeadChange(rodIndex, beadIndex, !isActive);
    
    // Add haptic feedback on mobile devices
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  }, [rodIndex, beadIndex, isActive, onBeadChange]);

  const handleInteractionEnd = useCallback(() => {
    setIsPressed(false);
  }, []);

  // Touch event handlers
  const handleTouchStart = useCallback((e) => {
    handleInteractionStart(e);
  }, [handleInteractionStart]);

  const handleTouchEnd = useCallback((e) => {
    e.preventDefault();
    handleInteractionEnd();
  }, [handleInteractionEnd]);

  // Mouse event handlers
  const handleMouseDown = useCallback((e) => {
    handleInteractionStart(e);
  }, [handleInteractionStart]);

  const handleMouseUp = useCallback(() => {
    handleInteractionEnd();
  }, [handleInteractionEnd]);

  const handleMouseLeave = useCallback(() => {
    handleInteractionEnd();
  }, [handleInteractionEnd]);

  // Calculate responsive transforms
  const getTransform = () => {
    const mobileOffset = {
      upperActive: 'translateY(80px)', // Mobile: move down to touch center bar
      upperInactive: 'translateY(6px)', // Mobile: rest position
      lowerActive: 'translateY(-80px)', // Mobile: move up to touch center bar  
      lowerInactive: 'translateY(18px)' // Mobile: rest position
    };

    const desktopOffset = {
      upperActive: 'translateY(105px)', // Desktop: move down to touch center bar
      upperInactive: 'translateY(8px)', // Desktop: rest position
      lowerActive: 'translateY(-105px)', // Desktop: move up to touch center bar
      lowerInactive: 'translateY(24px)' // Desktop: rest position
    };

    if (isUpperBead) {
      return isActive 
        ? `${mobileOffset.upperActive} sm:${desktopOffset.upperActive.replace('translateY(', 'translateY(')}`
        : `${mobileOffset.upperInactive} sm:${desktopOffset.upperInactive.replace('translateY(', 'translateY(')}`;
    } else {
      return isActive 
        ? `${mobileOffset.lowerActive} sm:${desktopOffset.lowerActive.replace('translateY(', 'translateY(')}`
        : `${mobileOffset.lowerInactive} sm:${desktopOffset.lowerInactive.replace('translateY(', 'translateY(')}`;
    }
  };

  return (
    <div
      className={`
        w-6 h-4 sm:w-8 sm:h-6 rounded-full border-2 cursor-pointer transition-all duration-300 
        select-none touch-manipulation
        ${isPressed ? 'scale-95' : 'hover:scale-105 active:scale-95'}
        ${isUpperBead 
          ? isActive 
            ? 'bg-red-500 border-red-600 shadow-lg' 
            : 'bg-red-300 border-red-400 shadow-md'
          : isActive 
            ? 'bg-blue-500 border-blue-600 shadow-lg' 
            : 'bg-blue-300 border-blue-400 shadow-md'
        }
        hover:shadow-xl active:shadow-lg
      `}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="button"
      tabIndex={0}
      aria-label={`${isUpperBead ? '5-value' : '1-value'} bead ${isActive ? 'active' : 'inactive'}`}
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        WebkitTouchCallout: 'none',
        WebkitTapHighlightColor: 'transparent',
        // Use CSS custom properties for responsive transforms
        transform: isUpperBead 
          ? isActive 
            ? 'translateY(105px)' // Mobile active position
            : 'translateY(6px)'   // Mobile inactive position
          : isActive 
            ? 'translateY(-105px)' // Mobile active position
            : 'translateY(18px)'  // Mobile inactive position
      }}
    />
  );
};

export default AbacusBead;