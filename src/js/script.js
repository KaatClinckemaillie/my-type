import Letter from './classes/Letter.js';

const $canvasHeader = document.querySelector('.header__canvas');
const letters = [];
const movingLetters = [];

/* const animate = () => {
  //ctx.clearRect(0, 0, $canvasHeader.width, $canvasHeader.height);
  letters.forEach(letter => letter.draw());

  //requestAnimationFrame(animate);
}; */

const showLetters = () => {
  letters.forEach(letter => movingLetters.push(new Letter($canvasHeader, letter)));
  console.log(movingLetters);
  movingLetters.forEach(letter => letter.draw());
};

const getLetters = async () => {
  console.log('Start loading the JSON file');
  const response = await fetch(`index.php?page=api-letters`);
  const data = await response.json();
  console.log(data);
  data.forEach(item => letters.push(item.letter));
  console.log(letters);
  //animate();
  showLetters();
};

const resizeWindow = () => {
  $canvasHeader.setAttribute('height', window.innerHeight);
  $canvasHeader.setAttribute('width', window.innerWidth);
};

export const init = () => {
  console.log('start executing this JavaScript');
  resizeWindow();
  getLetters();
};
