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
          hideLables: hideLabels
        }"
      >
        <span class="tool-low" v-if="!hideLabels">{{ value }}</span>
        <input
          @click="returnFalse"
          @input="setValue"
          @change="pushValue"
          class="SliderButton__input"
          :value="value"
          step="1"
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
    onChange: Function,
    disable: Boolean,
  },
  data() {
    return {
      active: false,
      resetValue: this.startValue || this.startValue === 0 ? this.startValue : this.min,
      previous: [],
      savedValue: null,
      amountCounter: 0,
    };
  },
  computed: {
    ...mapState(['tick', 'isPlaying']),
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
    isPlaying(activeIsSet) {
      if (activeIsSet) {
        this.savedValue = this.value;
      } else {
        this.savedValue = null;
      }
    },
    tick(newTick, oldTick) {
      if (this.type && this.isPlaying && newTick !== oldTick) {
        this.value = Math.floor((this.savedValue * newTick) / 100);

        if (parseInt(this.value, 10) <= 0) {
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
      this.active = !this.active;
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
        // this.savedValue = value;
      }
      if (input.target) {
        this.active = true;
      }

      this.value = value;
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
  &.disable {
    opacity: 0.2;
    pointer-events: none;
  }

  display: flex;
  flex-direction: row;

  &__undo-button {
    width: 0;
    overflow: hidden;
    &.isVisible {
      width: 25px;
    }
  }

  .tool-name {
    margin-left: 10px;
    margin-right: 10px;
    padding-bottom: 3px;
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
    width: 30px;
  }
  .tool-low {
    margin-right: 5px;
  }

  .tool-high {
    margin-left: 5px;
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
