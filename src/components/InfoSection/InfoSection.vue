<template>
  <div :class="['info-container', {'closed': !open}]">
    <div class="info-inner">
      <SquareButton class="close-button" @click.native="toggleInfoOpen">close</SquareButton>
      <div class="info-text">
        about
      </div>
      <div class='main-text'>
        18 months of research at Atelier National de Recherche Typographique has led to the development of a functioning system, aimed at both clarifying and simulating symptoms of dyslexia. The website can simulate various symptoms that occur while reading and writing, with people who suffer from the disability. 
      <div class='indent'>
        Simply, by selecting some features on top and below someone can finally show others what actually happens while reading. The type of dyslexia and the gradations thereof can be simulated. Other variables such as word difficulty, color, style, size or typeface and many others can be adjusted.
	    </div>
      <div class='indent'>
        The adjustments can be customized to display an individual’s specific, more personal version of the someone’s dyslexia and may change the way people dealt with information.
      </div>
        <br>
        For further information 
        <a href="dyslexia.archive@gmail.com">contact me.</a>
        <br>
        <br>
      </div>
        
      <div class="info-text">
        glossory
      </div>
      <div class='main-text'>
        Serif	a slight projection finishing off a stroke of a shape.
        <br>
        Sans-serif don’t include thin lines at the ends of a character.
        <br>
        Monospace each character covers the same amount of horizontal space.
        <br>
        Script based on the often fluid stroke created by handwriting.
        <br>
        Lowercase common letters
        <br>
        Uppercase capital letters
        <br>
        Regular the thickness of a normal weight.
        <br>
        Bold the thickness of a heavy weight.
        <br>
        Italic the letters are slanted upward to the right.
        <br>
        Alignment settings of text.
        <br>
        Color	adjust the color of the text.
        <br>
        background adjust the background color.
        <br>
        Speed	arrange the speed.
      </div>

      <div class="info-text">
        Letters   
      </div>
      <div class='main-text'>
        Backwards letters reverse one by one.
        <br>
        Decrease repetitions of the same letters merge into one. 
        <br>
        Diphthong combinations of diphthongs swap places.
        <br>
        Free rotation letters rotate randomly from left to right.
        <br>
        Free tremble letters tremble randomly.
        <br>
        Hopping letters jump up and down.
        <br>
        Multiply letters increase in numbers. 
        <br>
        Rotating letters rotate from left to right.
        <br>
        Shifting letters in words shift places.
        <br>
        Swapping letters get swapped.
        <br>
        Trembling letters tremble randomly from left to right.
        <br>
        Upside–down letters turn upside-down one by one.
      </div>
  
      <div class="info-text">
        words
      </div>
      <div class='main-text'>
        Article some articles convert into a different one.
        <br>
        Free tremble words shuffle randomly in any direction.
        <br>
        Hopping words jump up and down.
        <br>
        Tilting words turn randomly from left to right.
        <br>
        Trembling words shuffle randomly from left to right.
      </div>

      <div class="info-text">
        sentences
      </div>
      <div class='main-text'>
        Free tracking the space between letters variates from narrow to wide.
        <br>
        Wordspace the space between letters variates from narrow to wide.
        <br>
        Line-spacingthe space between the lines can be adjusted.
        <br>
        Tracking the space variates from narrow to wide.
      </div>

      <div class="info-text">
        typeface
      </div>
        <div class='main-text'>
        Ascender the ascenders can be adjusted. (coming soon)
        <br>
        Descender the descenders can be adjusted. (coming soon)
        <br>
        Height the weight can be adjusted.
        <br>
        Serifs the serifs increase and decrease. (coming soon)
        <br>
        Weight the weight can be adjusted.
        <br>
        Width the width can be adjusted.
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
    top: 0;
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
    right: 0;
    top: 10px;
  }

  .info-text {
    margin: 8px;
    font-size: 12px;
    text-transform: uppercase;
  }

  .main-text {
    margin: 8px;
    width: 50%;
    font-family: Arial, sans-serif;
    font-weight: bold;
    font-size: 21px;
  }

  .indent {
    text-indent: 50px;
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
    color: black;
  }
}
</style>
