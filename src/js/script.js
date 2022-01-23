import {random} from './functions/lib.js';

const $header = document.querySelector('.header');
const amountNeededCells = 65; // grid of 7 x 11, so 91 cells, 26 cells are already in use, so 65 cells are left;

const letters = [];

const zoomElement = document.querySelector('.zoom');
let zoom = 1;
const zoomSpeed = 0.5;

const getLetters = async () => {
  console.log('Start loading the JSON file');
  const response = await fetch(`index.php?page=api-letters`);
  const data = await response.json();
  console.log(data);
  data.forEach(item => letters.push(item.letter));
  console.log(letters);
  createGridElements();
};

const createGridElements = () => {
  const elements = [];
  const styleSize = ['s', 'm', 'm', 'm', 'l', 'l', 'l', 'l', 'xl'];
  const stylePosition = ['tc', 'tl', 'tr', 'bc', 'bl', 'br', 'lc', 'rc', 'c'];

  // first add al the letters plus one empty div
  letters.forEach(letter => elements.push(`<div class="header__letter header__letter--${stylePosition[random(0, stylePosition.length)]} header__letter--${styleSize[random(0, styleSize.length)]}">${letter}</div>`));

  // add empty divs, so that Elements has a length of 67
  const emptyCells = amountNeededCells - elements.length;
  for (let i = 0;i < emptyCells;i ++) {
    elements.push(`<div></div>`);
  }

  showLetters(elements);
};

const showLetters = elements => {
  shuffle(elements).forEach(element => $header.innerHTML += element);
};

const shuffle = array => {
  let currentIndex = array.length, randomIndex;

  //while there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex --;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};


export const init = () => {
  console.log('start executing this JavaScript');
  //resizeWindow();
  getLetters();

  document.addEventListener('wheel', e => {
    // don't make zoom smaller than 1
    if (zoom > 1) {
      if (e.deltaY > 0) {
        zoomElement.style.transform = `scale(${zoom += zoomSpeed})`;
      } else {
        zoomElement.style.transform = `scale(${zoom -= zoomSpeed})`;
      }
    } else if (zoom === 1) {
      if (e.deltaY > 0) {
        zoomElement.style.transform = `scale(${zoom += zoomSpeed})`;
      }

    } else {
      zoom = 1;
    }
    console.log(zoom);
  });
};
