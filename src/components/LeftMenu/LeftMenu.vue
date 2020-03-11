<template>
  <div class="tools__container" :class="{ opened: menusOpen }">
    <IconButton class="tools-icon-button" @click.native="toggleMenusOpen" />
    <div class="tools__container--tools">
      <ButtonRow title="Content" :expanded="true">
        <Button :active="generalState.type === 'word'" @click.native="setGenSetting({ type: 'word' })">
          Word
        </Button>
        <Button
          :active="generalState.type === 'sentence' || generalState.type === 'paragraph'"
          @click.native="setGenSetting({ type: 'sentence' })"
        >
          Sentence
        </Button>
      </ButtonRow>
      <ButtonRow title="Font" :expanded="true">
        <Button
          :active="generalState.font === 'serif'"
          @click.native="setGeneral({ font: 'serif' })"
        >
          Serif
        </Button>
        <Button :active="generalState.font === 'sans'" @click.native="setGeneral({ font: 'sans' })">
          Sans&mdash;serif
        </Button>
        <Button
          :active="generalState.font === 'monospace'"
          @click.native="setGeneral({ font: 'monospace' })"
        >
          Monospace
        </Button>
        <Button
          disable
          :active="generalState.font === 'script'"
          @click.native="setGeneral({ font: 'script' })"
        >
          Script
        </Button>
      </ButtonRow>
      <ButtonRow title="Case" :expanded="true">
        <Button
          :active="generalState.letterCase === 'lower'"
          @click.native="setGeneral({ letterCase: 'lower' })"
        >
          Lowercase
        </Button>
        <Button
          :active="generalState.letterCase === 'upper'"
          @click.native="setGeneral({ letterCase: 'upper' })"
        >
          Uppercase
        </Button>
      </ButtonRow>
      <ButtonRow title="Style" :expanded="true">
        <Button
          :active="generalState.weight === 'regular'"
          @click.native="setGeneral({ weight: 'regular' })"
        >
          Regular
        </Button>
        <Button :active="generalState.weight === 'bold'" @click.native="setGeneral({ weight: 'bold' })">
          Bold
        </Button>
        <Button
          :active="generalState.weight === 'italic'"
          @click.native="setGeneral({ weight: 'italic' })"
        >
          Italic
        </Button>
      </ButtonRow>
      <ButtonRow title="Size" :expanded="true">
        <SliderButton
          :min="20"
          :max="100"
          active
          id="font-size"
          :not-closable="true"
          :start-value="generalState.size"
          :on-change="size => setGeneral({ size })"
        />
      </ButtonRow>
      <ButtonRow title="Alignment" :expanded="true">
        <Button
          :active="generalState.alignment === 'left'"
          @click.native="setGeneral({ alignment: 'left' })"
        >
          Left
        </Button>
        <Button
          :active="generalState.alignment === 'center'"
          @click.native="setGeneral({ alignment: 'center' })"
        >
          Center
        </Button>
        <Button
          :active="generalState.alignment === 'right'"
          @click.native="setGeneral({ alignment: 'right' })"
        >
          Right
        </Button>
        <Button
          disable
          :active="generalState.alignment === 'block'"
          @click.native="setGeneral({ alignment: 'block' })"
        >
          Block
        </Button>
      </ButtonRow>
      <ButtonRow title="Color" :expanded="true">
        <SliderButton
          active
          id="color"
          :not-closable="true"
          :hide-labels="true"
          :start-value="generalState.color"
          :on-change="color => setGeneral({ color })"
        />
      </ButtonRow>
      <ButtonRow title="Background" :expanded="true">
        <Button
          :active="generalState.background === 'bright'"
          @click.native="setGeneral({ background: 'bright' })"
        >
          Bright
        </Button>
        <Button
          :active="generalState.background === 'dark'"
          @click.native="setGeneral({ background: 'dark' })"
        >
          Dark
        </Button>
      </ButtonRow>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import Button from '../Button/Button.vue';
import IconButton from '../Icon/IconButton.vue';
import SliderButton from '../Slider/SliderButton.vue';
import ButtonRow from '../ButtonRow/ButtonRow.vue';

export default {
  name: 'LeftMenu',
  components: {
    ButtonRow,
    SliderButton,
    IconButton,
    Button,
  },
  computed: mapState(['generalState', 'menusOpen', 'textTransforms', 'textField', 'isPlaying']),
  methods: {
    outputState() {
      // reduce the inactive values out:
      const transforms = Object.keys(this.textTransforms).reduce((acc, curr) => {
        if (Array.isArray(this.textTransforms[curr])) {
          acc[curr] = this.textTransforms[curr];
        } else {
          acc[curr] = Object.keys(this.textTransforms[curr]).reduce((accTran, currTran) => {
            if (this.textTransforms[curr][currTran].active) {
              accTran[currTran] = this.textTransforms[curr][currTran]; // eslint-disable-line
            }
            return accTran;
          }, {});
        }

        return acc;
      }, {});

      console.log('********* \n PRESETS \n ********* \n', JSON.stringify(transforms));
      console.log('********* \n STATE \n ********* \n', JSON.stringify(this.generalState));
      console.log('********* \n SENTENCES \n ********* \n', JSON.stringify(this.textField));
    },
    ...mapMutations(['setGeneral', 'setReset', 'toggleMenusOpen', 'storeSelection', 'setPlay']),
    setGenSetting(input) {
      this.storeSelection(9999);
      this.setGeneral(input);
      if (this.isPlaying) {
        this.$nextTick(() => {
          this.setPlay();
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tools__container {
  padding: 0 10px 10px;
  left: -2px;
  position: fixed;
  z-index: 100;

  .tools__container--tools {
    position: relative;
    left: -400px;
    overflow: hidden;
    transition: left 0.5s ease;


    @media (min-width: 2000px) {
      left: -600px;
    }
  }

  .tools-icon-button {
    position: absolute;
    transition: transform 0.5s ease;
    transform: rotate(180deg);
  }

  &.opened {
    .tools__container--tools {
      position: relative;
      left: 30px;
      overflow: hidden;
      transition: left 0.5s ease;

      @media (min-width: 2000px) {
        left: 40px;
      }
    }
    .tools-icon-button {
      transition: transform 0.5s ease;
      transform: rotate(0deg);
    }
  }
  .LeftMenu__special-buttons {
    width: 50px;
    font-size: 12px;
    .green {
      margin-bottom: 3px;
      padding-top: 4px;
      padding-bottom: 6px;
      background-color: #00ff00;
      color: black;
      display: inline-block;
    }
  }
}

/* alles wat specifiek voor de donkere versie is, zet je onderaan,
  tussen .dark-mode {} tags: (kopieer gewoon de stukken die je wilt veranderen)
 */

.dark-mode {
  .Button {
    background-color: #cccccc;

    &:hover {
      background-color: #999999;
    }

    &.isActive {
      background-color: #999999;
    }

    &.green {
      background-color: #0000ff;
      color: #ffffff;
    }
  }
}
</style>
