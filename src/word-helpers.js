import {
  freeRotate, freeTremble, getRandom, hop, tremble,
} from './letter-helpers';

const lineSpace = (force, current) => ({
  ...current,
  lineHeight: 1 + force / 100,
});

const interspace = (letter, index, force, current) => ({
  ...current,
  marginRight: (getRandom(index, 1) * force) / 1500 + current.marginRight,
});

const weight = (force, current) => ({
  ...current,
  weight: force,
});

export const wordTransformMap = {
  'free-tremble': freeTremble,
  trembling: tremble,
  hopping: hop,
  tilting: freeRotate,
  interspace,
};

export const sentencesTransformMap = {
  'line-spacing': lineSpace,
  weight,
};
