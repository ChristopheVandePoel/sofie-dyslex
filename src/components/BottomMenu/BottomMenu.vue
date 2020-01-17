<template>
  <div class="bottom-container__buttons">
    <IconButton icon="arrow-down"/>
    <div>
      <ButtonRow title="letters">
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

      <ButtonRow title="Words">
        <SliderButton name="Free tremble" id="free-tremble" />
        <SliderButton name="Hopping" id="hopping" />
        <SliderButton name="Tilting" id="tilting" />
        <SliderButton name="Trembling" id="trembling" />
      </ButtonRow>

      <ButtonRow title="Sentences">
        <SliderButton name="Free tracking" id="free-tracking" />
        <SliderButton name="Interspace" id="interspace" />
        <SliderButton name="Line-spacing" id="line-spacing" />
        <SliderButton name="Tracking" id="tracking" />
      </ButtonRow>

      <ButtonRow title="Typefaces">
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
};
</script>

<style scoped>
.bottom-container__buttons {
  position: absolute;
  z-index: 100;
  bottom: 20px;
  left: 10px;
  display: flex;
  height: 100px;
  transition: height 0.5s ease;
}

</style>
