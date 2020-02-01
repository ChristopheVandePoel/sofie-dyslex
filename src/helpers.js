import { pi } from './constants';

const hop = (letter, index, force, current) => ({
  ...current,
  y: ((pi[index] % 2 ? -1 : 1) * (pi[index + 1] * force)) / 20 + current.y,
});

const tremble = (letter, index, force, current) => ({
  ...current,
  x:
    (((pi[index + 2] + Math.floor(force)) % 2 ? -1 : 1) * (pi[index + 4] * force)) / 200
    + current.x,
});

const freeTremble = (letter, index, force, current) => {
  const amount = (((pi[index + 2] + Math.floor(force)) % 2 ? -1 : 1) * (pi[index + 4] * force)) / 200;
  return {
    ...current,
    y: amount + current.y,
    x: amount + current.x,
  };
};

const backwards = (letter, index, force, current) => ({
  ...current,
  scaleX: parseInt(pi[index], 10) * 10 + parseInt(force, 10) > 100 ? -1 : 1,
});

const upsideDown = (letter, index, force, current) => ({
  ...current,
  scaleY: parseInt(pi[index + 3], 10) * 10 + parseInt(force, 10) > 100 ? -1 : 1,
});

const rotate = (letter, index, force, current) => ({
  ...current,
  rotate: (current.rotate < 0 ? -1 : 1) * ((force * 30) / 100) + Math.abs(current.rotate),
});

const freeRotate = (letter, index, force, current) => ({
  ...current,
  rotate: (pi[index + 20] % 2 ? -1 : 1) * ((force * 30) / 100) + Math.abs(current.rotate),
});

const diphtong = (letter, index, force, current, prev, next) => {
  // verander de volgorde hier voor belangrijkheid:
  const map = {
    au: 'ua',
    ou: 'uo',
    ei: 'ij',
    ij: 'ei',
    eu: 'ue',
    ui: 'iu',
    aa: 'ee',
    ee: 'aa',
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
