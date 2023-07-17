import { ChartBar } from '../interface/ChartBar';

export default async (chartBars: ChartBar[]) => {
  const partition = async (low: number, high: number) => {
    const pivot = chartBars[high].value;

    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (chartBars[j].value < pivot) {
        i++;
        const temp = chartBars[i];
        chartBars[i] = chartBars[j];
        chartBars[j] = temp;
      }
      chartBars[j].isPointer = true;
      await new Promise((resolve) => setTimeout(resolve, 5));
      chartBars[j].isPointer = false;
    }
    chartBars[high].isPointer = false;
    const temp = chartBars[i + 1];
    chartBars[i + 1] = chartBars[high];
    chartBars[high] = temp;
    return i + 1;
  };
  const quickSortHelper = async (low: number, high: number) => {
    if (low < high) {
      const pi = await partition(low, high);
      await quickSortHelper(low, pi - 1);
      await quickSortHelper(pi + 1, high);
    }
  };
  await quickSortHelper(0, chartBars.length - 1);
};
