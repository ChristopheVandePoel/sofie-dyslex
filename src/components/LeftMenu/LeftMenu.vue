<template>
  <div class="tools__container" :class="{ opened: open }">
    <IconButton class="tools-icon-button" @click.native="handleOpenClick" />
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
        <SliderButton id="font-weight" :not-closable="true" />
      </ButtonRow>
      <ButtonRow title="Size">
        <SliderButton id="font-size" :not-closable="true" />
      </ButtonRow>
      <ButtonRow title="Alignment">
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
      <ButtonRow title="Interface">
        <Button>Bight</Button>
        <Button>Dark</Button>
      </ButtonRow>
      <div class="tool__buttons--row">
        <IconButton icon="play" color="green" />
      </div>
      <div class="tool__buttons--row">
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
}
</style>
