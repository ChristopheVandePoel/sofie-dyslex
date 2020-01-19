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
  transition: background-color 0.2s ease-in;
  padding: 5px;
  margin-right: 5px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  background-color: #DCDCDC;

  &:hover {
    background-color: darkgray;
    transition: background-color 0.2s ease-in;
  }

  &.isActive {
    background-color: darkgray;
  }
}
</style>
