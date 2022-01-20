const $canvasHeader = document.querySelector('.header__canvas');
const ctx = $canvasHeader.getContext('2d');

const letters = [];

const animate = () => {
  ctx.clearRect(0, 0, $canvasHeader.width, $canvasHeader.height);
  letters.forEach(letter => letter.draw());

  requestAnimationFrame(animate);
};

export const init = () => {
  console.log('start executing this JavaScript');

  animate();
};
