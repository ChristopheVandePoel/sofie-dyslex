<template>
  <div class="tool__buttons--row">
    <Button @click.native="toggleActive" class="row-title">{{ title }}</Button>
    <div class="button-container">
      <slot v-if="isExpanded" />
    </div>
    <IconButton
      class="ButtonRow__expand"
      :icon="isExpanded ? 'minus' : 'plus'"
      @click.native="toggleActive"
    />
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
  },
  data() {
    return {
      isExpanded: this.expanded,
    };
  },
  methods: {
    toggleActive() {
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

  > * {
    margin-bottom: 3px;
  }

  .ButtonRow__expand {
    opacity: 0;
    transition: all ease-in 0.5s;
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
  max-height: 14px;

  &:hover {
    background-color: #999999;
    }
  }
.button-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
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
