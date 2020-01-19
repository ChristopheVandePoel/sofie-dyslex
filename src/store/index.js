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
      size: 20,
      speed: 0,
      color: 0,
    },
    textField: {
      word: {
        raw: 'Text',
        transformed: 'Text',
      },
      text: {
        raw: 'This is is a sentence',
        transformed: 'This is a sentence',
      },
    },
  },
  mutations: {
    setGeneral(state, value = {}) {
      state.generalState = {
        ...state.generalState,
        ...value,
      };
    },
    setLetterTransforms(state, input) {
      let currentValue = state.textTransforms.letters[input.type];

      if (!currentValue) {
        currentValue = {
          active: true,
        };
      }

      state.textTransforms.letters[input.type] = {
        ...currentValue,
        ...input.settings,
      };
      state.textTransforms.activeLetters = Object.keys(state.textTransforms.letters).filter(
        entry => state.textTransforms.letters[entry].active,
      ) || [];
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
