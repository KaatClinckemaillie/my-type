import {random} from './functions/lib.js';

const $headerBg = document.querySelector('.header__bg');
const $zoomInitial = document.querySelector('.header__title--initial');
const $focusZoomInitial = document.querySelector('.initial__focus-scroll');
const amountNeededCells = 65; // grid of 7 x 11, so 91 cells, 26 cells are already in use, so 65 cells are left;

const letters = [];

const step = 0.99;
const minScale = 1;
let scale = 1;
const rect = $focusZoomInitial.getBoundingClientRect();
const originCenterX = rect.x + rect.width / 2;
const originCenterY = rect.y + rect.height / 2;

const getLetters = async () => {
  console.log('Start loading the JSON file');
  const response = await fetch(`index.php?page=api-letters`);
  const data = await response.json();
  console.log(data);
  data.forEach(item => letters.push(item.letter));
  console.log(letters);
  createGridElements();
};

const handleWheelHeader = e => {
  e.preventDefault();
  const factor = e.deltaY;
  //console.log(factor);
  const scaleChanged = Math.pow(step, factor);
  //console.log(`scaleChanged: ${scaleChanged}`);
  // huidige positie
  const rect = $focusZoomInitial.getBoundingClientRect();
  const currentCenterX = rect.x + rect.width / 2;
  const currentCenterY = rect.y + rect.height / 2;
  if (factor > 0) {
    let scale;
    if (window.innerWidth < window.innerHeight || window.innerWidth === window.innerHeight) {
      scale = (window.innerHeight / rect.height);
      console.log(scale);
    } else {
      scale = (window.innerWidth / rect.width);
    }
    // positie waar je naartoe wilt
    const screenCenterX = window.innerWidth / 2;
    const screencenterY = window.innerHeight / 2;
    // afstand huidige positie en positie waar je naartoe wilt
    const distanceX = (screenCenterX - originCenterX) + 200;
    const distanceY = (screencenterY - originCenterY) + scale;

    $zoomInitial.style.transition = '5s all ease-in';
    $zoomInitial.style.transform = `translate(${distanceX + 200}px, ${distanceY + scale}px) scale(${scale})`;
    $focusZoomInitial.style.transition = '8s all ease-in';

  } else {
    $zoomInitial.style.transition = '1s all ease-out';
    $focusZoomInitial.style.transition = '1s all ease-out';
    $zoomInitial.style.removeProperty('transform');
    $focusZoomInitial.style.removeProperty('transform');
    //}
  }
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
  shuffle(elements).forEach(element => $headerBg.innerHTML += element);
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
  document.addEventListener('wheel', handleWheelHeader);


};
