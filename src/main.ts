import './assets/styles.scss';
import { ChartBar } from './interface/ChartBar';
import { getCanvasInfo } from './include/Canvas';
import { shuffleNumbers } from './helpers';
import { playSound, stopSound } from './include/Sounds';
import { algorithms } from './algorithms';
import { inject } from '@vercel/analytics';

inject();

const drawChart = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  chartBars.forEach((chartBar, i) => {
    const maxValue = Math.max(...chartBars.map((chartBar) => chartBar.value));
    if (chartBar.isPointer && started) {
      playSound(chartBar);
    }
    let color;
    const barHeight = (chartBar.value / maxValue) * canvas.height;
    const redShade = Math.round((chartBar.value / maxValue) * 255);
    color = chartBar.color ? chartBar.color : `rgb(${redShade}, 12,77)`;
    ctx.fillStyle = chartBar.isPointer ? 'yellow' : color;
    ctx.fillRect((i * canvas.width) / chartBars.length, canvas.height - barHeight, bar, barHeight);
  });
};

const reset = () => {
  chartBars = shuffleNumbers(100);
  document.getElementById('caption')!.innerHTML = 'Select a sorting algorithm';
  started = false;
  stopSound();
};

let chartBars: ChartBar[] = [];
let sortingValue;
const sortSelectElement = document.getElementById('sortSelect');
const sortResetElement = document.getElementById('sortReset');
const startSortElement = document.getElementById('sortStart');
chartBars = shuffleNumbers(100);

let started = false;
sortSelectElement?.addEventListener('change', (e) => {
  started = true;
  sortingValue = (e.target as HTMLSelectElement).value;
  const algorithm = algorithms[sortingValue];
  if (algorithm) {
    algorithm.optimalDepth;
    document.getElementById('caption')!.innerHTML = algorithm.name;
    chartBars = shuffleNumbers(algorithm.optimalDepth ?? 100);
    algorithm.method(chartBars).then(async () => {
      await algorithms.simplePass.method(chartBars);
      started = false;
      stopSound();
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

// Draw chart using requestAnimationFrame
const drawChartLoop = () => {
  drawChart();
  requestAnimationFrame(drawChartLoop);
};
drawChartLoop();
