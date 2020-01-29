<template>
  <span class="Button" :class="{
    isActive: active,
  }"><slot /></span>
</template>

<script>
export default {
  props: ['active'],
  name: 'Button',
};
</script>

<style lang="scss" scoped>
.Button {
  color: black;
  cursor: pointer;
  padding: 5px;
  padding-top: 3px;
  margin-right: 3px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  background-color: #ffffff;

  &:hover {
    background-color: #cccccc;
  }

  &.isActive {
    background-color: #cccccc;
  }
}
</style>
