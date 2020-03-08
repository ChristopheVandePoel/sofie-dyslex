<template>
  <div>
    <div class="close-button toggle-slider" :class="color">
      <img :src="iconUrl" />
    </div>
  </div>
</template>

<script>
import arrowLeft from '../../assets/images/arrow-1b.svg';
import arrowDown from '../../assets/images/arrow-2b.svg';
import returnArrow from '../../assets/images/return-5.svg';
import minus from '../../assets/images/min-3.svg';
import plus from '../../assets/images/plus-4.svg';

const iconMap = {
  'arrow-left': arrowLeft,
  'arrow-down': arrowDown,
  'return-arrow': returnArrow,
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
    iconUrl() {
      return iconMap[this.icon || 'arrow-left'];
    },
  },
};
</script>

<style lang="scss" scoped>
  .close-button {
    background-color: #ffffff;
    border: 0 solid transparent;
    flex: 0;
    justify-content: center;
    align-items: center;
    display: flex;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-size: 12px;
    background-position: center;
    background-repeat: no-repeat;
    padding: 5px;

    @media (max-width: 1000px) {
      width: 8px;
      height: 8px;
    }

    @media (min-width: 2000px) {
      width: 20px;
      height: 20px;
    }

    img {
      width: 100%;
      height: 100%;
    }

    &.green {
      background-color: #00FF00;
    }
  }

  .close-button:hover {
    color: black;
    cursor: pointer;
    background-color: #ffffff;
  }

/* alles wat specifiek voor de donkere versie is, zet je onderaan,
  tussen .dark-mode {} tags: (kopieer gewoon de stukken die je wilt veranderen)
 */

.dark-mode {
  .close-button {
    background-color: #cccccc;
  }
}
</style>
