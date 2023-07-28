import { ChartBar } from "../interface/ChartBar";
import { setPointer } from "../pointer";

export default async (chartBars: ChartBar[]): Promise<void> => {
    for (let i = 1; i < chartBars.length; i++) {
        const key = chartBars[i].value;
        let j = i - 1;
        while (j >= 0 && chartBars[j].value > key) {
            chartBars[j + 1].value = chartBars[j].value;
            await setPointer([chartBars[j + 1]]);
            j--;
        }
        chartBars[j + 1].value = key;
    }
}