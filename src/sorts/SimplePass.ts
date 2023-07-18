import { ChartBar } from '../interface/ChartBar';

export default async (chartBars: ChartBar[]) => {
  const totalIterations = chartBars.length;
  let currentIteration = 0;

  return new Promise<void>((resolve) => {
    const animate = () => {
      if (currentIteration >= totalIterations) {
        resolve();
        return;
      }

      chartBars[currentIteration].isPointer = true;

      requestAnimationFrame(() => {
        chartBars[currentIteration].isPointer = false;
        chartBars[currentIteration].color = 'green';
        currentIteration++;
        animate();
      });
    };

    animate();
  });
};
