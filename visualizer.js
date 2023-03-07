import { sorting }  from "./sorting.js";

const numElements = 100;
const values = Array.from({length: numElements}, (x, i) => i + 1);
const valueColumns = document.getElementsByClassName('value-column');

const OGCOLOR = 'green';
const SWAPCOLOR = 'red';

// create dom elements with height corresponding to array value

const toPercentage = (value) => `${value}%`

const initialize = () => {
  let main = document.getElementById('value-container');
  values.forEach((value, i) => {
    let column = document.createElement('div');
    column.classList.add('value-column');
    let unit = 100 / numElements;
    column.style.width = toPercentage(unit);
    column.style.height = toPercentage(unit * value);
    main.appendChild(column)
  })
}

async function scrambleValues() {
  const scrambleTime = 1000;
  const msPerSwap = scrambleTime / numElements;
  console.log(msPerSwap)
  for (let i = 0; i < numElements; i++) {
    let i1 = Math.floor(Math.random() * numElements);
    let i2 = Math.floor(Math.random() * numElements);
    while (i1 == i2) {
      i2 = Math.floor(Math.random() * numElements);
    }
    await animations.swap(i1, i2, msPerSwap);
  }
}

export const animations = {
  swap: async function(i1, i2, ms = 5) {
    await this.blink(i2, ms);
  
    [values[i1], values[i2]] = [values[i2], values[i1]];
    this.updateHeight(i1);
    this.updateHeight(i2);
  },

  insert: async function(value, index, ms) {
    await this.blink(index, ms);

    values[index] = value;
    this.updateHeight(index);
  },

  updateHeight: (index) => {
    let newHeight = toPercentage(100 / numElements * values[index]);
    valueColumns[index].style.height = newHeight;
  },

  blink: async function(index, ms) {
    valueColumns[index].style.backgroundColor =  SWAPCOLOR;
    await this.delay(ms);
    valueColumns[index].style.backgroundColor =  OGCOLOR;
  },

  delay: (ms = 10) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, ms);
    });
  }
}

window.onload = async () => {
  initialize();
  await scrambleValues();
  sorting.mergeSort(values);
}