<template>
  <div class="bottom-menu__container" :class="{ opened: menusOpen }">
    <IconButton class="bottom-close-button" icon="arrow-down" @click.native="toggleMenusOpen" />
    <div class="bottom-container__buttons">
      <ButtonRow class="bottom-menu__button-row" title="Letters" :expanded="true">
        <SliderButton
          type="letters"
          name="Backwards"
          id="letters-backwards"
          :start-value="getLetterValue('letters-backwards')"
        />
        <SliderButton
          type="letters"
          name="Diphtong"
          id="letters-diphtong"
          :start-value="getLetterValue('letters-diphtong')"
        />
        <SliderButton
          type="letters"
          name="Free rotation"
          id="free-rotation"
          :start-value="getLetterValue('free-rotation')"
        />
        <SliderButton
          type="letters"
          name="Free tremble"
          id="free-tremble"
          :start-value="getLetterValue('free-tremble')"
        />
        <SliderButton
          type="letters"
          name="Hopping"
          id="hopping"
          :start-value="getLetterValue('hopping')"
        />
        <SliderButton
          type="letters"
          name="Rotating"
          id="letters-rotating"
          :min="-100"
          :max="100"
          :start-value="getLetterValue('letters-rotating') || 0"
        />
        <SliderButton disable type="letters" name="Shifting" id="shifting" />
        <SliderButton
          type="letters"
          name="Swapping"
          id="letters-swapping"
          :start-value="getLetterValue('letters-swapping')"
        />
        <SliderButton
          type="letters"
          name="Trembling"
          id="trembling"
          :start-value="getLetterValue('trembling')"
        />
        <SliderButton
          type="letters"
          name="Upside—down"
          id="upside-down-letters"
          :start-value="getLetterValue('upside-down-letters')"
        />
      </ButtonRow>

      <ButtonRow class="bottom-menu__button-row" title="Words" :expanded="true">
        <SliderButton
          disable
          type="words"
          name="Article"
          id="article"
          :start-value="getWordValue('article')"
        />
        <SliderButton
          type="words"
          name="Free tremble"
          id="free-tremble"
          :start-value="getWordValue('free-tremble')"
        />
        <SliderButton
          type="words"
          name="Hopping"
          id="hopping"
          :start-value="getWordValue('hopping')"
        />
        <SliderButton
          type="words"
          name="Tilting"
          id="tilting"
          :start-value="getWordValue('tilting')"
        />
        <SliderButton
          type="words"
          name="Trembling"
          id="trembling"
          :start-value="getWordValue('trembling')"
        />
      </ButtonRow>

      <ButtonRow class="bottom-menu__button-row" title="Sentences" :expanded="true">
        <SliderButton
          type="letters"
          name="Free tracking"
          id="free-tracking"
          :start-value="getLetterValue('free-tracking') || 0"
        />
        <SliderButton
          :min="-100"
          :max="100"
          type="words"
          name="Interspace"
          id="interspace"
          :start-value="getWordValue('interspace') || 0"
        />
        <SliderButton
          :min="-100"
          :max="100"
          type="sentences"
          name="Line—spacing"
          id="line-spacing"
          :start-value="getSentenceValue('line-spacing') || 0"
        />
        <SliderButton
          :min="-100"
          :max="100"
          type="sentences"
          name="Tracking"
          id="tracking"
          :start-value="getSentenceValue('tracking') || 0"
        />
      </ButtonRow>

      <ButtonRow class="bottom-menu__button-row" title="Typeface" :expanded="true">
        <SliderButton disable type="faces" name="Ascender" id="ascender" />
        <SliderButton disable type="faces" name="Baseline" id="Baseline" />
        <SliderButton disable type="faces" name="Descender" id="descender" />
        <SliderButton disable type="faces" name="Height" id="height" />
        <SliderButton disable type="faces" name="Serifs" id="serifs" />
        <SliderButton disable type="faces" name="Weight" id="weight" />
        <SliderButton disable type="faces" name="Width" id="width" />
      </ButtonRow>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import IconButton from '../Icon/IconButton.vue';
import SliderButton from '../Slider/SliderButton.vue';
import ButtonRow from '../ButtonRow/ButtonRow.vue';

export default {
  name: 'BottomMenu',
  components: { ButtonRow, IconButton, SliderButton },
  methods: {
    ...mapMutations(['toggleMenusOpen']),
    getLetterValue(type) {
      if (this.letterValues[type]) {
        return parseFloat(this.letterValues[type].value);
      }
      return null;
    },
    getWordValue(type) {
      if (this.wordValues[type]) {
        return parseFloat(this.wordValues[type].value);
      }
      return null;
    },
    getSentenceValue(type) {
      if (this.sentenceValues[type]) {
        return parseFloat(this.sentenceValues[type].value);
      }
      return null;
    },
  },
  computed: {
    ...mapState(['textTransforms', 'menusOpen']),
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
$height: 130px;

.bottom-menu__container {
  position: absolute;
  bottom: -$height;
  left: 8px;
  transition: all 0.5s ease;
  padding-bottom: 8px;

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
  }
}
</style>
