import { ChartBar } from '../interface/ChartBar';
import { setPointer } from '../pointer';

export default async (chartBars: ChartBar[]): Promise<void> => {
  const n = chartBars.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (chartBars[j].value > chartBars[j + 1].value) {
        await setPointer([chartBars[j] ]);
        const temp = chartBars[j];
        chartBars[j] = chartBars[j + 1];
        chartBars[j + 1] = temp;
        swapped = true;
      }
    }
    if (!swapped) {
      break;
    }
  }
};
