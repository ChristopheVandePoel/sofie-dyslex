<template>
  <div class="top-container">
    <div
      class="text-field__main"
      :class="{
        seriffed: generalState.font === 'serif',
        monospace: generalState.font === 'monospace',
        bold: generalState.weight === 'bold',
        italic: generalState.weight === 'italic',
      }"
    >
      <div
        ref="editableField"
        contenteditable
        id="main-text"
        class="textarea-container"
        :style="{
          textAlign: generalState.alignment,
          textTransform: generalState.letterCase === 'upper' ? 'uppercase' : 'none',
          fontSize: `${fontSize}px`,
          color: getColor(),
          lineHeight: `${containerData.lineHeight}`,
          letterSpacing: `${containerData.letterSpacing}20px`,
          fontWeight: containerData.weight,
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
    let yay = {
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      rotate: 0,
      diphClass: '',
      swapClass: '',
      letterSpace: 0,
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
          trans.tick,
        );
      }
    });

    const style = `transform: translate(${yay.x}%,${yay.y}%)
    scale(${yay.scaleX},${yay.scaleY})
    rotate(${yay.rotate}deg);
    display: inline-block;
    letter-spacing: ${yay.letterSpace}em`;

    const extraClass = `${yay.diphClass} ${yay.swapClass} `;

    let result = letter;

    if (yay.diphClass || yay.swapClass) {
      result = `<span class="conv">${letter}</span>`;
    }

    return `<span style="${style}" class="${extraClass}">${result}</span>`;
  });
  // console.log(transform);
  return transform.join('');
};

const wordFunction = (input, letterTransforms, wordTransforms) => {
  const output = input.split(/\s/);

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
      marginRight: 0,
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
          trans.tick,
        );
      }
    });

    const style = `transform: translate(${yay.x}%,${yay.y}%)
    scale(${yay.scaleX},${yay.scaleY})
    rotate(${yay.rotate}deg);
    display: inline-block;
    margin-right: ${yay.marginRight}em`;

    result += `<div class="word" style="${style}">`;
    result += someFunction(entry, letterTransforms);
    result += `${index >= output.length - 1 ? '' : '&nbsp;'}</div>`;
  });

  return result;
};

const sentenceFunction = (input, letterTransforms, wordTransforms) => {
  const output = input.split(/\n/);

  const transform = output.map(entry => wordFunction(
    entry,
    letterTransforms,
    wordTransforms,
  ));
  return transform.join('<br />');
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
      cursorTimer: null,
    };
  },
  computed: {
    ...mapState(['generalState', 'textField', 'isPlaying', 'tickCounter']),
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
            container = sentencesTransformMap[trans.key](trans.value, container);
          }
        });
      }
      return {
        ...container,
      };
    },
    currentValue() {
      if (this.generalState.type === 'word') {
        return someFunction(this.textField.input.transformed, this.getLetterTransforms);
      }
      if (this.generalState.type === 'sentence') {
        return wordFunction(
          this.textField.input.transformed,
          this.getLetterTransforms,
          this.getWordTransforms,
        );
      }
      return sentenceFunction(
        this.textField.input.transformed,
        this.getLetterTransforms,
        this.getWordTransforms,
      );
    },
  },
  mounted() {
    this.setCaret();
  },
  methods: {
    ...mapMutations(['setPause', 'setTextFields', 'updateField', 'switchBySentences']),
    onFocus() {
      this.setPause();
    },
    onInput(event) {
      const hasLineBreaks = event.target.innerText.trim(/\s+/).match(/\n/);
      const hasSpaces = event.target.innerText.trim(/\s+/).match(/\s+/);

      if (this.generalState.type !== 'paragraph' && hasLineBreaks) {
        this.switchBySentences({ toValue: 'sentences', text: event.target.innerText });
      } else if (!hasLineBreaks && this.generalState.type !== 'sentence' && hasSpaces) {
        this.switchBySentences({ toValue: 'words', text: event.target.innerText });
      } else if (!hasSpaces && !hasLineBreaks && this.generalState.type !== 'word') {
        this.switchBySentences({ toValue: 'letters', text: event.target.innerText });
      } else {
        this.setTextFields(event.target.innerText);
      }
    },
    getColor() {
      return colorMap[this.generalState.color];
    },
    setCaret() {
      if (!this.isPlaying) {
        // dit is mss te zwaar, maar het werkt atm.
        if (this.cursorTimer !== null) {
          clearTimeout(this.cursorTimer);
        }

        this.cursorTimer = setTimeout(() => {
          const p = this.$refs.editableField;
          const s = window.getSelection();
          const r = document.createRange();

          r.setStart(p, p.childElementCount);
          r.setEnd(p, p.childElementCount);
          s.removeAllRanges();
          s.addRange(r);
        }, 1);
      }
    },
  },
  watch: {
    currentValue() {
      this.setCaret();
    },
  },
};
</script>
<style lang="scss">
body {
  caret-color: black !important;
  .dark-mode {
    caret-color: whitesmoke !important;
  }
}

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
.ji1,
.ji2,
.ie1,
.ie2,
.ue1,
.ue2,
.iu1,
.iu2,
.ee1,
.ee2,
.eo1,
.eo2 {
  position: relative;

  span.conv {
    color: transparent;
    display: inline-block;
  }

  &:after {
    position: absolute;
    left: 0;
    text-align: left;
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
.ue1:after {
  content: 'u';
}
.ue2:after {
  content: 'e';
}

.ji1:after {
  content: 'j';
}
.ji2:after {
  content: 'i';
}
.ie1:after {
  content: 'i';
}
.ie2:after {
  content: 'e';
}

.iu1:after {
  content: 'i';
}

.iu2:after {
  content: 'u';
}

// font & letter-specific widths:

.iu1,
.ie1 {
  span.conv {
    letter-spacing: -0.35em;
  }
}

.iu2,
.ie2 {
  span.conv {
    letter-spacing: 0.35em;
  }
}

.seriffed {
  .iu1 {
    span.conv {
      letter-spacing: -0.25em;
    }
  }
  .ie1 {
    span.conv {
      letter-spacing: -0.18em;
    }
  }

  .iu2 {
    span.conv {
      letter-spacing: 0.25em;
    }
  }
  .ie2 {
    span.conv {
      letter-spacing: 0.18em;
    }
  }
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
  left: -5px;
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

.monospace {
  span.conv {
    letter-spacing: 0 !important;
  }
}
</style>

<style lang="scss" scoped>
.top-container {
  padding: 40px;
  flex: 20 0;
  display: flex;
}

.text-field__main {
  width: 100%;
  position: relative;
  text-align: center;
  font-family: 'Suisse Intl', sans-serif;

  &.seriffed {
    font-family: 'Suisse Works', serif;
  }

  &.monospace {
    font-family: 'Suisse Intl Mono', monospace;
  }

  &.bold {
    font-weight: 600;
  }

  &.italic {
    font-style: italic;
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
