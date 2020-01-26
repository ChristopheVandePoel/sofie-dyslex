<template>
  <div class="bottom-menu__container" :class="{ opened: open }">
    <IconButton class="bottom-close-button" icon="arrow-down" @click.native="handleOpenClick" />
    <div class="bottom-container__buttons">
      <ButtonRow class="bottom-menu__button-row" title="Letters" :expanded="true">
        <SliderButton type="letters" name="Backwards" id="letters-backwards" />
        <SliderButton type="letters" name="Diphtong" id="letters-diphtong" />
        <SliderButton type="letters" name="Free rotation" id="free-rotation" />
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
        <SliderButton type="letters" name="Rotating" id="rotating-slider" />
        <SliderButton type="letters" name="Shifting" id="shifting" />
        <SliderButton type="letters" name="Swapping" id="swapping" />
        <SliderButton type="letters" name="Tilting" id="tilting" />
        <SliderButton type="letters" name="Trembling" id="trembling" />
        <SliderButton type="letters" name="Upside—down" id="upside-down" />
      </ButtonRow>

      <ButtonRow class="bottom-menu__button-row" title="Words" :expanded="true">
        <SliderButton type="words" name="Free tremble" id="free-tremble" />
        <SliderButton type="words" name="Hopping" id="hopping" />
        <SliderButton type="words" name="Tilting" id="tilting" />
        <SliderButton type="words" name="Trembling" id="trembling" />
      </ButtonRow>

      <ButtonRow class="bottom-menu__button-row" title="Sentences" :expanded="true">
        <SliderButton type="sentences" name="Free tracking" id="free-tracking" />
        <SliderButton type="sentences" name="Interspace" id="interspace" />
        <SliderButton type="sentences" name="Line—spacing" id="line-spacing" />
        <SliderButton type="sentences" name="Tracking" id="tracking" />
      </ButtonRow>

      <ButtonRow class="bottom-menu__button-row" title="Typeface" :expanded="true">
        <SliderButton type="faces" name="Ascender" id="ascender" />
        <SliderButton type="faces" name="Baseline" id="Baseline" />
        <SliderButton type="faces" name="Descender" id="descender" />
        <SliderButton type="faces" name="Height" id="height" />
        <SliderButton type="faces" name="Serifs" id="serifs" />
        <SliderButton type="faces" name="Weight" id="height" />
        <SliderButton type="faces" name="Width" id="width" />
      </ButtonRow>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import IconButton from '../Icon/IconButton.vue';
import SliderButton from '../Slider/SliderButton.vue';
import ButtonRow from '../ButtonRow/ButtonRow.vue';

export default {
  name: 'BottomMenu',
  components: { ButtonRow, IconButton, SliderButton },
  data: () => ({
    open: true,
  }),
  methods: {
    handleOpenClick() {
      this.open = !this.open;
    },
    getLetterValue(type) {
      if (this.letterValues[type]) {
        return parseFloat(this.letterValues[type].value);
      }
      return null;
    },
  },
  computed: {
    ...mapState(['textTransforms']),
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
