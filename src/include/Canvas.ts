import { ChartBar } from '../interface/ChartBar';

export function getCanvasInfo(chartBars: ChartBar[]) {
  const canvas = document.getElementById('chart') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const bar = canvas.width / chartBars.length;
  return { canvas, ctx, bar };
}
