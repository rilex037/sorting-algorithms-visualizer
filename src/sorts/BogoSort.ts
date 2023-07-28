import { ChartBar } from '../interface/ChartBar';
import { setPointer } from '../pointer';

export default async (chartBars: ChartBar[]): Promise<void> => {
  const isSorted = (arr: ChartBar[]) => {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i].value > arr[i + 1].value) {
        return false;
      }
    }
    return true;
  };

  const shuffle = (arr: ChartBar[]) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  while (!isSorted(chartBars)) {
    shuffle(chartBars);
    await setPointer([chartBars[chartBars.length - 1]], 300);
  }
};
