import { ChartBar } from '../interface/ChartBar';
import { setPointer } from '../pointer';

export default async (chartBars: ChartBar[]): Promise<void> => {
  const merge = async (start: number, middle: number, end: number): Promise<void> => {
    const leftHalf = chartBars.slice(start, middle + 1);
    const rightHalf = chartBars.slice(middle + 1, end + 1);

    let leftIndex = 0;
    let rightIndex = 0;
    let resultIndex = start;

    const mergedArray: ChartBar[] = [];

    while (leftIndex < leftHalf.length && rightIndex < rightHalf.length) {
      if (leftHalf[leftIndex].value <= rightHalf[rightIndex].value) {
        mergedArray.push(leftHalf[leftIndex]);
        leftIndex++;
      } else {
        mergedArray.push(rightHalf[rightIndex]);
        rightIndex++;
      }
    }

    while (leftIndex < leftHalf.length) {
      mergedArray.push(leftHalf[leftIndex]);
      leftIndex++;
    }

    while (rightIndex < rightHalf.length) {
      mergedArray.push(rightHalf[rightIndex]);
      rightIndex++;
    }

    for (let i = 0; i < mergedArray.length; i++) {
      chartBars[resultIndex] = mergedArray[i];
      await setPointer([chartBars[resultIndex]]);
      resultIndex++;
    }
  };

  const mergeSortRecursive = async (start: number, end: number): Promise<void> => {
    if (start >= end) {
      return;
    }

    const middle = Math.floor((start + end) / 2);
    await mergeSortRecursive(start, middle);
    await mergeSortRecursive(middle + 1, end);
    await merge(start, middle, end);
  };

  await mergeSortRecursive(0, chartBars.length - 1);
};
