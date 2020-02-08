<template>
  <div class="square-button"><slot /></div>
</template>

<script>
export default {
  name: 'SquareButton',
};
</script>

<style lang="scss" scoped>
  .square-button {
    width: 40px;
    height: 40px;
    background-color: #e2e2e2;
    color: black;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s ease-in;
    position: absolute;
    right: 2px;
    top: 2px;

    &:hover {
      background-color: #bebebe;
      transition: background-color 0.2s ease-in;
    }
  }
</style>
