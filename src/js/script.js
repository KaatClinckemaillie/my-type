import {random} from './functions/lib.js';

const $headerBg = document.querySelector('.header__bg');
const $zoomInitial = document.querySelector('.header__title--initial');
const amountNeededCells = 65; // grid of 7 x 11, so 91 cells, 26 cells are already in use, so 65 cells are left;

const letters = [];

const step = 0.99;
const minScale = 1;
let scale = 1;
const rect = $zoomInitial.getBoundingClientRect();
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
  console.log(factor);
  const scaleChanged = Math.pow(step, factor);
  console.log(`scaleChanged: ${scaleChanged}`);
  // huidige positie
  const rect = $zoomInitial.getBoundingClientRect();
  const currentCenterX = rect.x + rect.width / 2;
  const currentCenterY = rect.y + rect.height / 2;
  if (factor > 0) {
    scale += 5;
    // positie waar je naartoe wilt
    const screenCenterX = window.innerWidth / 2;
    const screencenterY = window.innerHeight / 2;
    // afstand huidige positie en positie waar je naartoe wilt
    const middlePosToCurrentCenterDistanceX = screenCenterX - currentCenterX;
    const middlePosToCurrentCenterDistanceY = screencenterY - currentCenterY;
    // indien je niet in 1 keer naar de gewenste positie wilt gaan, kun je hiermee in stapjes naar de plaats gaan
    const newCenterX = currentCenterX + middlePosToCurrentCenterDistanceX * (1 - scaleChanged);
    const newCenterY = currentCenterY + middlePosToCurrentCenterDistanceY * (1 - scaleChanged);
    // All we are doing above is: getting the target center, then calculate the offset from origin center.
    //afstand tussenstapje en oorspronkelijke afstand
    const offsetX = newCenterX - originCenterX;
    const offsetY = newCenterY - originCenterY;
    // !!! Both translate and scale are relative to the original position and scale, not to the current.
    $zoomInitial.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
  } else {
    scale -= 5;
    // afstand huidige positie en positie waar je naartoe wilt
    const middlePosToCurrentCenterDistanceX = originCenterX - currentCenterX;
    const middlePosToCurrentCenterDistanceY = originCenterY - currentCenterY;
    // indien je niet in 1 keer naar de gewenste positie wilt gaan, kun je hiermee in stapjes naar de plaats gaan
    const newCenterX = currentCenterX + middlePosToCurrentCenterDistanceX;
    const newCenterY = currentCenterY + middlePosToCurrentCenterDistanceY;
    // All we are doing above is: getting the target center, then calculate the offset from origin center.
    //afstand tussenstapje en oorspronkelijke afstand
    const offsetX = middlePosToCurrentCenterDistanceX;
    const offsetY = middlePosToCurrentCenterDistanceY;
    // !!! Both translate and scale are relative to the original position and scale, not to the current.
    if (scale < minScale) {
      scale = 1;
      $zoomInitial.style.removeProperty('transform');
    }
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
