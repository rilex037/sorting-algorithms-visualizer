import { ChartBar } from '../interface/ChartBar';

export const heapSort = async (chartBars: ChartBar[]) => {
  const heapify = async (n: number, i: number) => {
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;

    if (l < n && chartBars[l].value > chartBars[largest].value) {
      largest = l;
    }
    if (r < n && chartBars[r].value > chartBars[largest].value) {
      largest = r;
    }
    if (largest !== i) {
      const temp = chartBars[i];
      chartBars[i] = chartBars[largest];
      chartBars[largest] = temp;
      chartBars[i].isPointer = true;
      await new Promise((resolve) => setTimeout(resolve, 0.01));
      chartBars[i].isPointer = false;
      await heapify(n, largest);
    }
  };
  const heapSortHelper = async () => {
    const n = chartBars.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(n, i);
    }
    for (let i = n - 1; i >= 0; i--) {
      const temp = chartBars[0];
      chartBars[0] = chartBars[i];
      chartBars[i] = temp;
      chartBars[i].isPointer = true;
      await new Promise((resolve) => setTimeout(resolve, 0.01));
      chartBars[i].isPointer = false;
      await heapify(i, 0);
    }
  };

  await heapSortHelper();
};
