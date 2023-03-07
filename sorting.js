import { animations } from "./visualizer.js";

export const sorting = {
  bubbleSort: async (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          await animations.swap(j, j + 1);
        }
      }
    }
  },

  mergeSort: async function(arr, start = 0) {
      // Base case
    debugger;
    if (arr.length <= 1) return {
      arr: arr,
      start: start,
    };
    let mid = Math.floor(arr.length / 2);
    // Recursive calls
    let left = await this.mergeSort(arr.slice(0, mid), start);

    // By keeping track of the start index of original array the elements on the DOM can be manipulated
    let rStart = left.start + left.arr.length;

    let right = await this.mergeSort(arr.slice(mid), rStart);
    return merge(left, right);
  },
}

async function merge(left, right) {
  let sortedArr = []; // the sorted items will go here
  let currI = left.start;
  let value;
  while (left.arr.length && right.arr.length) {
    // insert the smallest item into sortedArr
    if (left.arr[0] < right.arr[0]) {
      value = left.arr.shift();
      sortedArr.push(value);
    } else {
      value = right.arr.shift();
      sortedArr.push(value);
    }
    await animations.insert(value, currI);
    currI++;
  }
  // update visuals to remaining values
  let remaining = left.arr.length ? left.arr : right.arr;
    for (let val of remaining) {
      sortedArr.push(val);
      await animations.insert(val, currI);
      currI++;
    }
  
  return {
    arr: sortedArr,
    start: left.start,
  };
}