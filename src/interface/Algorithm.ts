import { ChartBar } from './ChartBar';

export interface Algorithm {
  name: string;
  method: (chartBars: ChartBar[]) => Promise<void>;
  optimalDepth: number;
}

export interface AlgorithmMethods {
  [key: string]: (chartBars: ChartBar[]) => Promise<void>;
}
