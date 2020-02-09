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
    width: 50px;
    height: 25px;
    font-size: 12px;
    text-transform: uppercase;
    background-color: none;
    color: black;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      background-color: none;
    }
  }

  /* alles wat specifiek voor de donkere versie is, zet je onderaan,
  tussen .dark-mode {} tags: (kopieer gewoon de stukken die je wilt veranderen)
 */

.dark-mode {
  .square-button {
    color: #ffffff;
  }
}

</style>
