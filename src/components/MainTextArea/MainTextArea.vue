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
          lineHeight: `${containerData.lineHeight}`,
          letterSpacing: `${containerData.letterSpacing}px`
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
import { letterTransformMap } from '../../letter-helpers';
import { sentencesTransformMap, wordTransformMap } from '../../word-helpers';

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
      diphClass: '',
      swapClass: '',
    };
    if (letter === ' ') {
      return '<span>&nbsp</span>';
    }
    transforms.forEach(trans => {
      if (letterTransformMap[trans.key]) {
        yay = letterTransformMap[trans.key](
          letter,
          index,
          trans.value,
          yay,
          output[index - 1],
          output[index + 1],
        );
      }
    });

    const style = `transform: translate(${yay.x}%,${yay.y}%)
    scale(${yay.scaleX},${yay.scaleY})
    rotate(${yay.rotate}deg);
    display: inline-block;`;

    const extraClass = `${yay.diphClass} ${yay.swapClass} `;

    return `<span style="${style}" class="${extraClass}">${letter}</span>`;
  });
  // console.log(transform);
  return transform.join('');
};

const wordFunction = (input, letterTransforms, wordTransforms) => {
  const output = input.split(' ');

  let result = '';

  output.forEach((entry, index) => {
    let yay = {
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      rotate: 0,
      diphClass: '',
      swapClass: '',
    };

    wordTransforms.forEach(trans => {
      if (wordTransformMap[trans.key]) {
        yay = wordTransformMap[trans.key](
          entry,
          index,
          trans.value,
          yay,
          output[index - 1],
          output[index + 1],
        );
      }
    });

    const style = `transform: translate(${yay.x}%,${yay.y}%)
    scale(${yay.scaleX},${yay.scaleY})
    rotate(${yay.rotate}deg);
    display: inline-block;`;

    result += `<div class="word"  style="${style}">`;
    result += someFunction(entry, letterTransforms);
    result += '&nbsp;</div>';
  });

  return result;
};

const baseFontSize = {
  word: 350,
  sentence: 130,
  paragraph: 130,
};

export default {
  name: 'MainTextArea',
  data() {
    return {
      lineHeight: 0,
    };
  },
  computed: {
    ...mapState(['generalState', 'textField']),
    ...mapGetters(['getLetterTransforms', 'getWordTransforms', 'getSentencesTransforms']),
    fontSize() {
      return (baseFontSize[this.generalState.type] * this.generalState.size) / 100;
    },
    containerData() {
      let container = {
        lineHeight: 1,
        letterSpacing: 0,
      };
      if (this.getSentencesTransforms.length) {
        this.getSentencesTransforms.forEach(trans => {
          if (sentencesTransformMap[trans.key]) {
            container = sentencesTransformMap[trans.key](
              trans.value,
              container,
            );
          }
        });
      }
      return {
        ...container,
      };
    },
    currentValue() {
      if (this.generalState.type === 'word') {
        return someFunction(this.textField.word.transformed, this.getLetterTransforms);
      }
      return wordFunction(
        this.textField[this.generalState.type].transformed,
        this.getLetterTransforms,
        this.getWordTransforms,
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
<style lang="scss">
// swapping classes:
.swap-b,
.swap-d,
.swap-p,
.swap-q,
.swap-m,
.swap-w,
.swap-a,
.swap-e,
.swap-f,
.swap-v,
.aa2,
.aa1,
.ua1,
.ua2,
.uo1,
.uo2,
.ij1,
.ij2,
.ei1,
.ei2,
.ue1,
.ue2,
.iu1,
.iu2,
.ee1,
.ee2,
.eo1,
.eo2 {
  position: relative;
  color: transparent;
  z-index: 10;
  caret-color: black;

  &:after {
    position: absolute;
    color: initial;
    left: 0;
    pointer-events: none;
  }
}

// diphthongs:
.aa2,
.aa1 {
  &:after {
    content: 'a';
  }
}
.ua1:after {
  content: 'u';
}
.ua2:after {
  content: 'a';
}
.uo1:after {
  content: 'u';
}
.uo2:after {
  content: 'o';
}
.ij1:after {
  content: 'i';
}
.ij2:after {
  content: 'j';
}
.ei1:after {
  content: 'e';
}
.ei2:after {
  content: 'i';
}
.ue1:after {
  content: 'u';
}
.ue2:after {
  content: 'e';
}
.iu1:after {
  content: 'i';
}
.iu2:after {
  content: 'u';
}
.ee1:after {
  content: 'e';
}
.ee2:after {
  content: 'e';
}
.eo1:after {
  content: 'e';
}
.eo2:after {
  content: 'o';
}

// plain letters
.swap-b:after {
  content: 'd';
}
.swap-d:after {
  content: 'b';
}
.swap-p:after {
  content: 'q';
}
.swap-q:after {
  content: 'p';
}
.swap-m:after {
  content: 'w';
}
.swap-w:after {
  content: 'm';
}
.swap-a:after {
  content: 'e';
}
.swap-e:after {
  content: 'a';
}
.swap-f:after {
  content: 'v';
}
.swap-v:after {
  content: 'f';
}
div.word {
  display: inline-block;
}
</style>

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
