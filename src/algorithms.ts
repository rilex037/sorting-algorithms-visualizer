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
        optimalDepth: 500,
    },
    quickSort: {
        name: 'Quick Sort',
        file: 'QuickSort',
        optimalDepth: 300,
    },
    selectionSort: {
        name: 'Selection Sort',
        file: 'SelectionSort',
        optimalDepth: 100,
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
    simplePass: {
        name: 'Simple Pass',
        file: 'SimplePass',
    },
};
