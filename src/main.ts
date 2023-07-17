import './assets/styles.scss';
import { ChartBar } from './interface/ChartBar';
import { getCanvasInfo } from './include/Canvas';
import { bubbleSort } from './sorts/BuubleSort';
import { selectionSort } from './sorts/SelectionSort';
import { radixSort } from './sorts/RadixSort';
import { quickSort } from './sorts/QuickSort';
import { shuffleNumbers } from './helpers';
import { heapSort } from './sorts/HeapSort';
import { insertionSort } from './sorts/InsertionSort';
import { playSound, stopSound } from './include/Sounts';
import { mergeSort } from './sorts/MergeSort';

const drawChart = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  chartBars.forEach((chartBar, i) => {
    const maxValue = Math.max(...chartBars.map((chartBar) => chartBar.value));
    playSound(chartBar);
    const barHeight = (chartBar.value / maxValue) * canvas.height;
    const redShade = Math.round((chartBar.value / maxValue) * 255);
    chartBar.color = `rgb(${redShade}, 12,77)`;
    ctx.fillStyle = chartBar.isPointer ? 'yellow' : chartBar.color;
    ctx.fillRect((i * canvas.width) / chartBars.length, canvas.height - barHeight, bar, barHeight);
  });
};

let chartBars: ChartBar[] = [];
let sortingValue = 'bubbleSort';
const sortSelectElement = document.getElementById('sortSelect');
const sortResetElement = document.getElementById('sortReset');
const startSortElement = document.getElementById('sortStart');

chartBars = shuffleNumbers(100);
let started = false;
sortSelectElement?.addEventListener('click', (e) => {
  started = true;
  sortingValue = (e.target as HTMLSelectElement).value;
  switch (sortingValue) {
    case 'bubbleSort':
      document.getElementById('caption')!.innerHTML = 'Bubble Sort';
      chartBars = shuffleNumbers(100);
      bubbleSort(chartBars);
      break;
    case 'heapSort':
      document.getElementById('caption')!.innerHTML = 'Heap Sort';
      chartBars = shuffleNumbers(500);
      heapSort(chartBars);
      break;
    case 'quickSort':
      document.getElementById('caption')!.innerHTML = 'Quick Sort';
      chartBars = shuffleNumbers(500);
      quickSort(chartBars);
      break;
    case 'selectionSort':
      document.getElementById('caption')!.innerHTML = 'Selection Sort';
      chartBars = shuffleNumbers(100);
      selectionSort(chartBars);
      break;
    case 'radixSort':
      document.getElementById('caption')!.innerHTML = 'Radix Sort';
      chartBars = shuffleNumbers(500);
      radixSort(chartBars);
      break;
    case 'insertionSort':
      document.getElementById('caption')!.innerHTML = 'Insertion Sort';
      chartBars = shuffleNumbers(100);
      insertionSort(chartBars);
      break;
    case 'mergeSort':
      document.getElementById('caption')!.innerHTML = 'Merge Sort';
      chartBars = shuffleNumbers(500);
      mergeSort(chartBars);
      break;
    default:
      break;
  }
});

sortResetElement?.addEventListener('click', () => {
  sortSelectElement?.dispatchEvent(new Event('click'));
});

//sortSelectElement?.dispatchEvent(new Event('click'));

startSortElement?.addEventListener('click', () => {
  sortSelectElement?.dispatchEvent(new Event('click'));
});

const { canvas, ctx, bar } = getCanvasInfo(chartBars);

// Draw chart
setInterval(() => {
  if (started) {
    drawChart();
  }
}, 5);

// Stop sound when sorting is done
setInterval(async () => {
  if (chartBars.every((chartBar, i) => chartBar.value === i + 1)) {
    stopSound();
    return;
  }
}, 100);
