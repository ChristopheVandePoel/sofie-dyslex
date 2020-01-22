<template>
  <div>
    <div class="close-button toggle-slider" :class="color">
      <img :src="image" />
    </div>
  </div>
</template>

<script>
import arrowLeft from '../../assets/images/arrow-1-01.svg';
import arrowDown from '../../assets/images/arrow_1-02.svg';
import returnArrow from '../../assets/images/return-11.svg';
import play from '../../assets/images/play-04.svg';
import shuffle from '../../assets/images/random-05.svg';
import minus from '../../assets/images/min-07.svg';
import plus from '../../assets/images/plus-06.svg';

const iconMap = {
  'arrow-left': arrowLeft,
  'arrow-down': arrowDown,
  'return-arrow': returnArrow,
  play,
  shuffle,
  minus,
  plus,
};

export default {
  name: 'IconButton',
  props: {
    icon: String,
    color: String,
  },
  computed: {
    image() {
      return iconMap[this.icon || 'arrow-left'];
    },
  },
};
</script>

<style lang="scss" scoped>
  .close-button {
    background-color: lightgray;
    color: gray;
    border: 0 solid transparent;
    flex: 0;
    justify-content: center;
    align-items: center;

    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-size: 12px;
    background-position: center;
    background-repeat: no-repeat;
    padding: 5px;
    transition: background-color 0.2s ease-in;

    &.green {
      background-color: #00FF00;
    }
  }

  .close-button:hover {
    color: black;
    cursor: pointer;
    background-color: #e9e9e9;
    transition: background-color 0.2s ease-in;

    &.green {
      background-color: lightgreen;
    }
  }
</style>
