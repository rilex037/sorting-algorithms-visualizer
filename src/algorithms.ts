import { Algorithm } from './interface/Algorithm';
import BubbleSort from './sorts/BuubleSort';
import RadixSort from './sorts/RadixSort';
import QuickSort from './sorts/QuickSort';
import HeapSort from './sorts/HeapSort';
import InsertionSort from './sorts/InsertionSort';
import MergeSort from './sorts/MergeSort';
import CocktailShaker from './sorts/CocktailShaker';
import BogoSort from './sorts/BogoSort';
import SimplePass from './sorts/SimplePass';

export const algorithms: Record<string, Algorithm> = {
    bubbleSort: {
        name: 'Bubble Sort',
        method: BubbleSort,
        optimalDepth: 100,
    },
    heapSort: {
        name: 'Heap Sort',
        method:  HeapSort,
        optimalDepth: 300,
    },
    quickSort: {
        name: 'Quick Sort',
        method: QuickSort,
        optimalDepth: 300,
    },
    radixSort: {
        name: 'Radix Sort',
        method: RadixSort,
        optimalDepth: 500,
    },
    insertionSort: {
        name: 'Insertion Sort',
        method:  InsertionSort,
        optimalDepth: 100,
    },
    mergeSort: {
        name: 'Merge Sort',
        method: MergeSort,
        optimalDepth: 500,
    },
    cocktailShaker: {
        name: 'Cocktail Shaker',
        method: CocktailShaker,
        optimalDepth: 100,
    },
    bogoSort: {
        name: 'Bogo Sort',
        method: BogoSort,
        optimalDepth: 20,
    },
    simplePass: {
        name: 'Simple Pass',
        method:  SimplePass,
    },
};
