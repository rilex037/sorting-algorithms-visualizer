import { ChartBar } from '../interface/ChartBar';

export const bubbleSort = async (chartBars: ChartBar[]) => {
  for (let i = 0; i < chartBars.length - 1; i++) {
    for (let j = 0; j < chartBars.length - i - 1; j++) {
      if (chartBars[j].value > chartBars[j + 1].value) {
        const temp = chartBars[j];
        chartBars[j] = chartBars[j + 1];
        chartBars[j + 1] = temp;

        chartBars[j + 1].isPointer = true;
        await new Promise((resolve) => setTimeout(resolve, 0.01));
        chartBars[j + 1].isPointer = false;
      }
    }
  }
};
