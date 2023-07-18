import { Algorithm } from './interface/Algorithm';

export const algorithms: Record<string, Algorithm> = {
    bubbleSort: {
        name: 'Bubble Sort',
        file: 'BubbleSort',
        optimalDepth: 100,
    },
    heapSort: {
        name: 'Heap Sort',
        file: 'HeapSort',
        optimalDepth: 300,
    },
    quickSort: {
        name: 'Quick Sort',
        file: 'QuickSort',
        optimalDepth: 300,
    },
    radixSort: {
        name: 'Radix Sort',
        file: 'RadixSort',
        optimalDepth: 500,
    },
    insertionSort: {
        name: 'Insertion Sort',
        file: 'InsertionSort',
        optimalDepth: 100,
    },
    mergeSort: {
        name: 'Merge Sort',
        file: 'MergeSort',
        optimalDepth: 500,
    },
    cocktailShaker: {
        name: 'Cocktail Shaker',
        file: 'CocktailShaker',
        optimalDepth: 100,
    },
    bogoSort: {
        name: 'Bogo Sort',
        file: 'BogoSort',
        optimalDepth: 20,
    },
    simplePass: {
        name: 'Simple Pass',
        file: 'SimplePass',
    },
};
