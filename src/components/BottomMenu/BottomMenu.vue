<template>
  <div class="bottom-menu__container" :class="{ opened: menusOpen }">
    <IconButton class="bottom-close-button" icon="arrow-down" @click.native="toggleMenusOpen" />
    <div class="bottom-container__buttons">
      <ButtonRow
        class="bottom-menu__button-row"
        title="Letters"
        :expanded="true"
        :onDisable="() => disable('lettersRow')"
      >
        <SliderButton
          type="letters"
          name="Backwards"
          id="letters-backwards"
          :start-value="getLetterValue('letters-backwards')"
          :active="getLetterActivity('letters-backwards')"
        />
        <SliderButton
          type="letters"
          name="Decrease"
          id="decrease"
          :start-value="getLetterValue('decrease')"
          :active="getLetterActivity('decrease')"
        />
        <SliderButton
          type="letters"
          name="Diphthong"
          id="letters-diphtong"
          :start-value="getLetterValue('letters-diphtong')"
          :active="getLetterActivity('letters-diphtong')"
        />
        <SliderButton
          type="letters"
          name="Free tremble"
          id="free-tremble"
          :start-value="getLetterValue('free-tremble')"
          :active="getLetterActivity('free-tremble')"
        />
        <SliderButton
          type="letters"
          name="Hopping"
          id="hopping"
          :start-value="getLetterValue('hopping')"
          :active="getLetterActivity('hopping')"
        />
        <SliderButton
          type="letters"
          name="Multiply"
          id="multiply"
          :start-value="getLetterValue('multiply')"
          :active="getLetterActivity('multiply')"
        />
        <SliderButton
          type="letters"
          name="Rotation"
          id="rotation"
          :start-value="getLetterValue('rotation')"
          :active="getLetterActivity('rotation')"
        />
        <SliderButton
          type="letters"
          name="Shifting"
          id="shifting"
          :start-value="getLetterValue('shifting')"
          :active="getLetterActivity('shifting')"
        />
        <SliderButton
          type="letters"
          name="Swapping"
          id="letters-swapping"
          :start-value="getLetterValue('letters-swapping')"
          :active="getLetterActivity('letters-swapping')"
        />
        <SliderButton
          type="letters"
          name="Trembling"
          id="trembling"
          :start-value="getLetterValue('trembling')"
          :active="getLetterActivity('trembling')"
        />
        <SliderButton
          type="letters"
          name="Upside—down"
          id="upside-down-letters"
          :start-value="getLetterValue('upside-down-letters')"
          :active="getLetterActivity('upside-down-letters')"
        />
      </ButtonRow>

      <ButtonRow
        :disabled="!enabledWords"
        class="bottom-menu__button-row"
        title="Words"
        :expanded="true"
        :onDisable="() => disable('wordsRow')"
      >
        <SliderButton
          row-override="words"
          type="letters"
          name="Article"
          id="article"
          :start-value="getLetterValue('article')"
          :active="getLetterActivity('article')"
        />
        <SliderButton
          type="words"
          name="Free tremble"
          id="free-tremble"
          :start-value="getWordValue('free-tremble')"
          :active="getWordActivity('free-tremble')"
        />
        <SliderButton
          type="words"
          name="Hopping"
          id="hopping"
          :start-value="getWordValue('hopping')"
          :active="getWordActivity('hopping')"
        />
        <SliderButton
          row-override="words"
          type="letters"
          name="Pronoun"
          id="pronoun"
          :start-value="getLetterValue('pronoun')"
          :active="getLetterActivity('pronoun')"
        />
        <SliderButton
          type="words"
          name="Tilting"
          id="tilting"
          :start-value="getWordValue('tilting')"
          :active="getWordActivity('tilting')"
        />
        <SliderButton
          type="words"
          name="Trembling"
          id="trembling"
          :start-value="getWordValue('trembling')"
          :active="getWordActivity('trembling')"
        />
      </ButtonRow>

      <ButtonRow
        class="bottom-menu__button-row"
        title="Sentences"
        :expanded="true"
        :onDisable="() => disable('sentenceRow')"
      >
        <SliderButton
          row-override="sentences"
          type="letters"
          name="Free tracking"
          id="free-tracking"
          :start-value="getLetterValue('free-tracking') || 0"
          :active="getLetterActivity('free-tracking')"
        />
        <SliderButton
          :disable="!enabledSentences && !enabledWords"
          row-override="sentences"
          :min="-100"
          :max="100"
          type="words"
          name="Wordspace"
          id="interspace"
          :start-value="getWordValue('interspace') || 0"
          :active="getWordActivity('interspace') && (enabledSentences || enabledWords)"
        />
        <SliderButton
          :disable="!enabledSentences"
          :min="-100"
          :max="100"
          type="sentences"
          name="Line—spacing"
          id="line-spacing"
          :start-value="getSentenceValue('line-spacing') || 0"
          :active="getSentenceActivity('line-spacing') && enabledSentences"
        />
        <SliderButton
          :min="-100"
          :max="100"
          type="letters"
          name="Tracking"
          id="tracking"
          :start-value="getLetterValue('tracking') || 0"
          :active="getLetterActivity('tracking')"
        />
      </ButtonRow>

      <ButtonRow
        class="bottom-menu__button-row"
        title="Typeface"
        :expanded="true"
        :onDisable="() => disable('typefaceRow')"
      >
        <SliderButton disable type="faces" name="Ascender" id="ascender" />
        <SliderButton disable type="faces" name="Descender" id="descender" />
        <SliderButton
          :min="-100"
          :max="100"
          type="letters"
          name="Height"
          id="height"
          :start-value="getLetterValue('height') || 0"
          :active="getLetterActivity('height')"
        />
        <SliderButton disable type="faces" name="Serifs" id="serifs" />
        <SliderButton
          disable
          :min="100"
          :max="800"
          :step="100"
          type="letters"
          name="Weight"
          id="weight"
          :start-value="getLetterValue('weight') || 100"
          :active="getLetterActivity('weight')"
        />
        <SliderButton
          :min="-100"
          :max="100"
          type="letters"
          name="Width"
          id="width"
          :start-value="getLetterValue('width') || 0"
          :active="getLetterActivity('width')"
        />
      </ButtonRow>
      <ButtonRow title="Speed" expanded>
        <SliderButton
          active
          id="speed"
          :not-closable="true"
          :start-value="generalState.speed"
          :on-change="speed => setGeneral({ speed })"
        />
      </ButtonRow>
      <ButtonRow title="Motion" :expanded="true"
                 is-last>
        <Button :active="isPlaying" @click.native="setPlay">
          Play
        </Button>
        <Button :active="!isPlaying" @click.native="setPause">
          Pause
        </Button>
      </ButtonRow>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import IconButton from '../Icon/IconButton.vue';
import SliderButton from '../Slider/SliderButton.vue';
import ButtonRow from '../ButtonRow/ButtonRow.vue';
import Button from '../Button/Button.vue';

const lettersRow = [
  'letters-backwards',
  'letters-diphtong',
  'free-tremble',
  'hopping',
  'multiply',
  'rotation',
  'letters-swapping',
  'trembling',
  'upside-down-letters',
  'shifting',
];

const wordsRow = ['article', 'free-tremble', 'hopping', 'tilting', 'trembling'];
const wordsRowLetters = ['pronoun'];

const sentenceRowLetters = ['free-tracking', 'tracking'];

const sentenceRowWords = ['interspace'];

const sentenceRowSentence = ['line-spacing'];

const typefaceRowLetters = ['height', 'width', 'weight'];

export default {
  name: 'BottomMenu',
  components: {
    ButtonRow,
    IconButton,
    SliderButton,
    Button,
  },
  methods: {
    ...mapMutations([
      'toggleMenusOpen',
      'setGeneral',
      'setPlay',
      'setPause',
      'setLetterTransforms',
    ]),
    disable(input) {
      if (input === 'lettersRow') {
        lettersRow.forEach(item => {
          this.setLetterTransforms({
            type: item,
            settings: { active: false },
            kind: 'letters',
          });
        });
      }
      if (input === 'wordsRow') {
        wordsRow.forEach(item => {
          this.setLetterTransforms({
            type: item,
            settings: { active: false },
            kind: 'words',
          });
        });

        wordsRowLetters.forEach(item => {
          this.setLetterTransforms({
            type: item,
            settings: { active: false },
            kind: 'letters',
          });
        });
      }
      if (input === 'sentenceRow') {
        sentenceRowLetters.forEach(item => {
          this.setLetterTransforms({
            type: item,
            settings: { active: false },
            kind: 'letters',
          });
        });
        sentenceRowWords.forEach(item => {
          this.setLetterTransforms({
            type: item,
            settings: { active: false },
            kind: 'words',
          });
        });
        sentenceRowSentence.forEach(item => {
          this.setLetterTransforms({
            type: item,
            settings: { active: false },
            kind: 'sentences',
          });
        });
      }
      if (input === 'typefaceRow') {
        typefaceRowLetters.forEach(item => {
          this.setLetterTransforms({
            type: item,
            settings: { active: false },
            kind: 'letters',
          });
        });
      }
    },
    getLetterValue(type) {
      if (this.letterValues[type]) {
        return parseFloat(this.letterValues[type].value);
      }
      return null;
    },
    getLetterActivity(type) {
      if (this.letterValues[type]) {
        return this.letterValues[type].active;
      }
      return false;
    },
    getWordValue(type) {
      if (this.wordValues[type]) {
        return parseFloat(this.wordValues[type].value);
      }
      return null;
    },
    getWordActivity(type) {
      if (this.wordValues[type]) {
        return this.wordValues[type].active;
      }
      return false;
    },
    getSentenceValue(type) {
      if (this.sentenceValues[type]) {
        return parseFloat(this.sentenceValues[type].value);
      }
      return null;
    },
    getSentenceActivity(type) {
      if (this.sentenceValues[type]) {
        return this.sentenceValues[type].active;
      }
      return false;
    },
  },
  computed: {
    ...mapState([
      'textTransforms',
      'menusOpen',
      'enabledSentences',
      'enabledWords',
      'generalState',
      'isPlaying',
      'activeLetters',
      'activeWords',
      'activeSentences',
    ]),
    letterValues() {
      return this.textTransforms.letters || {};
    },
    wordValues() {
      return this.textTransforms.words;
    },
    sentenceValues() {
      return this.textTransforms.sentences;
    },
  },
};
</script>

<style lang="scss" scoped>
$height: 180px;
$largeHeight: 220px;

.bottom-menu__container {
  position: fixed;
  bottom: -$height;
  left: 8px;
  transition: all 0.5s ease;
  padding-bottom: 8px;
  z-index: 10;


  @media (min-width: 2000px) {
    bottom: -$largeHeight;
  }

  .bottom-menu__button-row {
    transition: width 0.2s ease;
    width: 600%;
  }

  &.opened {
    transition: all 0.5s ease;
    bottom: 0;

    .bottom-menu__button-row {
      width: 100%;
      transition: width 0.2s ease;
    }

    .bottom-close-button {
      top: 0;
      transition: all 0.5s ease;
      transform: rotate(0deg);
    }

    .bottom-container__buttons {
      transition: all 0.5s ease;
      opacity: 1;
    }
  }
  .bottom-close-button {
    position: absolute;
    top: -53px;
    transition: all 0.5s ease;
    transform: rotate(180deg);
  }

  .bottom-container__buttons {
    z-index: 100;
    margin-left: 30px;
    display: flex;
    flex-direction: column;
    transition: all 0.5s ease;
    opacity: 0;

    @media (min-width: 2000px) {
      margin-left: 40px
    }
  }
}
</style>
