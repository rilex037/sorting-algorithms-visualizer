import { ChartBar } from '../interface/ChartBar';

export const selectionSort = async (chartBars: ChartBar[]) => {
  for (let i = 0; i < chartBars.length - 1; i++) {
    
chartBars[i].isPointer = true;
    await new Promise((resolve) => setTimeout(resolve, 0.01));
chartBars[i].isPointer = false;

    let min = i;
    for (let j = i + 1; j < chartBars.length; j++) {
      if (chartBars[j].value < chartBars[min].value) {
        min = j;
      }
      chartBars[j].isPointer = true;
      await new Promise((resolve) => setTimeout(resolve, 0.01));
      chartBars[j].isPointer = false;
    }
    if (min !== i) {
      const temp = chartBars[i];
      chartBars[i] = chartBars[min];
      chartBars[min] = temp;
    }
  }
};
