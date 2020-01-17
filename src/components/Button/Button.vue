<template>
  <span class="Button"><slot/></span>
</template>

<script>
export default {
  name: 'Button',
};
</script>

<style lang="scss" scoped>
.Button {
  color: black;
  cursor: pointer;
  transition: background-color 0.2s ease-in;
  padding: 5px;
  margin-left: 5px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  background-color: #bebebe;

  &:hover {
    background-color: lightgray;
    transition: background-color 0.2s ease-in;
  }
}
</style>
