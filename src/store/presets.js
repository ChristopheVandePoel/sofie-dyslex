export const presets = [
  {
    letters: {},
    activeLetters: [],
    words: {},
    activeWords: [],
    sentences: {},
    activeSentences: [],
    faces: {},
    activeFaces: [],
  },
  {
    letters: {
      'letters-backwards': { active: true, value: '40', tick: 0 },
      'free-tremble': { active: true, value: '45', tick: 0 },
      hopping: { active: true, value: '41', tick: 0 },
      multiply: { active: false, value: 0, tick: 1 },
    },
    activeLetters: ['letters-backwards', 'free-tremble', 'hopping'],
    words: { interspace: { active: true, value: '56', tick: 0 } },
    activeWords: ['interspace'],
    sentences: { 'line-spacing': { active: true, value: '39', tick: 0 } },
    activeSentences: ['line-spacing'],
    faces: {},
    activeFaces: [],
  },
  {
    letters: { 'free-tracking': { active: false, value: 0, tick: 0 } },
    activeLetters: [],
    words: { tilting: { active: true, value: '31', tick: 0 } },
    activeWords: ['tilting'],
    sentences: { 'line-spacing': { active: true, value: '37', tick: 0 } },
    activeSentences: ['line-spacing'],
    faces: {},
    activeFaces: [],
  },
];