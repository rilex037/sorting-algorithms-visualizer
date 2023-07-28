import { ChartBar } from '../interface/ChartBar';
import { setPointer } from '../pointer';

export default async (chartBars: ChartBar[]): Promise<void> => {
  let left = 0;
  let right = chartBars.length - 1;
  let swapped = false;
  while (left <= right) {
    for (let i = left; i < right; i++) {
      await setPointer([chartBars[i]]);

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
      await setPointer([chartBars[i]]);
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
