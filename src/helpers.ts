import { ChartBar } from './interface/ChartBar';

const MIN_VALUE = 20; // Minimum value for valid notes
const MAX_VALUE = 500; // Maximum value for valid notes

const shuffleNumbers = (bars: number): ChartBar[] => {
  const values = Array.from({ length: bars }, (_, i) => MIN_VALUE + Math.floor((i * (MAX_VALUE - MIN_VALUE)) / bars));

  for (let i = values.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [values[i], values[j]] = [values[j], values[i]];
  }

  const chartBars: ChartBar[] = values.map((value) => ({
    value,
    isPointer: false,
    color: null,
  }));

  return chartBars;
};

const watch = (target: any, prop: string, callback: (value: any) => void) => {
  const handler = {
    set(obj: any, property: string, value: any) {
      if (property === prop && value !== obj[property]) {
        obj[property] = value;
        callback(value);
      }
      return true;
    },
  };

  const proxy = new Proxy(target, handler);
  return proxy;
};

export { shuffleNumbers, watch };
