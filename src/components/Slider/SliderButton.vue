<template>
  <div class="SliderButton" :class="{ disable }">
    <span
      class="slider-container"
      @click="toggleOpen"
      :class="{
        isActive: active,
      }"
    >
      <span v-if="name" class="tool-name" :id="id">
        {{ name }}
      </span>
      <span
        class="slider-tool"
        :class="{
          opened: active || notClosable,
          hideLables: hideLabels,
        }"
      >
        <span class="tool-low" v-if="!hideLabels">{{ value }}</span>
        <input
          @click="returnFalse"
          @input="setValue"
          @change="pushValue"
          class="SliderButton__input"
          :value="value"
          :step="step"
          type="range"
          :min="min"
          :max="max"
        />
        <span class="tool-high" v-if="!hideLabels">{{ max }}</span>
      </span>
    </span>
    <IconButton
      class="SliderButton__undo-button"
      :class="{ isVisible: active }"
      icon="return-arrow"
      @click.native="setPreviousValue"
    />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import IconButton from '../Icon/IconButton.vue';

export default {
  components: { IconButton },
  props: {
    rowOverride: String,
    active: Boolean,
    type: String,
    name: String,
    id: String,
    notClosable: Boolean,
    hideLabels: Boolean,
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    startValue: {
      type: Number,
      default: null,
    },
    step: {
      type: Number,
      default: 1,
    },
    onChange: Function,
    disable: Boolean,
  },
  data() {
    return {
      resetValue: this.startValue || this.startValue === 0 ? this.startValue : this.min,
      previous: [],
      savedValue: null,
      amountCounter: 0,
      manualValue: null,
    };
  },
  computed: {
    ...mapState(['tick', 'isPlaying', 'enabledWords', 'enabledSentences']),
    value: {
      get() {
        return this.startValue || this.startValue === 0 ? this.startValue : this.min;
      },
      set(newValue) {
        if (this.onChange && !this.type) {
          this.onChange(parseInt(newValue, 10));
        }

        if (this.type) {
          this.setLetterTransforms({
            type: this.id,
            settings: { active: this.active, value: newValue, tick: this.amountCounter },
            kind: this.type,
          });
        }
      },
    },
  },
  watch: {
    enabledWords(isEnabled, wasEnabled) {
      if (this.active && this.type === 'words' && wasEnabled && !isEnabled) {
        this.toggleOpen();
      }
    },
    enabledSentences(isEnabled, wasEnabled) {
      if (
        this.active
        && (this.type === 'sentences' || this.rowOverride === 'sentences')
        && wasEnabled
        && !isEnabled
      ) {
        this.toggleOpen();
      }
    },
    isPlaying(activeIsSet) {
      if (activeIsSet) {
        this.savedValue = this.value;
      } else {
        this.savedValue = null;
      }
    },
    tick(newTick, oldTick) {
      if (this.active && this.type && this.isPlaying && newTick !== oldTick) {
        const absoluteTick = this.min === 0 ? Math.abs(newTick) : newTick;
        const newValue = Math.floor(((this.manualValue === null ? this.value : this.manualValue) * absoluteTick) / 100);

        if (this.manualValue === null) {
          this.manualValue = newValue;
        }

        this.value = newValue;

        if (Math.abs(parseInt(this.value, 10)) <= 0) {
          this.amountCounter = this.amountCounter + 1;
        }
      }
    },
  },
  name: 'SliderButton',
  methods: {
    toggleOpen() {
      this.setLetterTransforms({
        type: this.id,
        settings: { active: !this.active, value: this.value, tick: this.amountCounter },
        kind: this.type,
      });
    },
    returnFalse(e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    },
    setValue(input) {
      const value = input.target ? input.target.value : input;
      if (this.isPlaying && this.id !== 'speed') {
        this.setReset();
      }

      this.value = value;
      this.manualValue = parseFloat(value);
    },
    pushValue(input) {
      if (input.target.value === '0' || input.target.value === 0) {
        this.amountCounter = this.amountCounter + 1;
      }
      this.previous.push(input.target.value);
    },
    setPreviousValue() {
      if (this.previous.length > 1) {
        this.previous.pop();
        this.setValue(this.previous[this.previous.length - 1]);
      } else {
        this.previous = [];
        this.setValue(this.resetValue);
      }
    },
    ...mapMutations(['setLetterTransforms', 'setReset']),
  },
};
</script>

<style lang="scss" scoped>
.SliderButton {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently
    supported by Chrome, Opera and Firefox */

  &.disable {
    opacity: 0.5; // re-enable when done!
    pointer-events: none;
  }

  display: flex;
  flex-direction: row;

  &__undo-button {
    width: 0;
    overflow: hidden;
    &.isVisible {
      width: 25px;
      @media (min-width: 2000px) {
        width: 34px;
      }
    }
  }

  .tool-name {
    margin-left: 10px;
    margin-right: 10px;
    padding-bottom: 2px;
    height: 12px; /* Safari line-height bugfix */
  }

  .isActive {
    .tool-name {
      margin-right: 0;
    }
  }


  @media (max-width: 1000px) {
    .tool-name {
      margin-left: 10px;
      margin-right: 10px;
      padding-bottom: 0;
      height: 12px; /* Safari line-height bugfix */
    }
  }
  @media (min-width: 2000px) {
    .tool-name {
      margin-left: 20px;
      margin-right: 20px;
      padding: 0px 0 5px;
      height: 14px; /* Safari line-height bugfix */
    }
  }

  .slider__buttons-undo {
    display: inline-block;
    width: 12px;
    border-radius: 50%;
    background-image: url('/images/return-11.svg');
    background-size: 12px;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #ffffff;
  }

  .slider-container {
    color: black;
    cursor: pointer;
    margin-right: 3px;
    white-space: nowrap;
    padding: 0;
    display: flex;
    align-items: center;
    background-color: #ffffff;

    &:hover {
      background-color: #cccccc;
    }

    &.isActive {
      background-color: #cccccc;
    }

    .slider-tool {
      margin-left: 0;
      margin-right: 0;
      display: flex;
      transition: all 0.2s ease-in;
      width: 1px;
      opacity: 0;

      &.opened {
        margin-left: 9px;
        margin-right: 9px;
        transition: all 0.2s ease-in;
        width: 162px;
        opacity: 1;

        @media (max-width: 1000px) {
          width: 120px;
        }

        @media (min-width: 2000px) {
          width: 190px;
        }
      }

      &.hideLables {
        width: 106px;
      }
    }
  }

  .tool-low,
  .tool-high {
    overflow: hidden;
    text-align: center;
    font-size: 10px;
    width: 45px;
  }
  .tool-low {
    margin-right: 5px;
  }

  .tool-high {
    margin-left: 5px;
  }
  @media (max-width: 1000px) {
    .tool-low,
    .tool-high {
      font-size: 9px;
      margin-top: -1px;
    }
  }

  @media (min-width: 2000px) {
    .tool-low,
    .tool-high {
      font-size: 12px;
    }
  }
}

/* alles wat specifiek voor de donkere versie is, zet je onderaan,
  tussen .dark-mode {} tags: (kopieer gewoon de stukken die je wilt veranderen)
 */

.dark-mode {
  .slider-container {
    background-color: #cccccc;

    &:hover {
      background-color: #999999;
    }

    &.isActive {
      background-color: #999999;
    }
  }

  .close-button {
    background-color: #cccccc;
  }
}
</style>
