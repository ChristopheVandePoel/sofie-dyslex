import Vue from 'vue';
import Vuex from 'vuex';

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
      weight: 10,
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
        raw: 'Type words to see the changes.',
        transformed: 'Type words to see the changes.',
      },
      // paragraph: {
      //   raw: 'Typie woerds taa see the chauges and discouver your type of dyslexia.',
      //   transformed: 'Typie woerds taa see the chauges and discouver your type of dyslexia.',
      // },
      paragraph: {
        raw: 'Type words to see the changes and discover your type of dyslexia.',
        transformed: 'Type words to see the changes and discover your type of dyslexia.',
      },
    },
    isPlaying: false,
    up: true,
    tick: 100,
    intervalId: null,
  },
  mutations: {
    setPlay(state) {
      const typeText = state.textField[state.generalState.type];
      Vue.set(typeText, 'transformed', typeText.raw);
      state.isPlaying = true;
      if (!this.intervalId) {
        this.intervalId = setInterval(() => {
          if (state.tick <= 100 && state.up) {
            state.tick += 1;
            if (state.tick >= 100) {
              state.up = false;
            }
          }
          if (state.tick >= 0 && !state.up) {
            state.tick -= 1;
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
      const typeText = state.textField[state.generalState.type];
      Vue.set(typeText, 'transformed', typeText.raw);
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
  },
  getters: {
    getLetterTransforms: state => state.textTransforms.activeLetters.map(key => ({
      ...state.textTransforms.letters[key],
      key,
    })),
    getWordTransforms: state => state.textTransforms.activeWords.map(key => ({
      ...state.textTransforms.words[key],
      key,
    })),
    getSentencesTransforms: state => state.textTransforms.activeSentences.map(key => ({
      ...state.textTransforms.sentences[key],
      key,
    })),
  },
  actions: {},
  modules: {},
});
