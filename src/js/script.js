import Letter from './classes/Letter.js';
import Vector from './classes/Vector.js';
import {random, cellAmountLetter} from './functions/lib.js';

const $header = document.querySelector('.header');
const amountNeededCells = 67; // grid of 7 x 11, so 91 cells, 24 cells are already in use, so 67 cells are left;

const $canvasHeader = document.querySelector('.header__canvas');
const letters = [];
const movingLetters = [];
const lettersPositions = [];

/* const animate = () => {
  //ctx.clearRect(0, 0, $canvasHeader.width, $canvasHeader.height);
  letters.forEach(letter => letter.draw());

  //requestAnimationFrame(animate);
}; */

const pickCoordinateLetter = () => {
  let letterPosition = new Vector(random(1, cellAmountLetter), random(1, cellAmountLetter));

  // check if position is already used + margin
  while (lettersPositions.some(item => item.x === letterPosition.x && item.y === letterPosition.y)) {
    letterPosition = new Vector(random(1, cellAmountLetter), random(1, cellAmountLetter));
  }
  console.log(letterPosition);
  lettersPositions.push(letterPosition);
  return letterPosition;

};

/* const showLetters = () => {
  letters.forEach(letter => movingLetters.push(new Letter($canvasHeader, letter, pickCoordinateLetter())));
  console.log(movingLetters);
  movingLetters.forEach(letter => letter.draw());
  console.log(lettersPositions);
}; */

const getLetters = async () => {
  console.log('Start loading the JSON file');
  const response = await fetch(`index.php?page=api-letters`);
  const data = await response.json();
  console.log(data);
  data.forEach(item => letters.push(item.letter));
  console.log(letters);
  //animate();
  //showLetters();
  //pickCoordinateLetterX();

  createGridElements();
};

const createGridElements = () => {
  const elements = [];

  // first add al the letters
  letters.forEach(letter => elements.push(`<div class="letter">${letter}</div>`));

  // add empty divs, so that Elements has a length of 67
  const emptyCells = amountNeededCells - elements.length;
  for (let i = 0;i < emptyCells;i ++) {
    elements.push(`<div class="letter"></div>`);
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


const resizeWindow = () => {
  $canvasHeader.setAttribute('height', window.innerHeight);
  $canvasHeader.setAttribute('width', window.innerWidth);
};

export const init = () => {
  console.log('start executing this JavaScript');
  //resizeWindow();
  getLetters();
};
