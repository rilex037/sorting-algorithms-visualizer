import { ChartBar } from "../interface/ChartBar";

export default async (chartBars: ChartBar[]) => {
    for (let i = 1; i < chartBars.length; i++) {
        const key = chartBars[i].value;
        let j = i - 1;
        while (j >= 0 && chartBars[j].value > key) {
            chartBars[j + 1].value = chartBars[j].value;
            chartBars[j + 1].isPointer = true;
            await new Promise((resolve) => setTimeout(resolve,5));
            chartBars[j + 1].isPointer = false;
            j--;
        }
        chartBars[j + 1].value = key;
    }
}