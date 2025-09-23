// src/components/GameCharacter.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Smile, Frown, Star, Trophy, Volume2, VolumeX } from 'lucide-react';

const GameCharacter = ({ mood, message, position = 0, onSpeakComplete }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const speechSynth = useRef(null);

  useEffect(() => {
    speechSynth.current = window.speechSynthesis;
    
    // Cleanup on unmount
    return () => {
      if (speechSynth.current) {
        speechSynth.current.cancel();
      }
    };
  }, []);

  const speakMessage = (text) => {
    if (isMuted || !text) return;
    
    if (speechSynth.current.speaking) {
      speechSynth.current.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure voice properties
    utterance.rate = 0.9; // Slightly slower for character feel
    utterance.pitch = 1.1; // Slightly higher pitch for friendly character
    utterance.volume = 0.8;

    // Try to find a friendly voice
    const voices = speechSynth.current.getVoices();
    const preferredVoices = voices.filter(voice => 
      voice.name.includes('Google') || 
      voice.name.includes('Samantha') || 
      voice.name.includes('Karen')
    );
    
    if (preferredVoices.length > 0) {
      utterance.voice = preferredVoices[0];
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (onSpeakComplete) onSpeakComplete();
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      if (onSpeakComplete) onSpeakComplete();
    };

    speechSynth.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (speechSynth.current) {
      speechSynth.current.cancel();
      setIsSpeaking(false);
    }
  };

  // Speak when message changes
  useEffect(() => {
    if (message) {
      speakMessage(message);
    }
    
    return () => {
      if (speechSynth.current) {
        speechSynth.current.cancel();
      }
    };
  }, [message]);

  const getMoodIcon = () => {
    switch (mood) {
      case 'happy': return <Smile size={32} className="text-yellow-500" />;
      case 'excited': return <Star size={32} className="text-yellow-400 animate-pulse" />;
      case 'winner': return <Trophy size={32} className="text-yellow-400 animate-bounce" />;
      case 'sad': return <Frown size={32} className="text-blue-400" />;
      default: return <Smile size={32} className="text-yellow-500" />;
    }
  };

  const getCharacterAnimation = () => {
    switch (mood) {
      case 'excited': return 'animate-bounce';
      case 'winner': return 'animate-bounce';
      case 'sad': return 'animate-pulse';
      default: return 'animate-pulse';
    }
  };

  return (
    <div 
      className="flex flex-col items-center transition-all duration-500 transform"
      style={{ transform: `translateX(${position * 10}px)` }}
    >
      {/* Character Avatar with Animation */}
      <div className="relative">
        <div className={`w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white ${getCharacterAnimation()}`}>
          {getMoodIcon()}
          
          {/* Speaking Animation */}
          {isSpeaking && (
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {[1, 2, 3].map(i => (
                <div 
                  key={i}
                  className="w-1 h-1 bg-blue-300 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Mood Indicators */}
        {mood === 'excited' && (
          <div className="absolute -top-2 -right-2 animate-bounce">
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-xs">!</span>
            </div>
          </div>
        )}
        
        {/* Mute/Unmute Button */}
        <button
          onClick={() => {
            setIsMuted(!isMuted);
            if (!isMuted) stopSpeaking();
          }}
          className="absolute -top-2 -left-2 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
        >
          {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
        </button>
      </div>

      {/* Character Name */}
      <div className="mt-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded-full">
        <span className="text-sm font-bold text-blue-800 dark:text-blue-200">Buddy</span>
      </div>

      {/* Speech Bubble with Typing Animation */}
      {message && (
        <div className="mt-3 relative">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg border-2 border-blue-200 dark:border-blue-700 max-w-xs">
            <p className="text-sm text-gray-800 dark:text-gray-200 text-center font-medium">
              {message}
            </p>
            {/* Typing indicator */}
            {isSpeaking && (
              <div className="flex justify-center space-x-1 mt-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            )}
          </div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
            <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-blue-200 dark:border-b-blue-700"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameCharacter;