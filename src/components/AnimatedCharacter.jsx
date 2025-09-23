// src/components/AnimatedCharacter.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import Lottie from 'lottie-react';

// Import Lottie animations
import happyAnimation from '../animations/happy-robot.json';
import excitedAnimation from '../animations/excited-robot.json';
import winnerAnimation from '../animations/winner-robot.json';
import sadAnimation from '../animations/sad-robot.json';

const AnimatedCharacter = ({ mood, message, position = 0, onSpeakComplete }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const speechSynth = useRef(null);
  const audioContext = useRef(null);

  useEffect(() => {
    speechSynth.current = window.speechSynthesis;
    
    // Initialize Web Audio Context for robot sounds
    try {
      audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.log("Web Audio not supported");
    }
    
    // Cleanup on unmount
    return () => {
      if (speechSynth.current) {
        speechSynth.current.cancel();
      }
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, []);

  // Generate robot sound effects
  const playRobotSound = (type) => {
    if (isMuted || !audioContext.current) return;

    // Resume audio context if it's suspended (browser policy)
    if (audioContext.current.state === 'suspended') {
      audioContext.current.resume();
    }

    const ctx = audioContext.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    switch (type) {
      case 'beep':
        oscillator.frequency.setValueAtTime(800, ctx.currentTime);
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.1);
        break;
        
      case 'boop':
        oscillator.frequency.setValueAtTime(400, ctx.currentTime);
        oscillator.frequency.linearRampToValueAtTime(200, ctx.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.2);
        break;
        
      case 'bzzt':
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(300, ctx.currentTime);
        oscillator.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.15);
        gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.15);
        break;
        
      case 'whirr':
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(150, ctx.currentTime);
        oscillator.frequency.linearRampToValueAtTime(300, ctx.currentTime + 0.3);
        oscillator.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.6);
        gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.6);
        break;
        
      default:
        oscillator.frequency.setValueAtTime(600, ctx.currentTime);
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.1);
    }
  };

  // Extract and play robot sounds from message, then speak clean text
  const processMessage = (text) => {
    if (!text) return;

    // Find robot sounds in the message
    const soundPatterns = {
      'beep': /\bbeep\b/gi,
      'boop': /\bboop\b/gi,
      'bzzt': /\bbzzt\b/gi,
      'whirr': /\bwhirr\b/gi
    };

    let cleanText = text;
    const soundsToPlay = [];

    // Extract sounds and clean the text
    Object.entries(soundPatterns).forEach(([sound, pattern]) => {
      const matches = text.match(pattern);
      if (matches) {
        matches.forEach(() => soundsToPlay.push(sound));
        cleanText = cleanText.replace(pattern, ''); // Remove from speech text
      }
    });

    // Play robot sounds with slight delays
    soundsToPlay.forEach((sound, index) => {
      setTimeout(() => playRobotSound(sound), index * 200);
    });

    // Speak the cleaned text (without robot sound words)
    if (cleanText.trim()) {
      speakMessage(cleanText.trim());
    }
  };

  const speakMessage = (text) => {
    if (isMuted || !text) return;
    
    if (speechSynth.current.speaking) {
      speechSynth.current.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Make it sound robotic
    utterance.rate = 0.8;   // slower
    utterance.pitch = 0.6;  // deeper, flat tone
    utterance.volume = 1;   // full volume

    // Try to find a robotic voice
    const voices = speechSynth.current.getVoices();
    const robotVoice = voices.find(voice => 
      voice.name.toLowerCase().includes("english") ||
      voice.name.toLowerCase().includes("microsoft") ||
      voice.name.toLowerCase().includes("espeak")
    );

    if (robotVoice) {
      utterance.voice = robotVoice;
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

  // Process message when it changes
  useEffect(() => {
    if (message) {
      processMessage(message);
    }
    
    return () => {
      if (speechSynth.current) {
        speechSynth.current.cancel();
      }
    };
  }, [message]);

  const getAnimationData = () => {
    switch (mood) {
      case 'excited': return excitedAnimation;
      case 'winner': return winnerAnimation;
      case 'sad': return sadAnimation;
      default: return happyAnimation;
    }
  };

  return (
    <div 
      className="flex flex-col items-center transition-all duration-500 transform"
      style={{ transform: `translateX(${position * 10}px)` }}
    >
      {/* Animated Character Avatar */}
      <div className="relative">
        <div className="w-48 h-48">
          <Lottie 
            animationData={getAnimationData()}
            loop={true}
            autoplay={true}
            className="w-full h-full"
          />
        </div>
        
        {/* Speaking Animation */}
        {isSpeaking && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {[1, 2, 3].map(i => (
              <div 
                key={i}
                className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        )}
        
        {/* Mood Indicators */}
        {mood === 'excited' && (
          <div className="absolute -top-2 -right-2 animate-bounce">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-sm">!</span>
            </div>
          </div>
        )}
        
        {mood === 'winner' && (
          <div className="absolute -top-2 -right-2 animate-bounce">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-sm">👑</span>
            </div>
          </div>
        )}
        
        {/* Mute/Unmute Button */}
        <button
          onClick={() => {
            setIsMuted(!isMuted);
            if (!isMuted) stopSpeaking();
          }}
          className="absolute -top-2 -left-2 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md border-2 border-gray-200"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>

      {/* Character Name */}
      <div className="mt-3 px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-full shadow-sm">
        <span className="text-sm font-bold text-blue-800 dark:text-blue-200">RoboBuddy</span>
      </div>

      {/* Speech Bubble with Enhanced Styling */}
      {message && (
        <div className="mt-4 relative">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-xl border-2 border-blue-200 dark:border-blue-700 max-w-xs relative overflow-hidden">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 opacity-50"></div>
            
            <p className="text-sm text-gray-800 dark:text-gray-200 text-center font-medium relative z-10">
              {message}
            </p>
            
            {/* Enhanced typing indicator */}
            {isSpeaking && (
              <div className="flex justify-center space-x-1 mt-3 relative z-10">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            )}
          </div>
          
          {/* Speech bubble pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
            <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-blue-200 dark:border-b-blue-700"></div>
          </div>
        </div>
      )}

      {/* Floating particles effect for winner mood */}
      {mood === 'winner' && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AnimatedCharacter;