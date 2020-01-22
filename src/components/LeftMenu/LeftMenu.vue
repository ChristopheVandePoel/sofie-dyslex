<template>
  <div class="tools__container" :class="{ opened: open }">
    <IconButton class="tools-icon-button" @click.native="handleOpenClick" />
    <div class="tools__container--tools">
      <ButtonRow title="Context" :expanded="true">
        <Button :active="generalState.type === 'word'" @click.native="setGeneral({ type: 'word' })">
          Word
        </Button>
        <Button
          :active="generalState.type === 'sentence'"
          @click.native="setGeneral({ type: 'sentence' })"
        >
          Sentence
        </Button>
        <Button
          :active="generalState.type === 'paragraph'"
          @click.native="setGeneral({ type: 'paragraph' })"
        >
          Paragraph
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
      </ButtonRow>
      <ButtonRow title="Letter case" :expanded="true">
        <Button
          :active="generalState.letterCase === 'lower'"
          @click.native="setGeneral({ letterCase: 'lower' })"
        >
          Caps min
        </Button>
        <Button
          :active="generalState.letterCase === 'upper'"
          @click.native="setGeneral({ letterCase: 'upper' })"
        >
          Caps max
        </Button>
      </ButtonRow>
      <ButtonRow title="Weight" :expanded="true">
        <SliderButton
          id="font-weight"
          :not-closable="true"
          :start-value="generalState.weight"
          :on-change="weight => setGeneral({ weight })"
        />
      </ButtonRow>
      <ButtonRow title="Size" :expanded="true">
        <SliderButton
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
          :active="generalState.alignment === 'block'"
          @click.native="setGeneral({ alignment: 'block' })"
        >
          Block
        </Button>
      </ButtonRow>
      <ButtonRow title="Speed">
        <SliderButton
          id="speed"
          :not-closable="true"
          :start-value="generalState.speed"
          :on-change="speed => setGeneral({ speed })"
        />
      </ButtonRow>
      <ButtonRow title="Color">
        <SliderButton
          id="color"
          :not-closable="true"
          :hide-labels="true"
          :start-value="generalState.color"
          :on-change="color => setGeneral({ color })"
        />
      </ButtonRow>
      <ButtonRow title="Interface" :expanded="true">
        <Button
          :active="generalState.interface === 'bright'"
          @click.native="setGeneral({ interface: 'bright' })"
        >
          Bright
        </Button>
        <Button
          :active="generalState.interface === 'dark'"
          @click.native="setGeneral({ interface: 'dark' })"
        >
          Dark
        </Button>
      </ButtonRow>
      <div class="LeftMenu__special-buttons">
        <Button class="green" @click.native="togglePlay">{{ isPlaying ? 'Pause' : 'Play' }}</Button>
        <Button class="green" @click.native="setReset">Random</Button>
      </div>
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
  data() {
    return {
      open: true,
    };
  },
  computed: mapState(['generalState', 'isPlaying']),
  methods: {
    handleOpenClick() {
      this.open = !this.open;
    },
    togglePlay() {
      if (this.isPlaying) {
        this.setPause();
      } else {
        this.setPlay();
      }
    },
    ...mapMutations(['setGeneral', 'setPlay', 'setPause', 'setReset']),
  },
};
</script>

<style lang="scss" scoped>
.tools__container {
  padding: 10px;
  position: absolute;
  z-index: 100;

  .tools__container--tools {
    position: relative;
    left: -400px;
    overflow: hidden;
    transition: left 0.5s ease;
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
    }
    .tools-icon-button {
      transition: transform 0.5s ease;
      transform: rotate(0deg);
    }
  }
  .LeftMenu__special-buttons {
    width: 75px;
    font-size: 12px;
    display: flex;
    .green {
      margin-bottom: 5px;
      background-color: #00ff00;
      transition: background-color 0.2s ease-in;

      &:hover {
        background-color: black;
        color: white;
        transition: background-color 0.2s ease-in;
      }
    }
  }
}
</style>
