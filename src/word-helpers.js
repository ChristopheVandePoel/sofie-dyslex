import {
  freeRotate, freeTremble, hop, tremble,
} from './letter-helpers';

export const wordTransformMap = {
  'free-tremble': freeTremble,
  trembling: tremble,
  hopping: hop,
  tilting: freeRotate,
};
