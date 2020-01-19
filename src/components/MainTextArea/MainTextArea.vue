<template>
  <div class="top-container">
    <div
      class="text-field__main"
      :class="{
        seriffed: generalState.font === 'serif',
      }"
    >
      <div
        contenteditable
        id="main-text"
        class="textarea-container"
        :style="{
          textAlign: generalState.alignment,
          textTransform: generalState.letterCase === 'upper' ? 'uppercase' : 'none',
          fontSize: getFontSize(),
          color: getColor(),
        }"
        v-html="currentValue"
      >
        <!-- This is where the text will come. Leave empty -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { colorMap, pi } from '../../constants';

const letterTransformMap = {
  hopping: (letter, index, force) => `translateY(${(index + 1) % 2 ? '-' : ''}${pi[index] * force / 10}px)`,
  'free-tremble': (letter, index, force) => `translateX(${(index + 1) % 2 ? '' : '-'}${pi[index] * force / 20}px)`,
};

const someFunction = (input, transforms) => {
  console.log(input, transforms);
  const output = input.split('');

  const transform = output.map((letter, index) => {
    let transformation = '';
    transforms.forEach((trans) => {
      if (letterTransformMap[trans.key]) {
        transformation += letterTransformMap[trans.key](letter, index, trans.value);
      }
    });

    console.log(transformation);
    return `<span style="transform: ${transformation}; display: inline-block">${letter}</span>`;
  });
  console.log(transform);
  return transform.join('');
};

const baseFontSize = {
  word: 400,
  text: 120,
};

export default {
  name: 'MainTextArea',
  computed: {
    ...mapState(['generalState', 'textField']),
    ...mapGetters(['getLetterTransforms']),
    currentValue() {
      return someFunction(
        this.textField[this.generalState.type].transformed,
        this.getLetterTransforms,
      );
    },
  },
  methods: {
    getFontSize() {
      return `${(baseFontSize[this.generalState.type] * this.generalState.size) / 100}px`;
    },
    getColor() {
      return colorMap[this.generalState.color];
    },
  },
};
</script>
<style lang="scss" scoped>
.top-container {
  flex: 20 0;
  display: flex;
}

.text-field__main {
  width: 100%;
  position: relative;
  text-align: center;
  font-family: 'Helvetica', sans-serif;

  &.seriffed {
    font-family: 'Times New Roman', serif;
  }

  &.font-100 div {
    font-weight: 100;
  }
  &.font-200 div {
    font-weight: 200;
  }
  &.font-300 div {
    font-weight: 300;
  }
  &.font-400 div {
    font-weight: 400;
  }
  &.font-500 div {
    font-weight: 500;
  }
  &.font-600 div {
    font-weight: 600;
  }
}

.textarea-container {
  color: black;
  display: block;
  font-size: 280px;
  position: relative;
  top: 45%;
  transform: translateY(-50%);
  height: auto;

  &.input-text {
    font-size: 120px;
    width: 80%;
    margin: 0 auto;
  }

  &:focus {
    outline: none;
  }
}
</style>
