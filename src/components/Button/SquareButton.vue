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
    width: 55px;;
    font-size: 12px;
    text-transform: uppercase;
    background-color: transparent;
    color: black;
    cursor: pointer;


    @media (max-width: 1000px) {
      font-size: 10px;
      width: 40px;
    }

    @media (min-width: 2000px) {
      font-size: 18px;
      width: 65px;
    }

    &:hover {
      background-color: transparent;
    }
  }

  .random-button {
    text-align: right;
  }

  .reset-button {
    text-align: right;
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
