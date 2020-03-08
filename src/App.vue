<template>
  <div
    class="container"
    :class="{
      'dark-mode': isDark,
    }"
  >
    <div class="clipping-container">
      <!-- Info Section, hidden by default -->
      <InfoSection :open="infoOpen" />

      <SquareButton class="open-info-button" @click.native="toggleInfoOpen">about</SquareButton>
      <div class="bottom-right-containers">
        <SquareButton class="random-button" @click.native="triggerRandom">Random</SquareButton>
        <SquareButton class="reset-button" @click.native="resetState">reset</SquareButton>
      </div>

      <!-- Left Menu -->
      <LeftMenu />

      <!--  Input text -->
      <MainTextArea />

      <!-- Bottom menu -->
      <BottomMenu />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import LeftMenu from './components/LeftMenu/LeftMenu.vue';
import BottomMenu from './components/BottomMenu/BottomMenu.vue';
import MainTextArea from './components/MainTextArea/MainTextArea.vue';
import InfoSection from './components/InfoSection/InfoSection.vue';
import './assets/fonts/stylesheet.css';
import './assets/css/slider.css';
import SquareButton from './components/Button/SquareButton';

export default {
  name: 'app',
  components: {
    SquareButton,
    MainTextArea,
    BottomMenu,
    LeftMenu,
    InfoSection,
  },
  computed: {
    ...mapState(['generalState', 'defaultGeneralState', 'infoOpen', 'preset', 'randomState', 'isPlaying']),
    isDark() {
      return this.generalState.background !== 'bright';
    },
  },
  methods: {
    ...mapMutations(['toggleInfoOpen', 'setRandom', 'setGeneral', 'setPreset', 'setPause', 'setPlay', 'setReset']),
    triggerRandom() {
      this.setPause();
      this.setReset();
      this.setRandom();
      this.setPreset();
      this.setGeneral();
      this.setPlay();
    },
    resetState() {
      this.setGeneral(this.defaultGeneralState);
      this.setPreset(0);
    },
  },
};
</script>

<style lang="scss">
  @import url("https://use.typekit.net/zso7zcf.css");
/* http://meyerweb.com/eric/tools/css/reset/
  v2.0 | 20110126
  License: none (public domain) */
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

input:matches([type='button'], [type='submit'], [type='reset']):active,
input[type='file']::-webkit-file-upload-button:active,
button:active {
  color: inherit;
}

/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

body {
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: #f8f8f8;
  *::selection {
    background: rgba(0, 0, 0, .095);
  }
}

ol,
ul {
  list-style: none;
}

blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

/* General layout */
html {
  padding: 0;
  margin: 0;
  height: 100vh;
}

body {
  padding: 0;
  margin: 0;
  height: 100vh;
  overflow: hidden;
  font-family: 'roboto-mono', monospace;
  font-weight: 500;
  background-color: whitesmoke;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  box-sizing: border-box;
}

.clipping-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.open-info-button {
  z-index: 999;
  position: fixed;
  right: 10px;
  text-align: right;
  width: 80px;


  @media (max-width: 1000px) {
  }

  @media (min-width: 2000px) {
    right: 10px;
  }

  top: 10px;
}


.bottom-right-containers {
  display: flex;
  flex-direction: row;
  z-index: 999;
  position: fixed;
  right: 10px;
  bottom: 10px;
}

.dark-mode {
  &.container {
    background-color: black;
  }
}
</style>
