<template>
  <div>
    <div class="close-button toggle-slider">
      <img :src="image" />
    </div>
  </div>
</template>

<script>
import arrowLeft from '../../assets/images/arrow-1-01.svg';
import arrowDown from '../../assets/images/arrow_1-02.svg';
import returnArrow from '../../assets/images/return-11.svg';

const iconMap = {
  'arrow-left': arrowLeft,
  'arrow-down': arrowDown,
  'return-arrow': returnArrow,
};

export default {
  name: 'IconButton',
  props: {
    icon: String,
  },
  computed: {
    image() {
      return iconMap[this.icon || 'arrow-left'];
    },
  },
};
</script>

<style scoped>
  .close-button {
    background-color: lightgray;
    color: gray;
    border: 0 solid transparent;
    flex: 0;
    justify-content: center;
    align-items: center;

    display: inline-block;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background-size: 13px;
    background-position: center;
    background-repeat: no-repeat;
    padding: 5px;
    transition: background-color 0.2s ease-in;
  }

  .close-button:hover {
    color: black;
    cursor: pointer;
    background-color: #e9e9e9;
    transition: background-color 0.2s ease-in;
  }
</style>
