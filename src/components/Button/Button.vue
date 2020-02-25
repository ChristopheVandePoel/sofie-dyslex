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
  padding: 4px 5px 6px;
  margin-right: 3px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  margin-bottom: 3px;

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently
    supported by Chrome, Opera and Firefox */


  &:hover {
    background-color: #cccccc;
  }

  &.isActive {
    background-color: #cccccc;
  }

  &.disable {
    // opacity: 0.3; re-enable when done
    pointer-events: none;
  }
}
</style>
