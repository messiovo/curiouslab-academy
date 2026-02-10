// src/utils/ttsService.js
class TTSService {
  constructor() {
    this.isInitialized = false;
    this.voices = [];
    this.isMuted = false;
    this.currentUtterance = null;
    
    this.initVoices();
  }

  initVoices() {
    if ('speechSynthesis' in window) {
      // Load available voices
      this.voices = speechSynthesis.getVoices();
      
      if (this.voices.length === 0) {
        speechSynthesis.addEventListener('voiceschanged', () => {
          this.voices = speechSynthesis.getVoices();
          this.isInitialized = true;
        });
      } else {
        this.isInitialized = true;
      }
    }
  }

  // Get the best available voice
  getBestVoice(characterType = 'teacher') {
    if (!this.isInitialized || this.voices.length === 0) {
      return null;
    }

    const voices = this.voices;
    
    // Priority list for different characters
    const voicePreferences = {
      teacher: [
        // Natural female voices (best for Ms. Abacus)
        'Samantha', // macOS - very natural
        'Google US English Female',
        'Microsoft Zira', // Windows - clear
        'Karen', // Australian accent
        'Tessa', // South African
        'Female',
        'Woman',
        // Fallback to any natural-sounding voice
        'Natural',
        'Enhanced'
      ],
      robot: [
        // Slightly robotic but friendly
        'Zira', // Windows robotic female
        'Google UK English Female',
        'Microsoft David', // Windows male
        'Alex' // macOS male
      ]
    };

    const prefs = voicePreferences[characterType] || voicePreferences.teacher;
    
    for (const preference of prefs) {
      const found = voices.find(voice => 
        voice.name.toLowerCase().includes(preference.toLowerCase())
      );
      if (found) return found;
    }
    
    // Return default system voice
    return voices[0];
  }

  // NEW: Get speech settings based on game speed
  getSpeedSettings(speed = 'medium') {
    // These settings MUST match your game's visual timing
    const settings = {
      slow: {
        rate: 0.85,      // Speak slightly slower
        pause: 500,      // Pause between numbers (ms)
        charDelay: 1500  // Total time per character (matches game speed)
      },
      medium: {
        rate: 1.0,       // Normal speech rate
        pause: 300,      // Moderate pause
        charDelay: 1000  // Matches game's medium speed
      },
      superfast: {
        rate: 1.15,      // Speak slightly faster
        pause: 200,      // Quick pause
        charDelay: 600   // Matches game's superfast speed
      }
    };
    
    return settings[speed] || settings.medium;
  }

  // Speak with proper timing for abacus game
  speakAbacusSequence(numbers, options = {}) {
    if (this.isMuted || !this.isInitialized) return;
    
    // Cancel any current speech
    this.stop();
    
    const {
      speed = 'medium',
      character = 'teacher',
      onStart = () => {},
      onEnd = () => {},
      onEachNumber = () => {} // NEW: Callback for each number spoken
    } = options;
    
    const speedSettings = this.getSpeedSettings(speed);
    const voice = this.getBestVoice(character);
    
    // Process numbers for natural speech
    const processedNumbers = numbers.map(num => {
      if (num === '+') return 'plus';
      if (num === '-') return 'minus';
      if (num === '0') return 'zero';
      return num;
    });
    
    // Speak with synchronized timing
    this.speakSynchronized(processedNumbers, voice, speedSettings, onStart, onEnd, onEachNumber);
  }

  // NEW: Synchronized speech that can coordinate with visuals
  speakSynchronized(textArray, voice, speedSettings, onStart, onEnd, onEachNumber) {
    let index = 0;
    const startTime = Date.now();
    
    const speakNext = () => {
      if (index >= textArray.length) {
        onEnd();
        return;
      }
      
      const utterance = new SpeechSynthesisUtterance(textArray[index]);
      
      // Configure voice
      if (voice) utterance.voice = voice;
      utterance.rate = speedSettings.rate;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      // Slightly adjust pitch for operators
      if (textArray[index] === 'minus') utterance.pitch = 0.9;
      if (textArray[index] === 'plus') utterance.pitch = 1.1;
      
      utterance.onstart = () => {
        if (index === 0) onStart();
        // Callback for each number (can trigger visual update)
        if (onEachNumber) onEachNumber(textArray[index], index);
      };
      
      utterance.onend = () => {
        index++;
        
        // Calculate when next number should start based on total timing
        const expectedEndTime = startTime + (index * speedSettings.charDelay);
        const actualTime = Date.now();
        const timeToWait = Math.max(0, expectedEndTime - actualTime);
        
        // Ensure we don't exceed the pause setting
        const pause = Math.min(speedSettings.pause, timeToWait);
        
        setTimeout(speakNext, pause);
      };
      
      utterance.onerror = (e) => {
        console.error('Speech error:', e);
        index++;
        setTimeout(speakNext, speedSettings.pause);
      };
      
      this.currentUtterance = utterance;
      speechSynthesis.speak(utterance);
    };
    
    speakNext();
  }

  // Simple version for single number (for PracticeGame's current setup)
  speakNumber(number, options = {}) {
    if (this.isMuted || !this.isInitialized) return;
    
    this.stop();
    
    const {
      speed = 'medium',
      character = 'teacher',
      onStart = () => {},
      onEnd = () => {}
    } = options;
    
    const speedSettings = this.getSpeedSettings(speed);
    const voice = this.getBestVoice(character);
    
    // Process the number
    let spokenText = number.toString();
    if (number === '+') spokenText = 'plus';
    if (number === '-') spokenText = 'minus';
    if (number === '0') spokenText = 'zero';
    
    const utterance = new SpeechSynthesisUtterance(spokenText);
    
    if (voice) utterance.voice = voice;
    utterance.rate = speedSettings.rate;
    utterance.pitch = number === '-' ? 0.9 : number === '+' ? 1.1 : 1.0;
    utterance.volume = 1.0;
    
    utterance.onstart = onStart;
    utterance.onend = onEnd;
    
    this.currentUtterance = utterance;
    speechSynthesis.speak(utterance);
  }

  // Speak single text (for feedback messages)
  speakText(text, options = {}) {
    if (this.isMuted || !this.isInitialized) return;
    
    this.stop();
    
    const {
      speed = 'medium',
      character = 'teacher',
      pitch = 1.0,
      onEnd = () => {}
    } = options;
    
    const speedSettings = this.getSpeedSettings(speed);
    const voice = this.getBestVoice(character);
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (voice) utterance.voice = voice;
    utterance.rate = speedSettings.rate;
    utterance.pitch = pitch;
    utterance.volume = 1.0;
    utterance.onend = onEnd;
    
    this.currentUtterance = utterance;
    speechSynthesis.speak(utterance);
  }

  stop() {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    this.currentUtterance = null;
  }

  mute() {
    this.isMuted = true;
    this.stop();
  }

  unmute() {
    this.isMuted = false;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) this.stop();
    return this.isMuted;
  }

  // NEW: Test if speech rate is working
  testSpeechRate(speed) {
    const testPhrase = "One plus two minus three";
    const settings = this.getSpeedSettings(speed);
    
    console.log(`Testing ${speed} speed:`, {
      rate: settings.rate,
      pause: settings.pause,
      charDelay: settings.charDelay
    });
    
    this.speakText(testPhrase, { speed: speed, character: 'teacher' });
  }
}

// Create singleton instance
export const ttsService = new TTSService();