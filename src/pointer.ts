import { ChartBar } from './interface/ChartBar';

const setPointer = async (chartBars: ChartBar[], timeout?: number) => {
  chartBars.forEach((chartBar) => (chartBar.isPointer = true));
  await new Promise((resolve) => {
    if (timeout && typeof timeout === 'number') {
      setTimeout(resolve, timeout);
    } else {
      requestAnimationFrame(resolve);
    }
  });
  chartBars.forEach((chartBar) => (chartBar.isPointer = false));
};

export { setPointer };