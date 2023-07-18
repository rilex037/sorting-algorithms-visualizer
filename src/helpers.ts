import { ChartBar } from './interface/ChartBar';

export const shuffleNumbers = (bars: number): ChartBar[] => {
  const numbers = Array.from({ length: bars }, (_, i) => i + 1);
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  const chartBars: ChartBar[] = numbers.map((num) => ({ value: num, isPointer: false, color: null }));
  return chartBars;
};
