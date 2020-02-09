<template>
  <div class="container">
    <SquareButton class="close-button" @click.native="toggleInfoOpen">close</SquareButton>
    <div class="info-text">
      Info here
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
import SquareButton from '../Button/SquareButton';

export default {
  name: 'InfoSection',
  components: { SquareButton },
  methods: mapMutations(['toggleInfoOpen']),
};
</script>
<style lang="scss" scoped>
  .container {
    position: absolute;
    width: 100vw;
    height: 100vh;
    color: black;
    z-index: 9999;
    background-color: rgba(255, 255, 255, 0.9);
  }

  .close-button {
    position: absolute;
    right: 2px;
    bottom: 2px;
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
