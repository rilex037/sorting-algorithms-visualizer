import { ChartBar } from '../interface/ChartBar';
import { setPointer } from '../pointer';

export default async (chartBars: ChartBar[]): Promise<void> => {
  const swap = async (arr: ChartBar[], i: number, j: number) => {
    await setPointer([arr[i], arr[j]]);
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };

  const partition = async (arr: ChartBar[], low: number, high: number) => {
    await setPointer([arr[high]]);
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      await setPointer([arr[j]]);
      if (arr[j].value < pivot.value) {
        i++;
        swap(arr, i, j);
      }
    }
    swap(arr, i + 1, high);
    return i + 1;
  };

  const quickSort = async (arr: ChartBar[], low: number, high: number) => {
    if (low < high) {
      const pivotIndex = partition(arr, low, high);
      await quickSort(arr, low, (await pivotIndex) - 1);
      await quickSort(arr, (await pivotIndex) + 1, high);
    }
  };

  await quickSort(chartBars, 0, chartBars.length - 1);
};
