import {
  freeRotate, freeTremble, hop, tremble,
} from './letter-helpers';

const lineSpace = (force, current) => ({
  ...current,
  lineHeight: 1 + force / 100,
});

const letterSpace = (force, current) => ({
  ...current,
  letterSpacing: force / 10,
});

export const wordTransformMap = {
  'free-tremble': freeTremble,
  trembling: tremble,
  hopping: hop,
  tilting: freeRotate,
};

export const sentencesTransformMap = {
  'line-spacing': lineSpace,
  tracking: letterSpace,
};
