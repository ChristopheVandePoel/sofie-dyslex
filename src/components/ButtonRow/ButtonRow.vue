<template>
  <div class="tool__buttons--row" :class="{
    disabled: disabled,
    isLast: isLast,
  }">
    <Button @click.native="toggleActive" class="row-title">{{ title }}</Button>
    <div class="button-container">
      <slot v-if="isExpanded" />
      <IconButton
        class="ButtonRow__expand"
        :icon="isExpanded ? 'minus' : 'plus'"
        @click.native="toggleActive"
      />
    </div>
  </div>
</template>

<script>
import Button from '../Button/Button.vue';
import IconButton from '../Icon/IconButton.vue';

export default {
  name: 'ButtonRow',
  components: { IconButton, Button },
  props: {
    title: String,
    expanded: Boolean,
    disabled: Boolean,
    onDisable: Function,
    isLast: Boolean,
  },
  data() {
    return {
      isExpanded: this.expanded,
    };
  },
  methods: {
    toggleActive() {
      if (this.isExpanded && this.onDisable) {
        this.onDisable();
      }
      this.isExpanded = !this.isExpanded;
    },
  },
};
</script>

<style lang="scss" scoped>
.tool__buttons--row {
  font-size: 12px;
  display: flex;
  flex-wrap: nowrap;

  &.disabled {
    opacity: 0.5; // re-enable when done
    pointer-events: none;
  }

  &.isLast {
    margin-bottom: -1px;
  }

  .ButtonRow__expand {
    opacity: 0;
    transition: all ease-in 0.5s;

    @media (max-width: 1000px) {
      opacity: 1;
    }
  }

  .ButtonRow__children {
    display: none;
  }

  &:hover {
    .ButtonRow__expand {
      opacity: 1;
      transition: all ease-in 0.5s;
    }
  }
}

.row-title {
  background-color: #999999;
  max-height: 12px;
  padding: 4px 5px 6px;

  &:hover {
    background-color: #999999;
    }
  }

.button-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  > * {
    margin-bottom: 3px;
  }
}


@media (max-width: 1000px) {
  .tool__buttons--row {
    font-size: 10px;
  }

  .row-title {
    max-height: 12px;
    padding: 2px 5px 4px;
  }
}
@media (min-width: 2000px) {
  .tool__buttons--row {
    font-size: 18px;
  }

  .row-title {
    max-height: 15px;
    padding: 7px 10px 9px;
  }
}

/* alles wat specifiek voor de donkere versie is, zet je onderaan,
  tussen .dark-mode {} tags: (kopieer gewoon de stukken die je wilt veranderen)
 */

.dark-mode {
  .row-title {
  background-color: #ffffff;
  }
}

</style>
