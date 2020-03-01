import { pi } from './constants';

export const getRandom = (index, seed = 0) => parseInt(pi[index + seed], 10) + 1;

export const hop = (letter, index, force, current, prev, next, tick) => ({
  ...current,
  y: ((getRandom(index + tick) % 2 ? -1 : 1) * (getRandom(index, tick) * force)) / 20 + current.y,
});

export const tremble = (letter, index, force, current, prev, next, tick) => ({
  ...current,
  x:
    (((getRandom(index, tick) + Math.floor(force)) % 2 ? -1 : 1)
      * (getRandom(index, tick + 2) * force))
      / 100
    + current.x,
});

export const freeTremble = (letter, index, force, current, prev, next, tick) => {
  const amount = (((getRandom(index, tick) + Math.floor(force)) % 2 ? -1 : 1)
      * (getRandom(index, tick + 2) * force))
    / 100;
  return {
    ...current,
    y: amount + current.y,
    x: amount + current.x,
  };
};

const backwards = (letter, index, force, current, prev, next, tick) => ({
  ...current,
  scaleX: getRandom(index, tick) * 10 + parseInt(force, 10) > 100 ? -1 : 1,
});

const upsideDown = (letter, index, force, current, prev, next, tick) => ({
  ...current,
  scaleY: parseInt(getRandom(index, tick), 10) * 10 + parseInt(force, 10) > 100 ? -1 : 1,
});

const multiply = (letter, index, force, current, prev, next, tick) => ({
  ...current,
  multiClass:
    parseInt(getRandom(index, tick), 10) * 10 + parseInt(force, 10) > 100
      ? `${letter}${letter}${letter}`
      : '',
});

export const freeRotate = (letter, index, force, current, prev, next, tick) => ({
  ...current,
  rotate:
    (getRandom(index, tick) % 2 ? -1 : 1) * ((getRandom(index + tick) * force * 30) / 1000)
    + Math.abs(current.rotate),
});

const decrease = (letter, index, force, current, prev, next, tick) => {
  if (letter === next) {
    return {
      ...current,
      removeClass:
        parseInt(getRandom(index, tick), 10) * 10 + parseInt(force, 10) > 100
          ? `${letter}${letter}1`
          : '',
    };
  }
  return current;
};

const pronoun = (letter, index, force, current, prev, next, tick, length, swapper, count) => {
  if (!current.pronounType) {
    return current;
  }

  const transform = (getRandom(count + 1) * force) > 350;

  if (!transform) {
    return {
      ...current,
      pronounClass: '',
    };
  }

  if (current.pronounType === 'isA') {
    return {
      ...current,
      pronounClass: 'isA',
    };
  }

  if (current.pronounType === 'isAn' && index === 1) {
    return {
      ...current,
      pronounClass: 'isAn',
    };
  }

  return current;
};

const diphtong = (letter, index, force, current, prev, next) => {
  // verander de volgorde hier voor belangrijkheid:
  const map = {
    aa: 'ee',
    ee: 'aa',
    au: 'ua',
    ou: 'uo',
    ei: 'ie',
    ie: 'ei',
    ij: 'ji',
    eu: 'ue',
    ui: 'iu',
    iu: 'ui',
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

const swapLong = (letter, index, force, current, prev, next, tick, length, swapper) => {
  let chance = 0;

  if (index >= length / 2) {
    chance = 2 - (index + 1) / (length / 2);
  } else {
    chance = index / (length / 2);
  }

  if (chance === 0) {
    return {
      ...current,
      setClass: '',
    };
  }

  return {
    ...current,
    setClass: force * length * (1 - chance) > 250 ? `set-${swapper.toLowerCase()}` : '',
  };
};

const freeLetters = (letter, index, force, current, prev, next, tick) => ({
  ...current,
  letterSpace: (getRandom(index, tick) * force) / 1500 + current.letterSpace,
});

const height = (letter, index, force, current) => ({
  ...current,
  scaleY: (current.scaleY || 1) * (1 + force / 150),
});

const width = (letter, index, force, current) => ({
  ...current,
  scaleX: (current.scaleX || 1) * (1 + force / 250),
});

const letterSpace = (letter, index, force, current) => ({
  ...current,
  letterSpace: force / 1000 + current.letterSpace,
});

export const letterTransformMap = {
  hopping: hop,
  'free-tremble': freeTremble,
  trembling: tremble,
  'letters-backwards': backwards,
  'upside-down-letters': upsideDown,
  rotation: freeRotate,
  'letters-diphtong': diphtong,
  'letters-swapping': swapping,
  'free-tracking': freeLetters,
  height,
  multiply,
  width,
  decrease,
  tracking: letterSpace,
  shifting: swapLong,
  pronoun,
};
