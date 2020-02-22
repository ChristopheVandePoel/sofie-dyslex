<template>
  <div :class="['info-container', {'closed': !open}]">
    <div class="info-inner">
      <SquareButton class="close-button" @click.native="toggleInfoOpen">close</SquareButton>
      <div class="info-text">
        Info here
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
import SquareButton from '../Button/SquareButton';

export default {
  name: 'InfoSection',
  props: {
    open: Boolean,
  },
  components: { SquareButton },
  methods: mapMutations(['toggleInfoOpen']),
};
</script>
<style lang="scss" scoped>
  .info-container {
    position: fixed;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    color: black;
    z-index: 9999;
    background-color:whitesmoke;
    right: 0;
    transition: transform 1.2s ease;
    &.closed {
      transform: translateX(100%);
    }
  }
  .info-inner {
    width: 100vw;
  }

  .close-button {
    position: absolute;
    right: 0px;
    top: 0px;
  }

  .info-text {
    margin: 8px;
    font-size: 12px;
  }

/* alles wat specifiek voor de donkere versie is, zet je onderaan,
  tussen .dark-mode {} tags: (kopieer gewoon de stukken die je wilt veranderen)
 */

.dark-mode {
    .container {
    color:#ffffff;
    background-color: #000000;
  }

  .close-button {
    color: #ffffff;
  }
}
</style>
