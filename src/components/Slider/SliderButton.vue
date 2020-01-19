<template>
  <div class="SliderButton">
    <span class="slider-container" @click="toggleOpen" :class="{
      isActive: active,
    }">
      <span v-if="name" class="tool-name" :id="id">
        {{ name }}
      </span>
      <span
        class="slider-tool"
        :class="{
          opened: active || notClosable,
        }"
      >
        <span class="tool-low" v-if="!hideLabels">{{ value }}</span>
        <input
          class="SliderButton__input"
          @click="returnFalse"
          :value="value"
          step="1"
          type="range"
          @input="setValue"
          @change="pushValue"
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
import IconButton from '../Icon/IconButton.vue';

export default {
  components: { IconButton },
  props: {
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
  },
  data() {
    return {
      active: false,
      value: this.startValue || this.startValue === 0 ? this.startValue : (this.min + this.max) / 2,
      resetValue:
        this.startValue || this.startValue === 0 ? this.startValue : (this.min + this.max) / 2,
      previous: [],
    };
  },
  name: 'SliderButton',
  methods: {
    toggleOpen() {
      this.active = !this.active;
    },
    returnFalse(e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    },
    setValue(input) {
      if (input.target) {
        this.value = input.target.value;
        this.active = true;
      } else {
        this.value = input;
      }
      // todo: set value in store
    },
    pushValue(input) {
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
  },
};
</script>

<style lang="scss" scoped>
.SliderButton {
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
  }

  .slider__buttons-undo {
    display: inline-block;
    width: 13px;
    border-radius: 50%;
    background-image: url('/images/return-11.svg');
    background-size: 13px;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #dcdcdc;
  }

  .slider-container {
    color: black;
    cursor: pointer;
    transition: background-color 0.2s ease-in;
    margin-left: 5px;
    margin-right: 5px;
    white-space: nowrap;
    padding: 0;
    display: flex;
    align-items: center;
    background-color: #dcdcdc;

    &:hover {
      background-color: darkgray;
    }

    &.isActive {
      background-color: darkgray;
    }

    .slider-tool {
      margin-left: 0;
      margin-right: 0;
      display: flex;
      transition: all 0.2s ease-in;
      width: 0;
      opacity: 0;

      &.opened {
        margin-left: 10px;
        margin-right: 10px;
        transition: all 0.2s ease-in;
        width: 155px;
        opacity: 1;
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
</style>
