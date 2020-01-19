<template>
  <div class="bottom-menu__container" :class="{opened: open}">
    <IconButton class="bottom-close-button" icon="arrow-down" @click.native="handleOpenClick" />
    <div class="bottom-container__buttons">
      <ButtonRow class="bottom-menu__button-row" title="letters" :expanded="true">
        <SliderButton name="Backwards" id="letters-backwards" />
        <SliderButton name="Diphtongs" id="letters-diphtongs" />
        <SliderButton name="Free rotation" id="free-rotation" />
        <SliderButton name="Free tremble" id="free-tremble" />
        <SliderButton name="Hopping" id="hopping" />
        <SliderButton name="Rotating" id="rotating-slider" />
        <SliderButton name="Shifting" id="shifting" />
        <SliderButton name="Swapping" id="swapping" />
        <SliderButton name="Tilting" id="tilting" />
        <SliderButton name="Trembling" id="trembling" />
        <SliderButton name="Upside-down" id="upside-down" />
      </ButtonRow>

      <ButtonRow class="bottom-menu__button-row" title="Words" :expanded="true">
        <SliderButton name="Free tremble" id="free-tremble" />
        <SliderButton name="Hopping" id="hopping" />
        <SliderButton name="Tilting" id="tilting" />
        <SliderButton name="Trembling" id="trembling" />
      </ButtonRow>

      <ButtonRow class="bottom-menu__button-row" title="Sentences" :expanded="true">
        <SliderButton name="Free tracking" id="free-tracking" />
        <SliderButton name="Interspace" id="interspace" />
        <SliderButton name="Line-spacing" id="line-spacing" />
        <SliderButton name="Tracking" id="tracking" />
      </ButtonRow>

      <ButtonRow class="bottom-menu__button-row" title="Typefaces" :expanded="true">
        <SliderButton name="Height" id="height" />
        <SliderButton name="Serifs" id="serifs" />
        <SliderButton name="Weight" id="height" />
        <SliderButton name="Width" id="width" />
      </ButtonRow>
    </div>
  </div>
</template>

<script>
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
  },
};
</script>

<style lang="scss" scoped>
$height: 130px;

.bottom-menu__container {
  position: absolute;
  bottom: -$height;
  left: 10px;
  transition: all 0.5s ease;
  padding-bottom: 10px;

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
    top: -40px;
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
