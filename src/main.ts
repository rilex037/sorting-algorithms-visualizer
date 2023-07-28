import './assets/styles.scss';
import { ChartBar } from './interface/ChartBar';
import { getCanvasInfo } from './include/Canvas';
import { sorts } from './sorts';
import type { Algorithm } from './interface/Algorithm';
import { shuffleNumbers, watch } from './helpers';
import { playSound, stopSound } from './include/Sounds';

// Initial setup
let chartBars: ChartBar[] = [];
const sortSelectElement = document.getElementById('sortSelect') as HTMLSelectElement;
sortSelectElement.value = localStorage.getItem('algorithm') || 'bubbleSort';
const startSortElement = document.getElementById('sortStart') as HTMLButtonElement;
const captionElement = document.getElementById('caption') as HTMLHeadingElement;
captionElement.innerText = sorts[sortSelectElement.value].name;
let algorithm: Algorithm = sorts[sortSelectElement.value];
chartBars = shuffleNumbers(algorithm.optimalDepth as number);

const disableButtons = () => {
  startSortElement.disabled = true;
  sortSelectElement.disabled = true;
};

const enableButtons = () => {
  startSortElement.disabled = false;
  sortSelectElement.disabled = false;
};

let state = { started: false };
const watchedState = watch(state, 'started', (value) => {
  if (!value) {
    stopSound();
  }
});

const drawChart = () => {
  const { canvas, ctx, bar } = getCanvasInfo(chartBars);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  chartBars.forEach((chartBar, i) => {
    const maxValue = Math.max(...chartBars.map((chartBar) => chartBar.value));
    if (chartBar.isPointer && watchedState.started) {
      playSound(chartBar);
    }
    let color;
    const barHeight = (chartBar.value / maxValue) * canvas.height;
    const redShade = Math.round((chartBar.value / maxValue) * 255);
    color = chartBar.color ? chartBar.color : `rgb(${redShade}, 12, 77)`;
    ctx.fillStyle = chartBar.isPointer ? 'yellow' : color;
    ctx.fillRect((i * canvas.width) / chartBars.length, canvas.height - barHeight, bar, barHeight);
  });
};

sortSelectElement?.addEventListener('change', (e) => {
  algorithm = sorts[(e.target as HTMLSelectElement).value];
  localStorage.setItem('algorithm', (e.target as HTMLSelectElement).value);
  document.getElementById('caption')!.innerHTML = algorithm.name;
  chartBars = shuffleNumbers(algorithm.optimalDepth);
});

startSortElement?.addEventListener('click', () => {
  if (!watchedState.started) {
    chartBars = shuffleNumbers(algorithm.optimalDepth);
    watchedState.started = true;
    disableButtons();
    algorithm.method(chartBars).then(() => {
      watchedState.started = false;
      enableButtons();
    });
  }
});

const drawChartLoop = () => {
  drawChart();
  requestAnimationFrame(drawChartLoop);
};
drawChartLoop();
