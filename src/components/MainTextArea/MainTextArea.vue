<template>
  <div class="top-container">
    <div class="text-field__main">
      <div contenteditable id="main-text" class="textarea-container">
        <!-- This is where the text will come. Leave empty -->
        Text
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainTextArea',
};
</script>
<style lang="scss" scoped>
.top-container {
  flex: 20 0;
  display: flex;
}

.text-field__main {
  width: 100%;
  position: relative;
  text-align: center;
  font-family: "Helvetica", sans-serif;

  &.seriffed {
    font-family: "Times New Roman", serif;
  }
  &.all-caps {
    text-transform: uppercase;
  }
  &.align-left {
    text-align: left;
  }
  &.align-center {
    text-align: center;
  }
  &.align-right {
    text-align: right;
  }
  &.align-block {
    text-align: justify;
  }

  &.font-100 div {
    font-weight: 100;
  }
  &.font-200 div {
    font-weight: 200;
  }
  &.font-300 div {
    font-weight: 300;
  }
  &.font-400 div {
    font-weight: 400;
  }
  &.font-500 div {
    font-weight: 500;
  }
  &.font-600 div {
    font-weight: 600;
  }
}

.textarea-container {
  color: black;
  display: block;
  font-size: 280px;
  position: relative;
  top: 45%;
  transform: translateY(-50%);
  height: auto;

  &.input-text {
    font-size: 120px;
    width: 80%;
    margin: 0 auto;
  }

  &:focus {
    outline: none;
  }
}
</style>
