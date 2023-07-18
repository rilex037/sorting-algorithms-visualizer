import { ChartBar } from '../interface/ChartBar';

export default async (chartBars: ChartBar[]) => {
  const getMaxValue = (arr: ChartBar[]) => {
    let max = arr[0].value;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i].value > max) {
        max = arr[i].value;
      }
    }
    return max;
  };

  const countSort = async (arr: ChartBar[], exp: number) => {
    const n = arr.length;
    const output: ChartBar[] = new Array(n);
    const count: number[] = new Array(10).fill(0);

    for (let i = 0; i < n; i++) {
      count[Math.floor(arr[i].value / exp) % 10]++;
      arr[i].isPointer = true;
      await new Promise((resolve) => setTimeout(resolve, 5));
      arr[i].isPointer = false;
    }

    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    for (let i = n - 1; i >= 0; i--) {
      output[count[Math.floor(arr[i].value / exp) % 10] - 1] = arr[i];
      count[Math.floor(arr[i].value / exp) % 10]--;
    }

    for (let i = 0; i < n; i++) {
      arr[i] = output[i];
      arr[i].isPointer = true;
      await new Promise((resolve) => setTimeout(resolve, 5));
      arr[i].isPointer = false;
    }
  };

  const radixSortHelper = async () => {
    const max = getMaxValue(chartBars);

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      await countSort(chartBars, exp);
    }
  };

  await radixSortHelper();
};
