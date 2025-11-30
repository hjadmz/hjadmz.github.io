
class SoundService {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private masterGain: GainNode | null = null;

  constructor() {
    // AudioContext is initialized lazily
  }

  init() {
    if (!this.ctx) {
      const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
        this.masterGain = this.ctx.createGain();
        this.masterGain.connect(this.ctx.destination);
        // INCREASED MASTER VOLUME FOR CLARITY
        this.masterGain.gain.value = 0.5; 
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMute(mute: boolean) {
    this.isMuted = mute;
    if (!mute) this.init();
  }

  getMuted() {
    return this.isMuted;
  }

  private createOsc(type: OscillatorType, freq: number, duration: number, vol: number = 0.5, timeOffset: number = 0) {
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const t = this.ctx.currentTime + timeOffset;

    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + duration);
  }

  // Dynamic Scramble: Matches visual duration
  playScramble(durationMs: number = 300) {
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    const count = Math.floor(durationMs / 30); // One blip every 30ms
    const t = this.ctx.currentTime;
    
    // Data stream noise
    for (let i = 0; i < count; i++) {
        // High tech chirps - sharper frequency range
        const freq = 1200 + Math.random() * 2000; 
        const vol = 0.1 + Math.random() * 0.05; 
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine'; // Sine is cleaner
        osc.frequency.setValueAtTime(freq, t + (i * 0.03));
        
        gain.gain.setValueAtTime(vol, t + (i * 0.03));
        gain.gain.exponentialRampToValueAtTime(0.001, t + (i * 0.03) + 0.03);
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        osc.start(t + (i * 0.03));
        osc.stop(t + (i * 0.03) + 0.03);
    }

    // "Lock" sound at the end
    setTimeout(() => {
        this.createOsc('sine', 1500, 0.1, 0.2);
    }, durationMs);
  }

  playRadarPing() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    // Main ping
    this.createOsc('sine', 1800, 0.3, 0.1);
    // Echo
    this.createOsc('sine', 1200, 0.4, 0.05, 0.15);
  }

  playHover() {
    // Louder Hover
    this.createOsc('sine', 1000, 0.05, 0.1);
  }

  playClick() {
    // Louder Click
    this.createOsc('square', 200, 0.05, 0.15);
    this.createOsc('sine', 1200, 0.05, 0.1, 0.02); 
  }

  playType() {
    // Louder Type
    this.createOsc('triangle', 600 + Math.random() * 200, 0.03, 0.1);
  }

  playSuccess() {
    this.createOsc('sine', 554, 0.1, 0.2); // C#5
    this.createOsc('sine', 659, 0.2, 0.2, 0.1); // E5
  }

  playAlert() {
    this.createOsc('sawtooth', 110, 0.4, 0.2);
    this.createOsc('sawtooth', 110, 0.4, 0.2, 0.1);
  }

  playBoot() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    // Ambient hum rising
    osc.frequency.setValueAtTime(50, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(120, this.ctx.currentTime + 2.5);
    
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 1);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 3);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 3);
  }
}

export const soundManager = new SoundService();
