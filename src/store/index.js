import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    textTransforms: {
      letters: {},
      activeLetters: [],
      words: {},
      sentences: {},
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
      paragraph: {
        raw: 'For years, researchers and medical scientists have tried to formulate a clear definition for dyslexia. \n\n Unfortunately, they have failed to reach consensus due to the high variability of symptom patterns between people with dyslexia, which prevents the development of a standard treatment procedure.',
        transformed: 'For years, researchers and medical scientists have tried to formulate a clear definition for dyslexia. \n\n Unfortunately, they have failed to reach consensus due to the high variability of symptom patterns between people with dyslexia, which prevents the development of a standard treatment procedure.',
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

      // console.log(letterColor, state.generalState.color, value);
      state.generalState = {
        ...state.generalState,
        ...valueResult,
      };
    },
    setLetterTransforms(state, input) {
      const typeText = state.textField[state.generalState.type];
      Vue.set(typeText, 'transformed', typeText.raw);
      let currentValue = state.textTransforms.letters[input.type];
      let needsUpdate = false;

      if (!currentValue) {
        currentValue = {
          active: true,
        };
        needsUpdate = true;
      }

      Vue.set(state.textTransforms.letters, input.type, {
        ...currentValue,
        ...input.settings,
      });

      if (needsUpdate || currentValue.active !== input.settings.active) {
        state.textTransforms.activeLetters = Object.keys(state.textTransforms.letters).filter(
          entry => state.textTransforms.letters[entry].active,
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
  },
  actions: {},
  modules: {},
});
