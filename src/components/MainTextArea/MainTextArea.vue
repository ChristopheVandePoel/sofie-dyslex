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
          fontSize: `${fontSize}px`,
          color: getColor(),
        }"
        v-html="currentValue"
        @focus="onFocus"
        @input="onInput"
      >
        <!-- This is where the text will come. Leave empty -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
import { colorMap } from '../../constants';
import { letterTransformMap } from '../../helpers';

const someFunction = (input, transforms) => {
  // console.log(input, transforms);
  const output = input.split('');

  const transform = output.map((letter, index) => {
    if (letter === '\n') {
      return '<br />';
    }

    let yay = {
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      rotate: 0,
    };
    if (letter === ' ') {
      return '<span>&nbsp</span>';
    }
    transforms.forEach(trans => {
      if (letterTransformMap[trans.key]) {
        yay = letterTransformMap[trans.key](letter, index, trans.value, yay);
      }
    });

    const style = `
    transform: translate(${yay.x}%,${yay.y}%)
    scale(${yay.scaleX},${yay.scaleY})
    rotate(${yay.rotate}deg);
    display: inline-block;
    `;

    return `<span style="${style}">${letter}</span>`;
  });
  // console.log(transform);
  return transform.join('');
};

const baseFontSize = {
  word: 350,
  sentence: 130,
  paragraph: 130,
};

export default {
  name: 'MainTextArea',
  computed: {
    ...mapState(['generalState', 'textField']),
    ...mapGetters(['getLetterTransforms']),
    fontSize() {
      return (baseFontSize[this.generalState.type] * this.generalState.size) / 100;
    },
    currentValue() {
      return someFunction(
        this.textField[this.generalState.type].transformed,
        this.getLetterTransforms,
        this.fontSize,
      );
    },
  },
  methods: {
    ...mapMutations(['setPause', 'setTextFields', 'updateField']),
    onFocus() {
      this.setPause();
    },
    onInput(event) {
      this.setTextFields(event.target.innerText);
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

span {
  background-color: #00ff00;
}

.space {
  width: 10px;
}
</style>
