import {random} from './functions/lib.js';

//header
const $headerBg = document.querySelector('.header__bg');
const $zoomInitial = document.querySelector('.header__title--initial');
const $focusZoomInitial = document.querySelector('.initial__focus-scroll');
const $colorInitial = $zoomInitial.querySelector('.initial__color');
const amountNeededCells = 65; // grid of 7 x 11, so 91 cells, 26 cells are already in use, so 65 cells are left;

//prologue
const $prologueContainer = document.querySelector('.prologue__container');

const letters = [];


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

  // check zoom in or zoom out
  // go from header to the prologue
  if (factor > 0) {
    let scale;

    // check portrait or landscape
    // calculate scale
    if (window.innerWidth < window.innerHeight || window.innerWidth === window.innerHeight) {
      scale = (window.innerHeight / rect.height);
      console.log(scale);
    } else {
      scale = (window.innerWidth / rect.width);
    }
    // endposition
    const screenCenterX = window.innerWidth / 2;
    const screencenterY = window.innerHeight / 2;

    // distance to translate
    const distanceX = (screenCenterX - originCenterX) + 200;
    const distanceY = (screencenterY - originCenterY) + scale;

    // zoom out and translate the header
    $zoomInitial.style.transition = '5s transform ease-in';
    $zoomInitial.style.transform = `translate(${distanceX + 200}px, ${distanceY + scale}px) scale(${scale})`;

    // change color for fluent transition
    $colorInitial.style.transition = '3s fill 2s';
    $focusZoomInitial.style.transition = '3s fill 2s';
    $colorInitial.style.fill = '#EBEBEB';
    $focusZoomInitial.style.fill = '#EBEBEB';

    // show prologue

    $prologueContainer.style.transition = '3s all ease-in 2s';
    $prologueContainer.style.opacity = `1`;
    $prologueContainer.style.height = `100vh`;
    $prologueContainer.style.width = '100vw';

  // go back to header
  } else {
    $zoomInitial.style.transition = '1s all ease-out';
    $focusZoomInitial.style.transition = '1s all ease-out';
    $zoomInitial.style.removeProperty('transform');
    $focusZoomInitial.style.removeProperty('transform');

    $prologueContainer.style.transition = '1s all ease-out';
    $prologueContainer.style.height = '1vh';
    $prologueContainer.style.opacity = '0';
    $prologueContainer.style.width = '1vh';
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
  $prologueContainer.style.height = '1vh';
  $prologueContainer.style.width = '1vw';
  getLetters();
  document.addEventListener('wheel', handleWheelHeader);


};
