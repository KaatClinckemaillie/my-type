import {random} from './functions/lib.js';

gsap.registerPlugin(ScrollTrigger);

//header
const $header = document.querySelector('.header');
const $headerBg = document.querySelector('.header__bg');
const $headerInitial = document.querySelector('.header__title--initial');
const $focusInitial = document.querySelector('.initial__focus');


const amountNeededCells = 67; // grid of 7 x 1", so 91 cells, 24 cells are already in use, so 67 cells are left;

//prologue
const $prologue = document.querySelector('.prologue');

//chapters
const $chapters = document.querySelector('.chapters');

const letters = [];


const rect = $focusInitial.getBoundingClientRect();

let scale;
let radius;
// check portrait or landscape
// calculate scale
if (window.innerWidth < window.innerHeight || window.innerWidth === window.innerHeight) {
  scale = (window.innerWidth / rect.width);
  //console.log(scale);
  radius = window.innerHeight / 2;
} else {

  scale = (window.innerHeight / rect.height);
  radius = window.innerWidth / 2;
}

// distance to translate

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
  letters.forEach(letter => elements.push(`<div class="header__letter header__letter--transform header__letter--${stylePosition[random(0, stylePosition.length)]} header__letter--${styleSize[random(0, styleSize.length)]}">${letter}</div>`));

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

const tlHeader = gsap.timeline({
  scrollTrigger: {
    trigger: '.header',
    pin: true,
    start: 'top top',
    end: 'bottom 50%',
    scrub: 1,
    markers: true,
    pinSpacing: false
  }
});

tlHeader.to($headerInitial, {
  duration: 10,
  transformOrigin: '44% 50%',
  //pin: true,
  scale: scale,
  ease: 'sine.out',
}) .to ($focusInitial, {
  attr: {
    r: () => radius,
  },
  duration: 5
}) .to('.initial__color', {
  fill: '#ebebeb',
  duration: '3'
}, 0)
;

const tlPrologue = gsap.timeline({
  scrollTrigger: {
    trigger: '.prologue',
    pin: true,
    markers: true,
    start: 'top top',
    scrub: 1
  }
});

tlPrologue.to($prologue, {
  duration: 3,
  opacity: 1,
});

const resizeWindow = () => {
  console.log('resize');
};

export const init = () => {
  console.log('start executing this JavaScript');
  resizeWindow();
  window.addEventListener('resize', resizeWindow);
  $header.style.position = 'fixed';
  //gsap.set($prologue, {opacity: 0, y: - 100});

  getLetters();
};
