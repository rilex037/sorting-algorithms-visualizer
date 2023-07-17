import { ChartBar } from '../interface/ChartBar';

export const radixSort = async (chartBars: ChartBar[]) => {
  const getMax = () => {
    let max = 0;
    for (let i = 0; i < chartBars.length; i++) {
      if (chartBars[i].value > max) {
        max = chartBars[i].value;
      }
    }
    return max;
  };
  const countingSort = async (exp: number) => {
    const output = Array.from({ length: chartBars.length }, () => ({ value: 0, isPointer: false, color: 'gray' }));
    const count = Array.from({ length: 10 }, () => 0);
    for (let i = 0; i < chartBars.length; i++) {
      count[Math.floor(chartBars[i].value / exp) % 10]++;
    }
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }
    for (let i = chartBars.length - 1; i >= 0; i--) {
      output[count[Math.floor(chartBars[i].value / exp) % 10] - 1] = chartBars[i];
      count[Math.floor(chartBars[i].value / exp) % 10]--;
    }
    for (let i = 0; i < chartBars.length; i++) {
      chartBars[i] = output[i];
      chartBars[i].isPointer = true;
      await new Promise((resolve) => setTimeout(resolve, 0.01));
      chartBars[i].isPointer = false;
    }
  };
  const max = getMax();
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    await countingSort(exp);
  }
};
