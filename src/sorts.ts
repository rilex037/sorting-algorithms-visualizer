import { Algorithm } from './interface/Algorithm';
import BubbleSort from './sorts/BuubleSort';
import RadixSort from './sorts/RadixSort';
import QuickSort from './sorts/QuickSort';
import HeapSort from './sorts/HeapSort';
import InsertionSort from './sorts/InsertionSort';
import MergeSort from './sorts/MergeSort';
import CocktailShaker from './sorts/CocktailShaker';
import BogoSort from './sorts/BogoSort';

const sorts: Record<string, Algorithm> = {
  bubbleSort: {
    name: 'Bubble Sort',
    method: BubbleSort,
    optimalDepth: 50,
  },
  heapSort: {
    name: 'Heap Sort',
    method: HeapSort,
    optimalDepth: 100,
  },
  quickSort: {
    name: 'Quick Sort',
    method: QuickSort,
    optimalDepth: 150,
  },
  radixSort: {
    name: 'Radix Sort',
    method: RadixSort,
    optimalDepth: 150,
  },
  insertionSort: {
    name: 'Insertion Sort',
    method: InsertionSort,
    optimalDepth: 50,
  },
  mergeSort: {
    name: 'Merge Sort',
    method: MergeSort,
    optimalDepth: 200,
  },
  cocktailShaker: {
    name: 'Cocktail Shaker',
    method: CocktailShaker,
    optimalDepth: 50,
  },
  bogoSort: {
    name: 'Bogo Sort',
    method: BogoSort,
    optimalDepth: 5,
  },
};

export { sorts };
