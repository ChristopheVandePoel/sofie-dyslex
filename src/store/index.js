import Vue from 'vue';
import Vuex from 'vuex';
import { words } from '../random-content/words';
import { sentences } from '../random-content/sentences';
import { paragraphs } from '../random-content/paragraphs';
import { presets } from './presets';
import { generals } from './states';
import { presetSentences } from './sentences';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    textTransforms: {
      ...presets[0],
    },
    isPlaying: false,
    up: true,
    tick: 100,
    tickCounter: 0,
    intervalId: null,
    menusOpen: true,
    infoOpen: false,
    textField: {
      word: {
        raw: 'Type',
        transformed: 'Type',
      },
      input: {
        raw: 'Type',
        transformed: 'Type',
      },
    },
    defaultGeneralState: {
      font: 'sans',
      letterCase: 'lower',
      alignment: 'center',
      background: 'bright',
      weight: 'regular',
      size: 65,
      speed: 50,
      color: 0,
    },
    generalState: {
      type: 'word',
      font: 'sans',
      letterCase: 'lower',
      alignment: 'center',
      background: 'bright',
      weight: 'regular',
      size: 65,
      speed: 50,
      color: 0,
    },
    enabledSentences: false,
    enabledWords: false,
    pausedInitialAnimation: false,
    preset: 0,
    randomState: false,
    isSelectable: true,
    caretPosition: 0,
  },
  mutations: {
    setPlay(state) {
      const typeText = state.textField.input;
      Vue.set(typeText, 'transformed', typeText.raw);
      state.isPlaying = true;
      if (!this.intervalId) {
        this.intervalId = setInterval(() => {
          const speed = 1 + state.generalState.speed / 15;
          if (state.tick <= 100 && state.up) {
            state.tick += speed;
            if (state.tick >= 100) {
              state.up = false;
              state.tickCounter += 1;
            }
          }
          if (state.tick >= -100 && !state.up) {
            state.tick -= speed;
            if (state.tick <= -100) {
              state.up = true;
            }
          }
        }, 20);
      }
    },
    setPause(state) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      state.isPlaying = false;
    },
    setReset(state) {
      state.tick = 100;
      clearInterval(this.intervalId);
      this.intervalId = null;
      state.isPlaying = false;
    },
    setRandom(state) {
      state.randomState = true;
    },
    storeSelection(state, position) {
      state.caretPosition = position;
    },
    disableSelection(state) {
      state.isSelectable = false;
    },
    restoreSelection(state) {
      state.isSelectable = true;
    },
    switchBySentences(state, { toValue, text }) {
      if (toValue === 'letters') {
        state.enabledWords = false;
        state.enabledSentences = false;
        state.generalState.type = 'word';
        state.textField.input.transformed = text;
      }
      if (toValue === 'words') {
        state.enabledWords = true;
        state.enabledSentences = false;
        state.generalState.type = 'sentence';
        state.textField.input.transformed = text;
      }
      if (toValue === 'sentences') {
        state.enabledWords = true;
        state.enabledSentences = true;
        state.generalState.type = 'paragraph';
        state.textField.input.transformed = text;
      }
    },
    setGeneral(state, input = {}) {
      const value = state.randomState ? generals[state.preset] : input;

      if (!state.randomState && value.type) {
        const typeText = state.textField.input;
        let list = words;

        state.enabledWords = false;
        state.enabledSentences = false;

        if (value.type === 'sentence') {
          state.enabledWords = true;
          state.enabledSentences = false;
          list = sentences;
        }

        if (value.type === 'paragraph') {
          state.enabledWords = true;
          state.enabledSentences = true;
          list = paragraphs;
        }
        const newText = list[Math.floor(Math.random() * list.length)];
        Vue.set(typeText, 'raw', newText);
        Vue.set(typeText, 'transformed', newText);
      } else if (state.randomState) {
        Vue.set(state.textField.input, 'raw', presetSentences[state.preset].input.raw);
        Vue.set(state.textField.input, 'transformed', presetSentences[state.preset].input.transformed);
      }

      let valueResult = value;
      if (value.background) {
        valueResult = {
          ...value,
          color: value.background === 'bright' ? 0 : 1,
        };
      }

      state.pausedInitialAnimation = true;
      state.randomState = false;
      state.generalState = {
        ...state.generalState,
        ...valueResult,
      };
    },
    setLetterTransforms(state, input) {
      console.log('setting this', input);
      const typeText = state.textField.input;
      Vue.set(typeText, 'transformed', typeText.raw);
      let currentValue = state.textTransforms[input.kind][input.type];
      let needsUpdate = false;

      if (!currentValue) {
        currentValue = {
          active: true,
        };
        needsUpdate = true;
      }

      Vue.set(state.textTransforms[input.kind], input.type, {
        ...currentValue,
        ...input.settings,
      });

      if (needsUpdate || currentValue.active !== input.settings.active) {
        const activeMap = {
          letters: 'activeLetters',
          words: 'activeWords',
          sentences: 'activeSentences',
        };
        const activeChanged = activeMap[input.kind];
        state.textTransforms[activeChanged] = Object.keys(state.textTransforms[input.kind]).filter(
          entry => state.textTransforms[input.kind][entry].active,
        ) || [];
      }
    },
    setTextFields(state, input) {
      const typeText = state.textField.input;
      if (input !== typeText.raw) {
        Vue.set(typeText, 'raw', input);
      }
    },
    toggleMenusOpen(state) {
      state.menusOpen = !state.menusOpen;
    },
    toggleInfoOpen(state) {
      state.infoOpen = !state.infoOpen;
    },
    setPreset(state, toPreset) {
      const randomPreset = state.preset === presets.length - 1 ? 0 : state.preset + 1;
      const preset = (toPreset || toPreset === 0) ? toPreset : randomPreset;
      state.preset = preset;

      const activePreset = presets[preset];

      console.log(preset, activePreset);

      // set letter presets
      Object.keys(state.textTransforms.letters).forEach(letter => {
        if (!activePreset.activeLetters.includes(letter)) {
          Vue.set(state.textTransforms.letters[letter], 'active', false);
        }
      });

      activePreset.activeLetters.forEach(letter => {
        if (!state.textTransforms.letters[letter]) {
          Vue.set(state.textTransforms.letters, letter, {});
        }
        Vue.set(state.textTransforms.letters[letter], 'active', activePreset.letters[letter].active);
        Vue.set(state.textTransforms.letters[letter], 'value', activePreset.letters[letter].value);
        Vue.set(state.textTransforms.letters[letter], 'tick', activePreset.letters[letter].tick);
      });

      Vue.set(state.textTransforms, 'activeLetters', [...activePreset.activeLetters]);

      // set word presets
      Object.keys(state.textTransforms.words).forEach(word => {
        if (!activePreset.activeWords.includes(word)) {
          Vue.set(state.textTransforms.words[word], 'active', false);
        }
      });

      activePreset.activeWords.forEach(word => {
        Vue.set(state.textTransforms.words, word, { ...activePreset.words[word] });
      });

      Vue.set(state.textTransforms, 'activeWords', [...activePreset.activeWords]);

      // set sentence presets
      Object.keys(state.textTransforms.sentences).forEach(sentence => {
        if (!activePreset.activeSentences.includes(sentence)) {
          Vue.set(state.textTransforms.sentences[sentence], 'active', false);
        }
      });

      activePreset.activeSentences.forEach(sentence => {
        Vue.set(state.textTransforms.sentences, sentence, { ...activePreset.sentences[sentence] });
      });

      Vue.set(state.textTransforms, 'activeSentences', [...activePreset.activeSentences]);
    },
    resetTypes(state, allTypes) {
      console.log(allTypes);
    },
  },
  getters: {
    getLetterTransforms: state =>
      state.textTransforms.activeLetters.map(key => ({
        ...state.textTransforms.letters[key],
        key,
      })),
    getWordTransforms: state =>
      state.textTransforms.activeWords.map(key => ({
        ...state.textTransforms.words[key],
        key,
      })),
    getSentencesTransforms: state =>
      state.textTransforms.activeSentences.map(key => ({
        ...state.textTransforms.sentences[key],
        key,
      })),
  },
  actions: {},
  modules: {},
});
