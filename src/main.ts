import './assets/styles.scss';
import { ChartBar } from './interface/ChartBar';
import { getCanvasInfo } from './include/Canvas';
import { shuffleNumbers } from './helpers';
import { playSound, stopSound } from './include/Sounts';
import { algorithms } from './algorithms';
import BubbleSort from './sorts/BuubleSort';
import SelectionSort from './sorts/SelectionSort';
import RadixSort from './sorts/RadixSort';
import QuickSort from './sorts/QuickSort';
import HeapSort from './sorts/HeapSort';
import InsertionSort from './sorts/InsertionSort';
import MergeSort from './sorts/MergeSort';
import SimplePass from './sorts/SimplePass';
import { AlgorithmMethods } from './interface/Algorithm';

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

const reset = () => {
  chartBars = shuffleNumbers(0);
  document.getElementById('caption')!.innerHTML = 'Select a sorting algorithm';
  drawChart();
  stopSound();
};

let chartBars: ChartBar[] = [];
let sortingValue;
const sortSelectElement = document.getElementById('sortSelect');
const sortResetElement = document.getElementById('sortReset');
const startSortElement = document.getElementById('sortStart');
chartBars = shuffleNumbers(100);

const algorithmMethods: AlgorithmMethods = {
  BubbleSort: BubbleSort,
  SelectionSort: SelectionSort,
  RadixSort: RadixSort,
  QuickSort: QuickSort,
  HeapSort: HeapSort,
  InsertionSort: InsertionSort,
  MergeSort: MergeSort,
  SimplePass: SimplePass,
};

let started = false;
sortSelectElement?.addEventListener('change', (e) => {
  started = true;
  sortingValue = (e.target as HTMLSelectElement).value;
  const algorithm = algorithms[sortingValue];
  if (algorithm) {
    algorithm.optimalDepth;
    document.getElementById('caption')!.innerHTML = algorithm.name;
    chartBars = shuffleNumbers(algorithm.optimalDepth ?? 100);
    algorithmMethods[algorithm.file](chartBars).then(() => {
      SimplePass(chartBars);
    });
  }
});

sortResetElement?.addEventListener('click', () => {
  reset();
});

startSortElement?.addEventListener('click', () => {
  sortSelectElement?.dispatchEvent(new Event('change'));
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
