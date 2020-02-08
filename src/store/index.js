import Vue from 'vue';
import Vuex from 'vuex';
import { words } from '../random-content/words';
import { sentences } from '../random-content/sentences';
import { paragraphs } from '../random-content/paragraphs';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    textTransforms: {
      letters: {},
      activeLetters: [],
      words: {},
      activeWords: [],
      sentences: {},
      activeSentences: [],
      faces: {},
      activeFaces: [],
    },
    generalState: {
      type: 'word',
      font: 'sans',
      letterCase: 'lower',
      alignment: 'center',
      interface: 'bright',
      weight: 'regular',
      size: 70,
      speed: 0,
      color: 0,
    },
    textField: {
      word: {
        raw: 'Type',
        transformed: 'Type',
      },
      sentence: {
        raw: 'Type words to see the changes',
        transformed: 'Type words to see the changes',
      },
      paragraph: {
        raw: 'Type words to see the changes and discover your type of dyslexia.',
        transformed: 'Type words to see the changes and discover your type of dyslexia.',
      },
    },
    isPlaying: false,
    up: true,
    tick: 100,
    tickCounter: 0,
    intervalId: null,
    menusOpen: true,
    infoOpen: false,
  },
  mutations: {
    setPlay(state) {
      const typeText = state.textField[state.generalState.type];
      Vue.set(typeText, 'transformed', typeText.raw);
      state.isPlaying = true;
      if (!this.intervalId) {
        this.intervalId = setInterval(() => {
          const speed = 1 + state.generalState.speed / 30;
          if (state.tick <= 100 && state.up) {
            state.tick += speed;
            if (state.tick >= 100) {
              state.up = false;
              state.tickCounter += 1;
            }
          }
          if (state.tick >= 0 && !state.up) {
            state.tick -= speed;
            if (state.tick <= 0) {
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
    setGeneral(state, value = {}) {
      if (value.type) {
        const typeText = state.textField[value.type];
        let list = words;

        if (value.type === 'sentence') {
          list = sentences;
        }

        if (value.type === 'paragraph') {
          list = paragraphs;
        }
        Vue.set(typeText, 'raw', list[Math.floor(Math.random() * list.length)]);
        Vue.set(typeText, 'transformed', typeText.raw);
      }
      let valueResult = value;
      if (value.interface) {
        valueResult = {
          ...value,
          color: value.interface === 'bright' ? 0 : 1,
        };
      }

      state.generalState = {
        ...state.generalState,
        ...valueResult,
      };
    },
    setLetterTransforms(state, input) {
      const typeText = state.textField[state.generalState.type];
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
      const typeText = state.textField[state.generalState.type];
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
