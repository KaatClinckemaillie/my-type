import Letter from './classes/Letter.js';

const $canvasHeader = document.querySelector('.header__canvas');
const ctx = $canvasHeader.getContext('2d');

const animate = () => {
  ctx.clearRect(0, 0, $canvasHeader.width, $canvasHeader.height);
  letters.forEach(letter => letter.draw());

  requestAnimationFrame(animate);
};

const getLetters = async () => {
  console.log('Start loading the JSON file');
  const response = await fetch(`index.php?page=api-letters`);
  const letters = await response.json();
  console.log(letters);
  //animate();
  return letters;
};

export const init = () => {
  console.log('start executing this JavaScript');
  getLetters();
};
