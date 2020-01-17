<template>
  <div class="tools__container">
    <IconButton />
    <div class="tools__container--tools">
      <ButtonRow title="Context">
        <Button>Word</Button>
        <Button>Text</Button>
      </ButtonRow>
      <ButtonRow title="Font">
        <Button>Serif</Button>
        <Button>Sans-serif</Button>
      </ButtonRow>
      <ButtonRow title="Letter case">
        <Button>Caps min</Button>
        <Button>Caps max</Button>
      </ButtonRow>
      <ButtonRow title="Weight">
        <SliderButton id="font-weight" not-closable="true" />
      </ButtonRow>
      <ButtonRow title="Size">
        <SliderButton id="font-size" not-closable="true" />
      </ButtonRow>
      <ButtonRow title="Alignment">
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
        <Button>Block</Button>
      </ButtonRow>
      <ButtonRow title="Speed">
        <SliderButton id="speed" not-closable="true" />
      </ButtonRow>
      <ButtonRow title="Color">
        <SliderButton id="color" not-closable="true" />
      </ButtonRow>
      <ButtonRow title="Interface">
        <Button>Bight</Button>
        <Button>Dark</Button>
      </ButtonRow>
      <div class="tool__buttons--row">
        <span class="tool__buttons--row-title-last">Play</span>
      </div>
      <div class="tool__buttons--row">
        <span class="tool__buttons--row-title-last">Random</span>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '../Button/Button.vue';
import IconButton from '../Icon/IconButton.vue';
import SliderButton from '../Slider/SliderButton.vue';
import ButtonRow from '../ButtonRow/ButtonRow.vue';

export default {
  name: 'LeftMenu',
  components: {
    ButtonRow,
    SliderButton,
    IconButton,
    Button,
  },
};
</script>

<style scoped>
.tools__container {
  padding: 10px;
  position: absolute;
  z-index: 100;
  display: flex;
}

.tools__container--tools {
  position: relative;
  left: 0;
  overflow: hidden;
  transition: left 0.5s ease;
}

</style>
