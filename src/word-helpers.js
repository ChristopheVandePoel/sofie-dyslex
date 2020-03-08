import {
  freeRotate, freeTremble, hop, tremble,
} from './letter-helpers';

const lineSpace = (force, current) => ({
  ...current,
  lineHeight: 1 + force / 150,
});

const interspace = (letter, index, force, current, prev, next, tick, font) => {
  const power = font === 'monospace' ? 150 : 400;

  return {
    ...current,
    marginRight: ((force) / power) + current.marginRight,
  };
};

export const wordTransformMap = {
  'free-tremble': freeTremble,
  trembling: tremble,
  hopping: hop,
  tilting: freeRotate,
  interspace,
};

export const sentencesTransformMap = {
  'line-spacing': lineSpace,
};
