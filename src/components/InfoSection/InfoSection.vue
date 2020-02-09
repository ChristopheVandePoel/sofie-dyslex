<template>
  <div class="container">
    <SquareButton class="close-button" @click.native="toggleInfoOpen">x</SquareButton>
    <div>
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
</style>
