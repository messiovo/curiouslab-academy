// src/utils/robotSounds.js

class RobotSounds {
  constructor() {
    this.sounds = {
      beep: new Audio('/sounds/beep.mp3'),
      boop: new Audio('/sounds/boop.mp3'),
      buzz: new Audio('/sounds/buzz.mp3'),
      whirr: new Audio('/sounds/whirr.mp3'),
      win: new Audio('/sounds/win.mp3')
    };
    
    // Make sounds not too loud
    Object.values(this.sounds).forEach(sound => {
      sound.volume = 0.3;
    });
  }

  playSound(name) {
    if (this.sounds[name]) {
      this.sounds[name].currentTime = 0; // restart sound
      this.sounds[name].play().catch(() => {}); // be quiet if error
    }
  }

  // Special sounds for different moods
  happy() { this.playSound('beep'); }
  excited() { this.playSound('boop'); }
  winner() { this.playSound('win'); }
  sad() { this.playSound('buzz'); }
  moving() { this.playSound('whirr'); }
}

export const robotSounds = new RobotSounds();