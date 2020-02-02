import { pi } from './constants';

export const getRandom = (index, seed = 0) => parseInt(pi[index + seed], 10) + 1;

export const hop = (letter, index, force, current) => ({
  ...current,
  y: ((getRandom(index) % 2 ? -1 : 1) * (getRandom(index, 1) * force)) / 20 + current.y,
});

export const tremble = (letter, index, force, current) => ({
  ...current,
  x:
    (((getRandom(index, 2) + Math.floor(force)) % 2 ? -1 : 1) * (getRandom(index, 4) * force)) / 100
    + current.x,
});

export const freeTremble = (letter, index, force, current) => {
  const amount = (((getRandom(index, 2) + Math.floor(force)) % 2 ? -1 : 1) * (getRandom(index, 4) * force)) / 100;
  return {
    ...current,
    y: amount + current.y,
    x: amount + current.x,
  };
};

const backwards = (letter, index, force, current) => ({
  ...current,
  scaleX: getRandom(index) * 10 + parseInt(force, 10) > 100 ? -1 : 1,
});

const upsideDown = (letter, index, force, current) => ({
  ...current,
  scaleY: parseInt(getRandom(index, 3), 10) * 10 + parseInt(force, 10) > 100 ? -1 : 1,
});

const rotate = (letter, index, force, current) => ({
  ...current,
  rotate: (current.rotate < 0 ? -1 : 1) * ((force * 30) / 100) + Math.abs(current.rotate),
});

export const freeRotate = (letter, index, force, current) => ({
  ...current,
  rotate: (getRandom(index, 20) % 2 ? -1 : 1) * ((force * 30) / 100) + Math.abs(current.rotate),
});

const diphtong = (letter, index, force, current, prev, next) => {
  // verander de volgorde hier voor belangrijkheid:
  const map = {
    aa: 'ee',
    ee: 'aa',
    au: 'ua',
    ou: 'uo',
    ei: 'ie',
    ij: 'ji',
    eu: 'ue',
    ui: 'iu',
    oe: 'eo',
  };

  const keys = Object.keys(map);
  const filteredMap = keys.slice(0, Math.ceil((force * keys.length) / 100) + 1);

  let diphClass = '';
  if (filteredMap.includes(letter + next)) {
    diphClass = map[letter + next] + 1;
  } else if (filteredMap.includes(prev + letter)) {
    diphClass = map[prev + letter] + 2;
  }

  // we geven deze prioriteit over gewone swaps
  return {
    ...current,
    diphClass,
    swapClass: diphClass ? '' : current.swapClass,
  };
};

const swapping = (letter, index, force, current) => {
  const swappers = ['b', 'd', 'p', 'q', 'm', 'w', 'a', 'e', 'f', 'v'];
  let swapClass = '';
  const filteredMap = swappers.slice(0, Math.ceil((force * swappers.length) / 100) + 1);

  if (filteredMap.includes(letter)) {
    swapClass = `swap-${letter}`;
  }

  return {
    ...current,
    swapClass,
  };
};

export const letterTransformMap = {
  hopping: hop,
  'free-tremble': freeTremble,
  trembling: tremble,
  'letters-backwards': backwards,
  'upside-down-letters': upsideDown,
  'letters-rotating': rotate,
  'free-rotation': freeRotate,
  'letters-diphtong': diphtong,
  'letters-swapping': swapping,
};
