<template>
  <div class="container">
    <SquareButton @click.native="toggleInfoOpen">x</SquareButton>
    Info here
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
</style>
