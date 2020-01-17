<template>
  <div class="tool__buttons--row">
    <Button class="row-title">{{title}}</Button>
    <slot />
  </div>
</template>

<script>
import Button from '../Button/Button.vue';

export default {
  name: 'ButtonRow',
  components: { Button },
  props: ['title'],
};
</script>

<style scoped>
  .tool__buttons--row {
    font-size: 13px;
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;
  }

  .row-title {
    background-color: darkgray;
  }
</style>
