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
      size: 60,
      speed: 0,
      color: 0,
    },
    textField: {
      word: {
        raw: 'Type',
        transformed: 'Type',
      },
      text: {
        raw: 'Type words to see the changes.',
        transformed: 'Type words to see the changes.',
      },
    },
  },
  mutations: {
    setGeneral(state, value = {}) {
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
      let currentValue = state.textTransforms.letters[input.type];

      if (!currentValue) {
        currentValue = {
          active: true,
        };
      }

      Vue.set(state.textTransforms.letters, input.type, {
        ...currentValue,
        ...input.settings,
      });

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
