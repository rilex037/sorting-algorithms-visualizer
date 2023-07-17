import { ChartBar } from '../interface/ChartBar';

export default async (chartBars: ChartBar[]) => {
  const merge = async (left: number, mid: number, right: number) => {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    const L = new Array(n1);
    const R = new Array(n2);
    for (let i = 0; i < n1; i++) {
      L[i] = chartBars[left + i];
      chartBars[left + i].isPointer = true;
      await new Promise((resolve) => setTimeout(resolve, 5));
      chartBars[left + i].isPointer = false;
    }
    for (let j = 0; j < n2; j++) {
      R[j] = chartBars[mid + 1 + j];
      chartBars[mid + 1 + j].isPointer = true;
      await new Promise((resolve) => setTimeout(resolve, 5));
      chartBars[mid + 1 + j].isPointer = false;
    }
    let i = 0;
    let j = 0;
    let k = left;
    while (i < n1 && j < n2) {
      if (L[i].value <= R[j].value) {
        chartBars[k] = L[i];
        i++;
      } else {
        chartBars[k] = R[j];
        j++;
      }
      k++;
    }
    while (i < n1) {
      chartBars[k] = L[i];
      i++;
      k++;
    }
    while (j < n2) {
      chartBars[k] = R[j];
      j++;
      k++;
    }
  };
  const mergeSortHelper = async (left: number, right: number) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      await mergeSortHelper(left, mid);
      await mergeSortHelper(mid + 1, right);
      await merge(left, mid, right);
    }
  };

  await mergeSortHelper(0, chartBars.length - 1);
};
