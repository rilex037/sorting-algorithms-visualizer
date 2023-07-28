import { ChartBar } from '../interface/ChartBar';

let audioCtx: AudioContext | null = null;
let oscillator: OscillatorNode | null = null;

export const playSound = (chartBar: ChartBar) => {
  if (!audioCtx) {
    audioCtx = new AudioContext();
    oscillator = audioCtx.createOscillator();
    oscillator.type = 'triangle';
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.1;
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start();
  }
  oscillator?.frequency.setValueAtTime(chartBar.value + 50, audioCtx.currentTime);
};

export const stopSound = () => {
  if (oscillator) {
    oscillator.stop();
    oscillator.disconnect();
    oscillator = null;
    audioCtx = null;
  }
};
