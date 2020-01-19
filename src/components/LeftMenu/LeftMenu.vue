<template>
  <div class="tools__container" :class="{ opened: open }">
    <IconButton class="tools-icon-button" @click.native="handleOpenClick" />
    <div class="tools__container--tools">
      <ButtonRow title="Context" :expanded="true">
        <Button>Word</Button>
        <Button>Text</Button>
      </ButtonRow>
      <ButtonRow title="Font" :expanded="true">
        <Button>Serif</Button>
        <Button>Sans-serif</Button>
      </ButtonRow>
      <ButtonRow title="Letter case" :expanded="true">
        <Button>Caps min</Button>
        <Button>Caps max</Button>
      </ButtonRow>
      <ButtonRow title="Weight" :expanded="true">
        <SliderButton id="font-weight" :not-closable="true" />
      </ButtonRow>
      <ButtonRow title="Size" :expanded="true">
        <SliderButton id="font-size" :not-closable="true" />
      </ButtonRow>
      <ButtonRow title="Alignment" :expanded="true">
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
        <Button>Block</Button>
      </ButtonRow>
      <ButtonRow title="Speed">
        <SliderButton id="speed" :not-closable="true" />
      </ButtonRow>
      <ButtonRow title="Color">
        <SliderButton id="color" :not-closable="true" :hide-labels="true" />
      </ButtonRow>
      <ButtonRow title="Interface" :expanded="true">
        <Button>Bight</Button>
        <Button>Dark</Button>
      </ButtonRow>
      <div class="LeftMenu__special-buttons">
        <IconButton icon="play" color="green" />
      </div>
      <div class="LeftMenu__special-buttons">
        <IconButton icon="shuffle" color="green" />
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
.tools__container {
  padding: 10px;
  position: absolute;
  z-index: 100;

  .tools__container--tools {
    position: relative;
    left: -400px;
    overflow: hidden;
    transition: left 0.5s ease;
  }

  .tools-icon-button {
    position: absolute;
    transition: transform 0.5s ease;
    transform: rotate(180deg);
  }

  &.opened {
    .tools__container--tools {
      position: relative;
      left: 30px;
      overflow: hidden;
      transition: left 0.5s ease;
    }
    .tools-icon-button {
      transition: transform 0.5s ease;
      transform: rotate(0deg);
    }
  }
  .LeftMenu__special-buttons {
    margin-bottom: 5px;
  }
}
</style>
