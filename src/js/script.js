import {random} from './functions/lib.js';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

//header
const $header = document.querySelector('.header');
const $headerBg = document.querySelector('.header__bg');
const $headerInitial = document.querySelector('.header__title--initial');
const $focusInitial = document.querySelector('.initial__focus');

const amountNeededCells = 67; // grid of 7 x 1", so 91 cells, 24 cells are already in use, so 67 cells are left;

//prologue
const $prologue = document.querySelector('.prologue');

const letters = [];

const $buttomLink1 = document.querySelector('.interaction__link--1');
const $buttomLink2 = document.querySelector('.interaction__link--2');
const $buttomLink3 = document.querySelector('.interaction__link--3');
const $dot1 = document.querySelector('.interaction__dot1');
const $dot2 = document.querySelector('.interaction__dot2');
const $dot3 = document.querySelector('.interaction__dot3');

const $chapter2Part1 = document.querySelector('.chapter2__content--1');
const $chapter2Part2 = document.querySelector('.chapter2__content--2');
const $chapter2Part3 = document.querySelector('.chapter2__content--3');
const $chapter2Part0 = document.querySelector('.chapter2__content--0');
const $chapter2Background = document.querySelector('.chapter2__background');
const $chapterCheck = document.querySelector('.chapter__title--check');

const navigationItems = document.querySelectorAll('.navigation__list--item');

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





const resizeWindow = () => {
  console.log('resize');
  initScrollTrigger();
};

const initScrollTrigger = () => {
  const y = - 3 / 4 * window.innerHeight;
  gsap.set('.prologue__paintings', {opacity: 0, scale: 0});
  gsap.set($prologue, {y: y});


  gsap.set('.name-tags', {xPercent: 100});

  // scroll header
  const tlHeader = gsap.timeline({
    scrollTrigger: {
      trigger: '.header',
      pin: true,
      start: 'top top',
      end: 'bottom 50%',
      scrub: 1,
      pinSpacing: false
    }
  });

  tlHeader.to($headerInitial, {
    duration: 10,
    transformOrigin: '44% 50%',
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

  // scroll prologue
  const tlPrologue = gsap.timeline({
    scrollTrigger: {
      trigger: '.prologue',
      pin: true,
      start: 'top top',
      scrub: 1,
      pinSpacing: false
    }
  });

  tlPrologue.to('.prologue__paintings', {
    duration: 1,
    opacity: 1,
    scale: 1
  })
    .to('.prologue__paintings', {
      scale: 4,
      opacity: 0,
      duration: 4
    })
    .set('.prologue__paintings', {
      display: 'none'
    });

  // scroll triggers for desktop
  if (window.innerWidth >= 768) {
    gsap.set('.chapter3__content--text', {y: 200});
    document.querySelectorAll('.chapter__title').forEach($title => {
      const $text = $title.querySelector('.chapter__title--text');
      const $chapter = $title.querySelector('.chapter__title--chapter');
      const $rect = $title.querySelector('.chapter__title--rect');
      gsap.set($text, {x: - 400});
      gsap.set($rect, {opacity: 0});
      gsap.set($chapter, {x: 200});
      const tlTitle = gsap.timeline();
      tlTitle.to($text, {x: 0, duration: 3}, 0)
        .to($chapter, {x: 0, duration: 3}, 0)
        .to($rect, {opacity: 1, duration: 2});

      ScrollTrigger.create({
        animation: tlTitle,
        trigger: $title,
        start: 'top top',
        end: 'bottom 30%',
        scrub: 1,
        pin: true,
      });
    });


    // scroll h chapter 1

    gsap.to('.punchcutter__white--fill', {
      height: 1500,
      ease: 'none',
      scrollTrigger: {
        trigger: '.chapter1__content--punchcutter',
        start: 'top 30%',
        end: 'bottom 50%',
        scrub: 1
      },
    }),

    gsap.to('.chapter3__content--text', {
      y: - 100,
      ease: 'none',
      scrollTrigger: {
        trigger: '.chapter3',
        start: '50% 50%',
        end: '80% bottom',
        scrub: 1,
      },
    });

    gsap.to('.name-tags', {
      xPercent: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.chapter1__content',
        start: 'top 80%',
        end: '20% bottom',
        scrub: 1,
      }
    });

    // scroll trigers for mobile
  } else if (window.innerWidth < 768) {
    document.querySelectorAll('.chapter__title').forEach($title => {
      const $text = $title.querySelector('.chapter__title--text');
      const $chapter = $title.querySelector('.chapter__title--chapter');
      gsap.set($text, {x: - 400});
      gsap.set($chapter, {x: 200});
      const tlTitle = gsap.timeline();
      tlTitle.to($text, {x: 0, duration: 3}, 0)
        .to($chapter, {x: 0, duration: 3}, 0);

      ScrollTrigger.create({
        animation: tlTitle,
        trigger: $title,
        start: 'top 50%',
        end: 'bottom 80%',
        scrub: 1,
      });
    });
  }

  const tlSlanted = gsap.timeline({
    scrollTrigger: {
      trigger: '.slot__font',
      start: 'top 50%',
    }
  });

  tlSlanted.to('.slot__font--thisWeek', {duration: 0.5, opacity: 0, ease: 'power3.easeOut'}, 2)
    .to('.slot__font--thisWeek', {fontFamily: 'futura-pt, sans-serif'})
    .to('.slot__font--thisWeek', {duration: 0.5, opacity: 1, ease: 'power3.easeOut'});

};

const initAnimation = () => {

  // animation mouse
  const tlMouse = gsap.timeline({repeat: 3});
  tlMouse.to('.mouse', {y: - 40, duration: 1})
    .set('.mouse__dot', {fill: '#1dff00'}, 0.5)
    .set('.mouse__dot', {fill: 'none'}, 1)
    .to('.mouse', {y: 0, duration: 1}, 1);

  ScrollTrigger.create({
    animation: tlMouse,
    trigger: '.chapter2__content',
  });

};

const showPart1 = e => {
  e.preventDefault();
  $chapter2Part1.classList.remove('hidden');
  $chapter2Background.classList.remove('chapter2__background2');
  $chapter2Background.classList.remove('chapter2__background3');
  $chapter2Part2.classList.add('hidden');
  $chapter2Part3.classList.add('hidden');
  $chapter2Part0.classList.add('hidden');
  $dot1.style.fill = '#1dff00';
  $dot1.style.stroke = '#1dff00';
  $dot2.style.fill = 'none';
  $dot3.style.fill = 'none';
  $dot2.style.stroke = '#1dff00';
  $dot3.style.stroke = '#1dff00';
  $chapterCheck.classList.remove('chapter3__title');
};

const showPart2 = e => {
  e.preventDefault();
  $chapter2Part2.classList.remove('hidden');
  $chapter2Background.classList.add('chapter2__background2');
  $chapter2Background.classList.remove('chapter2__background3');
  $chapter2Part1.classList.add('hidden');
  $chapter2Part3.classList.add('hidden');
  $chapter2Part0.classList.add('hidden');
  $dot1.style.fill = 'none';
  $dot1.style.stroke = '#1dff00';
  $dot2.style.fill = '#1dff00';
  $dot2.style.stroke = '#1dff00';
  $dot3.style.fill = 'none';
  $dot3.style.stroke = '#1dff00';
  $chapterCheck.classList.remove('chapter3__title');
};

const showPart3 = e => {
  e.preventDefault();
  $chapter2Part3.classList.remove('hidden');
  $chapter2Background.classList.add('chapter2__background3');
  $chapter2Background.classList.remove('chapter2__background2');
  $chapter2Part1.classList.add('hidden');
  $chapter2Part2.classList.add('hidden');
  $chapter2Part0.classList.add('hidden');
  $dot1.style.fill = 'none';
  $dot1.style.stroke = '#fff';
  $dot2.style.fill = '#none';
  $dot2.style.stroke = '#fff';
  $dot3.style.fill = '#fff';
  $dot3.style.stroke = '#fff';
  $chapterCheck.classList.add('chapter3__title');
};

const closeNavigation = () => {
  document.querySelector('.menu__check').checked = false;
};


export const init = () => {
  console.log('start executing this JavaScript');
  resizeWindow();
  window.addEventListener('resize', resizeWindow);
  $header.style.position = 'fixed';

  $buttomLink1.addEventListener('click', showPart1);
  $buttomLink2.addEventListener('click', showPart2);
  $buttomLink3.addEventListener('click', showPart3);

  navigationItems.forEach($item => {
    $item.addEventListener('click', closeNavigation);
  });
  initAnimation();
  initScrollTrigger();
  getLetters();

};

