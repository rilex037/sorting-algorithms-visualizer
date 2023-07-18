import { ChartBar } from '../interface/ChartBar';

 
 

export default async (chartBars: ChartBar[]) => {
    const isSorted = (arr: ChartBar[]) => {
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i].value > arr[i + 1].value) {
                return false;
            }
        }
        return true;
    };

    const shuffle = (arr: ChartBar[]) => {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    while (!isSorted(chartBars)) {
        shuffle(chartBars);
        for (let j = 0; j < chartBars.length - 1; j++) {
            chartBars[j].isPointer = true;
            chartBars[j + 1].isPointer = true;
            await new Promise((resolve) => setTimeout(resolve, 200));
            chartBars[j].isPointer = false;
            chartBars[j + 1].isPointer = false;
        }
    }
};
