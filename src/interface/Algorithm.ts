import { ChartBar } from "./ChartBar";

export interface Algorithm {
  name: string;
  file:  string;
  optimalDepth?: number;
}

export interface AlgorithmMethods {
  [key: string]: (chartBars: ChartBar[]) => Promise<void>;
}