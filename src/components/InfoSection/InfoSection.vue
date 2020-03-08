<template>
  <div :class="['info-container', { closed: !open }]">
    <SquareButton class="close-the-button" @click.native="toggleInfoOpen">close</SquareButton>
    <div class="info-inner">
      <div class="info-text">
        about
      </div>
      <div class="main-text">
        18 months of research at Atelier National de Recherche Typographique has led to the
        development of a functioning system, aimed at both clarifying and simulating symptoms of
        dyslexia. The website can simulate various symptoms that occur while reading and writing,
        with people who suffer from the disability.
        <div class="indent">
          Simply, by selecting some features on top and below someone can finally show others what
          actually happens while reading. The type of dyslexia and the gradations thereof can be
          simulated. Other variables such as word difficulty, color, style, size or typeface and
          many others can be adjusted.
        </div>
        <div class="indent">
          The adjustments can be customized to display an individual’s specific, more personal
          version of the someone’s dyslexia and may change the way people dealt with information.
        </div>
        <br />
        For further information
        <a href="dyslexia.archive@gmail.com">contact me.</a>
        <br />
        <br />
      </div>

      <div class="info-text">
        glossory
      </div>
      <div class="main-text">
        <table>
          <tr>
            <td>Serif</td>
            <td>a slight projection finishing off a stroke of a shape.</td>
          </tr>
          <tr>
            <td>Serif</td>
            <td>a slight projection finishing off a stroke of a shape.</td>
          </tr>

          <tr>
            <td>Sans-serif</td>
            <td>don’t include thin lines at the ends of a character.</td>
          </tr>

          <tr>
            <td>Monospace</td>
            <td>each character covers the same amount of horizontal space.</td>
          </tr>

          <tr>
            <td>Script</td>
            <td>based on the often fluid stroke created by handwriting.</td>
          </tr>

          <tr>
            <td>Lowercase</td>
            <td>common letters</td>
          </tr>

          <tr>
            <td>Uppercase</td>
            <td>capital letters</td>
          </tr>

          <tr>
            <td>Regular</td>
            <td>the thickness of a normal weight.</td>
          </tr>

          <tr>
            <td>Bold</td>
            <td>the thickness of a heavy weight.</td>
          </tr>

          <tr>
            <td>Italic</td>
            <td>the letters are slanted upward to the right.</td>
          </tr>

          <tr>
            <td>Alignment</td>
            <td>settings of text.</td>
          </tr>
          <tr>
            <td>Color</td>
            <td>adjust the color of the text.</td>
          </tr>

          <tr>
            <td>background</td>
            <td>arrange the speed.</td>
          </tr>
        </table>
      </div>

      <div class="info-text">
        Letters
      </div>
      <div class="main-text">
        <table>
          <tr>
            <td>Serif</td>
            <td>a slight projection finishing off a stroke of a shape.</td>
          </tr>
          <tr>
            <td>Backwards</td>
            <td>letters reverse one by one.</td>
          </tr>
          <tr>
            <td>Decrease</td>
            <td>repetitions of the same letters merge into one.</td>
          </tr>
          <tr>
            <td>Diphthong</td>
            <td>combinations of diphthongs swap places.</td>
          </tr>
          <tr>
            <td>Free</td>
            <td>rotation letters rotate randomly from left to right.</td>
          </tr>
          <tr>
            <td>Free</td>
            <td>tremble letters tremble randomly.</td>
          </tr>
          <tr>
            <td>Hopping</td>
            <td>letters jump up and down.</td>
          </tr>
          <tr>
            <td>Multiply</td>
            <td>letters increase in numbers.</td>
          </tr>
          <tr>
            <td>Rotating</td>
            <td>letters rotate from left to right.</td>
          </tr>
          <tr>
            <td>Shifting</td>
            <td>letters in words shift places.</td>
          </tr>
          <tr>
            <td>Swapping</td>
            <td>letters get swapped.</td>
          </tr>
          <tr>
            <td>Trembling</td>
            <td>letters tremble randomly from left to right.</td>
          </tr>
          <tr>
            <td>Upside–down</td>
            <td>letters turn upside-down one by one.</td>
          </tr>
        </table>
      </div>

      <div class="info-text">
        words
      </div>
      <div class="main-text">
        <table>
          <tr>
            <td>Article</td>
            <td>some articles convert into a different one.</td>
          </tr>

          <tr>
            <td>Free</td>
            <td>tremble words shuffle randomly in any direction.</td>
          </tr>

          <tr>
            <td>Hopping</td>
            <td>words jump up and down.</td>
          </tr>

          <tr>
            <td>Tilting</td>
            <td>words turn randomly from left to right.</td>
          </tr>

          <tr>
            <td>Trembling</td>
            <td>words shuffle randomly from left to right.</td>
          </tr>
        </table>
      </div>

      <div class="info-text">
        sentences
      </div>
      <div class="main-text">
        <table>
          <tr>
            <td>Free</td>
            <td> tracking the space between letters variates from narrow to wide.</td>
          </tr>
          <tr>
            <td>Wordspace</td>
            <td> the space between letters variates from narrow to wide.</td>
          </tr>
          <tr>
            <td>Line-spacing</td>
            <td> the space between the lines can be adjusted.</td>
          </tr>
          <tr>
            <td>Tracking</td>
            <td> the space variates from narrow to wide.</td>
          </tr>
        </table>
      </div>

      <div class="info-text">
        typeface
      </div>
      <div class="main-text">
        <table>
          <tr>
          <td>Ascender</td>
          <td> the ascenders can be adjusted. (coming soon)</td>
        </tr>
        <tr>
          <td>Descender</td>
          <td> the descenders can be adjusted. (coming soon)</td>
        </tr>
        <tr>
          <td>Height</td>
          <td> the weight can be adjusted.</td>
        </tr>
        <tr>
          <td>Serifs</td>
          <td> the serifs increase and decrease. (coming soon)</td>
        </tr>
        <tr>
          <td>Weight</td>
          <td> the weight can be adjusted.</td>
        </tr>
        <tr>
          <td>Width</td>
          <td> the width can be adjusted.</td>
        </tr>
        </table>
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
a {
  color: black;
}

table {
  td:first-child {
    min-width: 200px;
  }
}

.info-container {
  position: absolute;
  width: 100%;
  height: 100vh;
  color: black;
  z-index: 9999;
  background-color: whitesmoke;
  top: 0;
  left: 0;
  transition: transform 1.2s ease;
  overflow-y: scroll;
  &.closed {
    transform: translateX(100%);
  }
}
.info-inner {
  position: relative;
  width: 100%;
  overflow-y: hidden;
}

.close-the-button {
  z-index: 99999;
  text-align: right;
  width: 100%;
  right: 20px;
  top: 10px;
  position: fixed;
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
    color: #ffffff;
    background-color: #000000;
  }

  .close-the-button {
    color: black;
  }
}
</style>
