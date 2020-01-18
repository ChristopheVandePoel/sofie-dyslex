<template>
  <div class="SliderButton">
    <span class="slider-container" @click="toggleOpen">
      <span v-if="name" class="tool-name" :id="id">
        {{name}}
      </span>
      <input
        @click="returnFalse"
        class="slider-tool"
        :class="{
          'opened': active || notClosable
        }"
        step="1"
        type="range"
        data-default="0"
      />
    </span>
    <IconButton icon="return-arrow" />
  </div>
</template>

<script>
import IconButton from '../Icon/IconButton.vue';

export default {
  components: { IconButton },
  props: ['name', 'id', 'notClosable'],
  data: () => ({
    active: false,
  }),
  name: 'SliderButton',
  methods: {
    toggleOpen() {
      this.active = !this.active;
    },
    returnFalse(e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.SliderButton {
  display: flex;
  flex-direction: row;

  .tool-name {
    margin-left: 10px;
    margin-right: 10px;
  }

  .slider__buttons-undo {
    display: inline-block;
    width: 13px;
    border-radius: 50%;
    background-image: url("/images/return-11.svg");
    background-size: 13px;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #DCDCDC;
  }

  .slider-container {
    color: black;
    cursor: pointer;
    transition: background-color 0.2s ease-in;
    margin-left: 5px;
    margin-right: 5px;
    white-space: nowrap;
    padding: 0;
    display: flex;
    align-items: center;
    background-color: #DCDCDC;

    &:hover {
      background-color: darkgray;
    }

    .slider-tool {
      margin-left: 0;
      margin-right: 0;
      display: inline-block;
      transition: all 0.2s ease-in;
      width: 0;
      opacity: 0;

      &.opened {
        margin-left: 10px;
        margin-right: 10px;
        display: inline-block;
        transition: all 0.2s ease-in;
        width: 100px;
        opacity: 1;
      }
    }
  }

  .tool-low {
    text-align: right;
    margin-right: 5px;
    margin-left: 0;
    font-size: 10px;
  }
}

</style>
