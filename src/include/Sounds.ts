import { ChartBar } from '../interface/ChartBar';

// Create the oscillator singleton instance
class OscillatorSingleton {
  private static instance: OscillatorSingleton;
  private audioCtx: AudioContext;
  private osc: OscillatorNode;
  private gainNode: GainNode; // Added GainNode

  private constructor() {
    this.audioCtx = new AudioContext();
    this.osc = this.audioCtx.createOscillator();
    this.osc.type = 'square';
    this.osc.frequency.value = 440;
    this.gainNode = this.audioCtx.createGain();
    this.gainNode.gain.value = 0.1;
    this.osc.connect(this.gainNode);
    this.gainNode.connect(this.audioCtx.destination);
    this.osc.start();
  }

  public static getInstance(): OscillatorSingleton {
    if (!OscillatorSingleton.instance) {
      OscillatorSingleton.instance = new OscillatorSingleton();
    }
    return OscillatorSingleton.instance;
  }

  public getOscillator(): OscillatorNode {
    return this.osc;
  }
}

export const playSound = (chartBar: ChartBar) => {
  const osc = OscillatorSingleton.getInstance().getOscillator();
  osc.frequency.value = chartBar.value + 40 * 3.5;
};

export const stopSound = () => {
  const osc = OscillatorSingleton.getInstance().getOscillator();
  osc.frequency.value = 0;
};
