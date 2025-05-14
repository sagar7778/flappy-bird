export const useSound = () => {
  // Simple audio API wrapper
  const createSound = (frequency: number, type: OscillatorType, duration: number) => {
    return () => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start();
        setTimeout(() => oscillator.stop(), duration * 1000);
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    };
  };
  
  const playJumpSound = createSound(880, 'sine', 0.1);
  const playScoreSound = createSound(440, 'sine', 0.2);
  const playHitSound = createSound(220, 'square', 0.3);
  
  return {
    playJumpSound,
    playScoreSound,
    playHitSound
  };
};