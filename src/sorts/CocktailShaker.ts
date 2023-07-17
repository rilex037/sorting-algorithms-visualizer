import { ChartBar } from '../interface/ChartBar';

export default async (chartBars: ChartBar[]) => {
  let left = 0;
  let right = chartBars.length - 1;
  let swapped = false;

  while (left <= right) {
    for (let i = left; i < right; i++) {
      chartBars[i].isPointer = true;

      await new Promise((resolve) => setTimeout(resolve, 5));
      chartBars[i].isPointer = false;

      if (chartBars[i].value > chartBars[i + 1].value) {
        const temp = chartBars[i];
        chartBars[i] = chartBars[i + 1];
        chartBars[i + 1] = temp;
        swapped = true;
      }
    }

    if (!swapped) {
      break;
    }
    swapped = false;
    right--;

    for (let i = right; i > left; i--) {
      chartBars[i].isPointer = true;

      await new Promise((resolve) => setTimeout(resolve, 5));
      chartBars[i].isPointer = false;

      if (chartBars[i].value < chartBars[i - 1].value) {
        const temp = chartBars[i];
        chartBars[i] = chartBars[i - 1];
        chartBars[i - 1] = temp;
        swapped = true;
      }
    }
    left++;
  }
};
