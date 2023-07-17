import './assets/styles.scss';
import { ChartBar } from './interface/ChartBar';
import { getCanvasInfo } from './include/Canvas';
import { shuffleNumbers } from './helpers';
import { playSound, stopSound } from './include/Sounts';
import { algorithms } from './algorithms';
import BubbleSort from './sorts/BuubleSort';
import RadixSort from './sorts/RadixSort';
import QuickSort from './sorts/QuickSort';
import HeapSort from './sorts/HeapSort';
import InsertionSort from './sorts/InsertionSort';
import MergeSort from './sorts/MergeSort';
import SimplePass from './sorts/SimplePass';
import { AlgorithmMethods } from './interface/Algorithm';
import CocktailShaker from './sorts/CocktailShaker';

const drawChart = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  chartBars.forEach((chartBar, i) => {
    const maxValue = Math.max(...chartBars.map((chartBar) => chartBar.value));
    if (chartBar.isPointer) {
      playSound(chartBar);
    }
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
  RadixSort: RadixSort,
  QuickSort: QuickSort,
  HeapSort: HeapSort,
  InsertionSort: InsertionSort,
  MergeSort: MergeSort,
  CocktailShaker: CocktailShaker,
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
      /**
       * @todo: this will ignore the fact we started running another algorithm
       */
      //SimplePass(chartBars);
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

let intervalId: NodeJS.Timeout;

function checkAndExecute() {
  if (chartBars.every((chartBar, i) => chartBar.value === i + 1 && started)) {
    clearInterval(intervalId); // Clear the interval to stop further execution
    SimplePass(chartBars).then(() => {
      started = false;
      stopSound();
      drawChart();
    });
  }
}

intervalId = setInterval(checkAndExecute, 100);
