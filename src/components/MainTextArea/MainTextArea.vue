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
        contenteditable="true"
        id="main-text"
        class="textarea-container"
        :style="{
          textAlign: generalState.alignment,
          textTransform: generalState.letterCase === 'upper' ? 'uppercase' : 'none',
          fontSize: `${fontSize}px`,
          color: getColor(),
          lineHeight: `${generalState.type === 'paragraph' ? containerData.lineHeight : 1}`,
          letterSpacing: `${containerData.letterSpacing}px`,
        }"
        spellcheck="false"
        v-html="currentValue"
        @focus="onFocus"
        @input="onInput"
        @click="saveSelection"
        @keyup="saveSelection"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
import { colorMap } from '../../constants';
import { letterTransformMap } from '../../letter-helpers';
import { sentencesTransformMap, wordTransformMap } from '../../word-helpers';

const someFunction = (input, transforms, count) => {
  const output = input.split('');
  const { length } = input;

  let articleType = '';
  const pronounType = {
    that: 'isThat',
    this: 'isThis',
    those: 'isThose',
    these: 'isThese',
    who: 'isWho',
    whom: 'isWhom',
  }[input] || '';

  if (input === 'a') {
    articleType = 'isA';
  } else if (input === 'an') {
    articleType = 'isAn';
  }


  const transform = output.map((letter, index) => {
    let yay = {
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      rotate: 0,
      diphClass: '',
      swapClass: '',
      setClass: '',
      letterSpace: 0,
      multiClass: '',
      removeClass: '',
      articleClass: '',
      articleType,
      pronounClass: '',
      pronounType,
      weight: 'inherit',
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
          length,
          input[length - index - 1],
          count,
        );
      }
    });

    const style = `transform: translate(${yay.x}%,${yay.y}%)
    scale(${yay.scaleX},${yay.scaleY})
    rotate(${yay.rotate}deg);
    display: inline-block;
    min-width: 1px;
    letter-spacing: ${yay.letterSpace}em;
    font-weight: ${yay.weight};
    `;

    const extraClass = `${yay.diphClass} ${yay.swapClass} ${yay.setClass} ${yay.multiClass}
    ${yay.removeClass} ${yay.articleClass} ${yay.pronounClass}`;

    let result = letter;

    if (
      yay.diphClass
      || yay.swapClass
      || yay.setClass
      || yay.multiClass
      || yay.removeClass
      || yay.articleClass
      || yay.pronounClass
    ) {
      result = `<span class="conv">${letter}</span>`;
    }

    return `<span style="${style}" class="${extraClass}">${result}</span>`;
  });

  return transform.join('');
};

const wordFunction = (input, letterTransforms, wordTransforms, genState) => {
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
          genState.font,
        );
      }
    });

    const style = `transform: translate(${yay.x}%,${yay.y}%)
    scale(${yay.scaleX},${yay.scaleY})
    rotate(${yay.rotate}deg);
    display: inline-block;
    margin-right: ${yay.marginRight}em`;

    result += `<div class="word" style="${style}">`;
    result += someFunction(entry, letterTransforms, index);
    result += `${index >= output.length - 1 ? '' : '&nbsp;'}</div>`;
  });

  return result;
};

const sentenceFunction = (input, letterTransforms, wordTransforms, genState) => {
  const output = input.split(/\n/);

  let transform = output.map(entry =>
    (entry && entry.length ? `<div>${wordFunction(entry, letterTransforms, wordTransforms, genState)}</div>` : null));

  console.log(transform, transform[0] === null, transform[0], transform[1] === null, transform[1]);
  if (!input || (transform[0] === null && transform[1] === null)) {
    transform = [
      '<div class="word"><span class="emptyLetter" style="min-width: 10px; display: inline-block"></span></div>',
    ];
  }

  return transform.join('');
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
      sentences: ['This website simulates symptoms of dyslexia.', 'Type here'],
      sentence: [],
      i: 0,
      char: 0,
      initialDelay: 2000,
      secondDelay: 600,
      speed: 120,
      highlightSpeed: 14,
    };
  },
  computed: {
    ...mapState([
      'generalState',
      'pausedInitialAnimation',
      'textField',
      'isPlaying',
      'tickCounter',
      'caretPosition',
    ]),
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
      return sentenceFunction(
        this.textField.input.transformed,
        this.getLetterTransforms,
        this.getWordTransforms,
        this.generalState,
      );
    },
  },
  mounted() {
    this.setSelectionPosition(this.$refs.editableField, this.caretPosition);
    this.startAnimation();
  },
  methods: {
    ...mapMutations([
      'setPause',
      'setTextFields',
      'updateField',
      'switchBySentences',
      'storeSelection',
    ]),
    onFocus() {
      this.saveSelection();
      this.$nextTick(() => this.setPause());
    },
    onInput(event) {
      const text = event.target.innerText;

      let isProbablyTwoLines = true;
      // 1.1 is the safari-is-a-pos factor.
      if (event.target.firstChild) {
        isProbablyTwoLines = text.trim(/\s+/).match(/\n/)
          || (event.target.offsetHeight / parseFloat(event.target.style.lineHeight))
            > parseFloat(window.getComputedStyle(event.target.firstChild).fontSize) * 1.1;
      }


      if (event.inputType === 'insertParagraph') {
        this.switchBySentences({ toValue: 'sentences' });
      } else {
        this.saveSelection();
        this.shiftForText(text, isProbablyTwoLines);
      }
    },
    shiftForText(text, hasLineBreaks) {
      const hasSpaces = text.trim(/\s+/).match(/\s+/);

      if (this.generalState.type !== 'paragraph' && hasLineBreaks) {
        this.switchBySentences({ toValue: 'sentences', text });
      } else if (!hasLineBreaks && this.generalState.type !== 'sentence' && hasSpaces) {
        this.switchBySentences({ toValue: 'words', text });
      } else if (!hasSpaces && !hasLineBreaks && this.generalState.type !== 'word') {
        this.switchBySentences({ toValue: 'letters', text });
      } else {
        this.setTextFields(text);
      }
    },
    saveSelection() {
      this.storeSelection(this.getSelectionPosition(this.$refs.editableField));
    },
    getSelectionPosition(el) {
      if (el.isContentEditable) {
        try {
          el.focus();
          const selection = window.getSelection();
          if (selection.rangeCount > 0) {
            const originalRange = selection.getRangeAt(0);
            const range = originalRange.cloneRange();
            range.selectNodeContents(el);
            range.setEnd(originalRange.endContainer, originalRange.endOffset);
            return range.toString().length;
          }
        } catch (e) {
          console.log(e);
          return el.selectionStart;
        }
      }
      return el.selectionStart;
    },
    setSelectionPosition() {
      if (this.caretPosition === 9999 || this.caretPosition === '9999') {
        this.placeCaretAtEnd();
        this.saveSelection();
      } else {
        try {
          const words = this.$refs.editableField.getElementsByClassName('word');

          if (!words.length) {
            document.getSelection().collapse(this.$refs.editableField, this.caretPosition);
          } else {
            let position = 0;

            /* eslint-disable-next-line no-restricted-syntax */
            for (const word of words) {
              if (word.textContent.length + position >= this.caretPosition) {
                document.getSelection().collapse(word, this.caretPosition - position);
                break;
              } else {
                position += word.textContent.length;
              }
            }
          }
        } catch (e) {
          console.warn('no selection possible on this location: ', this.caretPosition);
          this.placeCaretAtEnd();
          this.saveSelection();
        }
      }
      this.$refs.editableField.focus();
    },
    getColor() {
      return colorMap[this.generalState.color];
    },
    startAnimation() {
      this.sentence = this.getSentenceArray(this.sentences[0]);
      this.loopSentences();
    },
    getSentenceArray(str) {
      // let sentence = str.replace('<br/>', '{}<br/>{}');
      const sentence = str.split('{}');
      // sentence = sentence.map(el => (el === '<br/>' ? el : el.split('')));
      return [...sentence[0]];
    },
    loopSentences() {
      if (this.pausedInitialAnimation) {
        this.$refs.editableField.focus();
        this.placeCaretAtEnd();
        this.saveSelection();
        return false;
      }

      if (this.i === 0) {
        this.insertText(`<span>${this.sentence.join('</span><span>')}</span>`);
        this.$nextTick(() => {
          this.placeCaretAtEnd();
          this.i++;
          this.char = this.sentence.length;
          setTimeout(() => {
            this.loopSentences();
          }, this.initialDelay);
        });
      } else if (this.i === 1) {
        this.$refs.editableField.focus();
        setTimeout(() => {
          document.execCommand('selectAll', false, null);
          this.i++;
          setTimeout(() => {
            this.loopSentences();
          }, this.secondDelay);
        }, 100);
      } else if (this.i === 2) {
        this.insertText('');
        this.$refs.editableField.focus();

        this.i++;
        this.char = 0;
        this.sentence = this.getSentenceArray(this.sentences[1]);
        setTimeout(() => {
          this.loopSentences();
        }, this.secondDelay);
      } else if (this.i === 3) {
        this.insertText(`<span>${this.sentence.slice(0, this.char).join('</span><span>')}</span>`);
        this.char++;
        if (this.char > this.sentence.length) {
          this.$nextTick(() => {
            this.$refs.editableField.focus();
            this.placeCaretAtEnd();
          });
          return false;
        }
        setTimeout(() => {
          this.loopSentences();
        }, this.speed);
      }
      return false;
    },
    insertText(_html) {
      this.$refs.editableField.blur();
      this.$refs.editableField.innerHTML = _html;
      this.$refs.editableField.dispatchEvent(new Event('input'));
    },
    placeCaretAtEnd() {
      const el = this.$refs.editableField;
      let range;
      let selection;
      if (document.createRange) {
        range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
    },
  },
  watch: {
    isPlaying(newValue, old) {
      if (!newValue && old !== newValue) {
        this.setSelectionPosition();
      }
    },
    currentValue() {
      this.$nextTick(() => {
        if (this.caretPosition === 9999 || !this.isPlaying) {
          this.setSelectionPosition();
        }
      });
    },
  },
};
</script>
<style lang="scss">
body {
  caret-color: black !important;
  .dark-mode {
    caret-color: whitesmoke !important;
    .highlighted {
      background: red;
    }
  }
  .highlighted {
    background: #ddd;
  }
}

// Ok, so here is what happens. Because we want to be able to type in the field that we transform,
// we cannot transform the text directly (because then we cannot revert to the original,
// as it is lost). So we need to do it all by css.
// That's why we have created these huge definitions, that are swapped in and out of existence
// on letters.
// swapping classes:
.set-a,
.set-b,
.set-c,
.set-d,
.set-e,
.set-f,
.set-g,
.set-h,
.set-i,
.set-j,
.set-k,
.set-l,
.set-m,
.set-n,
.set-o,
.set-p,
.set-q,
.set-r,
.set-s,
.set-t,
.set-u,
.set-v,
.set-w,
.set-x,
.set-y,
.set-z,
.aaa,
.bbb,
.ccc,
.ddd,
.eee,
.fff,
.ggg,
.hhh,
.iii,
.jjj,
.kkk,
.lll,
.mmm,
.nnn,
.ooo,
.ppp,
.qqq,
.rrr,
.sss,
.ttt,
.uuu,
.vvv,
.www,
.xxx,
.yyy,
.zzz,
.aa1,
.bb1,
.cc1,
.dd1,
.ee1,
.ff1,
.gg1,
.hh1,
.ii1,
.jj1,
.kk1,
.ll1,
.mm1,
.nn1,
.oo1,
.pp1,
.qq1,
.rr1,
.ss1,
.tt1,
.uu1,
.vv1,
.ww1,
.xx1,
.yy1,
.zz1,
.isA,
.isAn,
.isWhom-4,
.isWho-3,
.isThat-3,
.isThat-4,
.isThis-3,
.isThis-4,
.isThose-3,
.isThese-3 {
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

.isA:after {
  content: 'an';
}

.isWhom-4:after {
  content: '';
}
.isWho-3:after {
  content: 'om';
}

.isWho-3, {
  .conv {
    width: 1.5em;
  }
}

.seriffed {
  .isThese-3, {
    .conv {
      width: 0.62em;
    }
  }
}

.isA {
  .conv {
    width: 1.15em;
  }
}

// font & letter-specific widths:
.isThis-3,
.isThose-3,
.set-a,
.set-b,
.set-d,
.set-e,
.set-g,
.set-h {
  .conv {
    width: 0.555em;
  }
}

.aaa,
.bbb,
.ddd,
.eee,
.ggg,
.hhh {
  .conv {
    width: 1.11em;
  }
}

.set-c, {
  .conv {
    width: 0.5em;
  }
}

.ccc {
  .conv {
    width: 1em;
  }
}

.set-f {
  .conv {
    width: 0.278em;
  }
}

.fff {
  .conv {
    width: 0.556em;
  }
}

.isThat-3,
.set-i,
.set-j {
  .conv {
    width: 0.223em;
  }
}

.iii,
.jjj {
  .conv {
    width: 0.446em;
  }
}

.set-k {
  .conv {
    width: 0.5em;
  }
}

.kkk {
  .conv {
    width: 1em;
  }
}

.set-l {
  .conv {
    width: 0.223em;
  }
}

.lll {
  .conv {
    width: 0.446em;
  }
}

.set-m {
  .conv {
    width: 0.83em;
  }
}

.mmm {
  .conv {
    width: 1.66em;
  }
}

.set-n {
  .conv {
    width: 0.555em;
  }
}

.nnn {
  .conv {
    width: 1.11em;
  }
}

.isThese-3,
.set-o {
  .conv {
    width: 0.555em;
  }
}

.ooo {
  .conv {
    width: 1.11em;
  }
}

.set-p {
  .conv {
    width: 0.555em;
  }
}

.ppp {
  .conv {
    width: 1.11em;
  }
}

.set-q {
  .conv {
    width: 0.555em;
  }
}

.qqq {
  .conv {
    width: 1.11em;
  }
}

.set-r {
  .conv {
    width: 0.333em;
  }
}

.rrr {
  .conv {
    width: 0.666em;
  }
}

.isThat-4,
.set-s {
  .conv {
    width: 0.5em;
  }
}

.sss {
  .conv {
    width: 1em;
  }
}

.isThis-4,
.set-t {
  .conv {
    width: 0.279em;
  }
}

.ttt {
  .conv {
    width: 0.558em;
  }
}

.set-u {
  .conv {
    width: 0.555em;
  }
}

.uuu {
  .conv {
    width: 1.1em;
  }
}

.set-v {
  .conv {
    width: 0.5em;
  }
}

.vvv {
  .conv {
    width: 1em;
  }
}

.set-w {
  .conv {
    width: 0.723em;
  }
}

.www {
  .conv {
    width: 1.446em;
  }
}

.set-x {
  .conv {
    width: 0.5em;
  }
}

.xxx {
  .conv {
    width: 1em;
  }
}

.set-y {
  .conv {
    width: 0.5em;
  }
}

.yyy {
  .conv {
    width: 1em;
  }
}

.set-z {
  .conv {
    width: 0.5em;
  }
}

.zzz {
  .conv {
    width: 1em;
  }
}

.isAn,
.isWhom-4,
.aa1,
.bb1,
.cc1,
.dd1,
.ee1,
.ff1,
.gg1,
.hh1,
.ii1,
.jj1,
.kk1,
.ll1,
.mm1,
.nn1,
.oo1,
.pp1,
.qq1,
.rr1,
.ss1,
.tt1,
.uu1,
.vv1,
.ww1,
.xx1,
.yy1,
.zz1 {
  .conv {
    width: 0;
  }
}

.seriffed {
  .isThis-3,
  .set-c,
  .set-a {
    .conv {
      width: 0.445em;
    }
  }

  .set-b,
  .set-d {
    .conv {
      width: 0.5em;
    }
  }

  .isThose-3,
  .set-e {
    .conv {
      width: 0.445em;
    }
  }

  .set-f {
    .conv {
      width: 0.335em;
    }
  }

  .set-g {
    .conv {
      width: 0.5em;
    }
  }

  .set-h {
    .conv {
      width: 0.5em;
    }
  }

  .isThat-3,
  .set-i {
    .conv {
      width: 0.278em;
    }
  }

  .set-j {
    .conv {
      width: 0.278em;
    }
  }

  .set-k {
    .conv {
      width: 0.5em;
    }
  }

  .set-l {
    .conv {
      width: 0.278em;
    }
  }

  .set-m {
    .conv {
      width: 0.78em;
    }
  }

  .set-n {
    .conv {
      width: 0.5em;
    }
  }
  .isThese-3,
  .set-o {
    .conv {
      width: 0.5em;
    }
  }

  .set-p {
    .conv {
      width: 0.5em;
    }
  }

  .set-q {
    .conv {
      width: 0.5em;
    }
  }

  .set-r {
    .conv {
      width: 0.333em;
    }
  }

  .isThat-4,
  .set-s {
    .conv {
      width: 0.39em;
    }
  }

  .isThis-4,
  .set-t {
    .conv {
      width: 0.279em;
    }
  }

  .set-u {
    .conv {
      width: 0.5em;
    }
  }

  .set-v {
    .conv {
      width: 0.5em;
    }
  }

  .set-w {
    .conv {
      width: 0.723em;
    }
  }

  .set-x {
    .conv {
      width: 0.5em;
    }
  }

  .set-y {
    .conv {
      width: 0.5em;
    }
  }

  .set-z {
    .conv {
      width: 0.445em;
    }
  }

  .ccc,
  .aaa {
    .conv {
      width: 2 * 0.445em;
    }
  }

  .bbb,
  .ddd {
    .conv {
      width: 2 * 0.5em;
    }
  }

  .eee {
    .conv {
      width: 2 * 0.445em;
    }
  }

  .fff {
    .conv {
      width: 2 * 0.335em;
    }
  }

  .ggg {
    .conv {
      width: 2 * 0.5em;
    }
  }

  .hhh {
    .conv {
      width: 2 * 0.5em;
    }
  }

  .iii {
    .conv {
      width: 2 * 0.278em;
    }
  }

  .jjj {
    .conv {
      width: 2 * 0.278em;
    }
  }

  .kkk {
    .conv {
      width: 2 * 0.5em;
    }
  }

  .lll {
    .conv {
      width: 2 * 0.278em;
    }
  }

  .mmm {
    .conv {
      width: 2 * 0.78em;
    }
  }

  .nnn {
    .conv {
      width: 2 * 0.5em;
    }
  }

  .ooo {
    .conv {
      width: 2 * 0.5em;
    }
  }

  .ppp {
    .conv {
      width: 2 * 0.5em;
    }
  }

  .qqq {
    .conv {
      width: 2 * 0.5em;
    }
  }

  .rrr {
    .conv {
      width: 2 * 0.333em;
    }
  }

  .sss {
    .conv {
      width: 2 * 0.39em;
    }
  }

  .ttt {
    .conv {
      width: 2 * 0.279em;
    }
  }

  .uuu {
    .conv {
      width: 2 * 0.5em;
    }
  }

  .vvv {
    .conv {
      width: 2 * 0.5em;
    }
  }

  .www {
    .conv {
      width: 2 * 0.723em;
    }
  }

  .xxx {
    .conv {
      width: 2 * 0.5em;
    }
  }

  .yyy {
    .conv {
      width: 2 * 0.5em;
    }
  }

  .zzz {
    .conv {
      width: 2 * 0.445em;
    }
  }

  .isA {
    .conv {
      width: 1.2em;
    }
  }
}

// plain letters
.isThis-3:after,
.set-a:after {
  content: 'a';
}
.set-b:after {
  content: 'b';
}
.set-c:after {
  content: 'c';
}
.set-d:after {
  content: 'd';
}
.isThose-3:after,
.set-e:after {
  content: 'e';
}
.set-f:after {
  content: 'f';
}
.set-g:after {
  content: 'g';
}
.set-h:after {
  content: 'h';
}
.isThat-3:after,
.set-i:after {
  content: 'i';
}
.set-j:after {
  content: 'j';
}
.set-k:after {
  content: 'k';
}
.set-l:after {
  content: 'l';
}
.set-m:after {
  content: 'm';
}
.set-n:after {
  content: 'n';
}
.isThese-3:after,
.set-o:after {
  content: 'o';
}
.set-p:after {
  content: 'p';
}
.set-q:after {
  content: 'q';
}
.set-r:after {
  content: 'r';
}
.isThat-4:after,
.set-s:after {
  content: 's';
}
.isThis-4:after,
.set-t:after {
  content: 't';
}
.set-u:after {
  content: 'u';
}
.set-v:after {
  content: 'v';
}
.set-w:after {
  content: 'w';
}
.set-x:after {
  content: 'x';
}
.set-y:after {
  content: 'y';
}
.set-z:after {
  content: 'z';
}
.aaa:after {
  content: 'aa';
}
.bbb:after {
  content: 'bb';
}
.ccc:after {
  content: 'cc';
}
.ddd:after {
  content: 'dd';
}
.eee:after {
  content: 'ee';
}
.fff:after {
  content: 'ff';
}
.ggg:after {
  content: 'gg';
}
.hhh:after {
  content: 'hh';
}
.iii:after {
  content: 'ii';
}
.jjj:after {
  content: 'jj';
}
.kkk:after {
  content: 'kk';
}
.lll:after {
  content: 'll';
}
.mmm:after {
  content: 'mm';
}
.nnn:after {
  content: 'nn';
}
.ooo:after {
  content: 'oo';
}
.ppp:after {
  content: 'pp';
}
.qqq:after {
  content: 'qq';
}
.rrr:after {
  content: 'rr';
}
.sss:after {
  content: 'ss';
}
.ttt:after {
  content: 'tt';
}
.uuu:after {
  content: 'uu';
}
.vvv:after {
  content: 'vv';
}
.www:after {
  content: 'ww';
}
.xxx:after {
  content: 'xx';
}
.yyy:after {
  content: 'yy';
}
.zzz:after {
  content: 'zz';
}

div.word {
  display: inline-block;
  text-align: left;
  min-width: 1px;
}

span.emptyLetter:after {
  display: block;
  content: '';
  min-width: 10px;
  background-color: red;
}

.monospace {
  span.conv {
    letter-spacing: 0 !important;
    width: 0.65em !important;
  }

  .aaa,
  .bbb,
  .ccc,
  .ddd,
  .eee,
  .fff,
  .ggg,
  .hhh,
  .iii,
  .jjj,
  .kkk,
  .lll,
  .mmm,
  .nnn,
  .ooo,
  .ppp,
  .qqq,
  .rrr,
  .sss,
  .ttt,
  .uuu,
  .vvv,
  .www,
  .xxx,
  .yyy,
  .zzz {
    span.conv {
      width: 1.3em !important;
    }
  }
  .aa1,
  .bb1,
  .cc1,
  .dd1,
  .ee1,
  .ff1,
  .gg1,
  .hh1,
  .ii1,
  .jj1,
  .kk1,
  .ll1,
  .mm1,
  .nn1,
  .oo1,
  .pp1,
  .qq1,
  .rr1,
  .ss1,
  .tt1,
  .uu1,
  .vv1,
  .ww1,
  .xx1,
  .yy1,
  .isWhom-4,
  .zz1 {
    span.conv {
      width: 0 !important;
    }
  }

  .isWho-3,
  .isA {
    .conv {
      width: 1.4em !important;
    }
  }
}

.textarea-container {
  > * {
    @media (max-width: 1000px) {
      font-size: 70%;
    }

    @media (min-width: 2000px) {
      font-size: 170%;
    }
  }
}
</style>

<style lang="scss" scoped>
.top-container {
  padding: 40px;
  flex: 20 0;
  display: flex;
  max-height: 100vh;
  overflow: auto;
  &:before,
  &:after {
    content: '';
    display: block;
    width: 100vw;
    height: 100vh;
    background: whitesmoke;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
  }
  &:after {
    top: auto;
    bottom: 0;
  }
}

.text-field__main {
  width: 100%;
  height: auto;
  position: relative;
  text-align: center;
  font-family: 'Arial', sans-serif;
  z-index: 10;

  &.seriffed {
    font-family: 'Times New Roman', serif;
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
  top: 48%;
  transform: translateY(-50%);
  max-height: 100%;
  filter: saturate(3);

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

body .dark-mode {
  .top-container {
    &:after,
    &:before {
      background: #000;
    }
  }
}
</style>
