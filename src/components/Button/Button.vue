<template>
  <span
    class="Button"
    :class="{
      isActive: active,
      disable,
    }"
    ><slot
  /></span>
</template>

<script>
export default {
  props: { active: Boolean, disable: Boolean },
  name: 'Button',
};
</script>

<style lang="scss" scoped>
.Button {
  color: black;
  cursor: pointer;
  padding: 5px;
  margin-right: 3px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  margin-bottom: 3px;

  &:hover {
    background-color: #cccccc;
  }

  &.isActive {
    background-color: #cccccc;
  }

  &.disable {
    opacity: 0.3;
    pointer-events: none;
  }
}
</style>
