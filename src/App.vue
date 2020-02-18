<template>
  <div
    class="container"
    :class="{
      'dark-mode': isDark,
    }"
  >
    <!-- Info Section, hidden by default -->
    <InfoSection v-if="infoOpen" />

    <SquareButton class="open-info-button" @click.native="toggleInfoOpen">info</SquareButton>
    <div class="bottom-right-containers">
      <SquareButton @click.native="() => setPreset()">Random</SquareButton>
      <SquareButton @click.native="resetState">reset</SquareButton>
    </div>

    <!-- Left Menu -->
    <LeftMenu />

    <!--  Input text -->
    <MainTextArea />

    <BottomMenu />
    <!-- Bottom menu -->
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import LeftMenu from './components/LeftMenu/LeftMenu.vue';
import BottomMenu from './components/BottomMenu/BottomMenu.vue';
import MainTextArea from './components/MainTextArea/MainTextArea.vue';
import InfoSection from './components/InfoSection/InfoSection.vue';
import './assets/fonts/ibm.css';
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
    ...mapState(['generalState', 'infoOpen', 'preset']),
    isDark() {
      return this.generalState.interface !== 'bright';
    },
  },
  methods: {
    ...mapMutations(['toggleInfoOpen', 'setPreset', 'setPreset']),
    resetState() {
      this.setPreset(this.preset);
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
  background-color: whitesmoke;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.open-info-button {
  z-index: 999;
  position: absolute;
  right: -2px;
}


.bottom-right-containers {
  display: flex;
  flex-direction: row;
  z-index: 999;
  position: absolute;
  right: 2px;
  bottom: 2px;
}

.dark-mode {
  &.container {
    background-color: black;
  }
}
</style>
