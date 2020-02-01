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
  rotate: ((pi[index + 20] % 2 ? -1 : 1)) * ((force * 30) / 100) + Math.abs(current.rotate),
});

export const letterTransformMap = {
  hopping: hop,
  'free-tremble': freeTremble,
  trembling: tremble,
  'letters-backwards': backwards,
  'upside-down-letters': upsideDown,
  'letters-rotating': rotate,
  'free-rotation': freeRotate,
};
