import { ChartBar } from '../interface/ChartBar';

export default async (chartBars: ChartBar[]) => {
  const totalIterations = chartBars.length - 1;

  for (let i = 0; i <= totalIterations; i++) {
    chartBars[i].isPointer = true;
    await new Promise((resolve) => setTimeout(resolve, 5));
  }
};
