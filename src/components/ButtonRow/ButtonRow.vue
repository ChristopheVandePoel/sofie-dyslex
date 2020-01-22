<template>
  <div class="tool__buttons--row">
    <Button @click.native="toggleActive" class="row-title">{{ title }}</Button>
    <slot v-if="isExpanded" />
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
  flex-wrap: wrap;

  > * {
    margin-bottom: 5px;
  }

  .ButtonRow__expand {
    opacity: 0;
    transition: all ease-in 0.2s;
  }

  .ButtonRow__children {
    display: none;
  }

  &:hover {
    .ButtonRow__expand {
      opacity: 1;
      transition: all ease-in 0.2s;
    }
  }
}

.row-title {
  background-color: gray;
}
</style>
