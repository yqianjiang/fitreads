import { createSlice } from "@reduxjs/toolkit";

export const vocabularySlice = createSlice({
  name: "vocabulary",
  initialState: {
    unknownWords: {},
    knownWords: {},
    targetWords: {},
  },
  reducers: {
    addWordToVocabulary: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const { word, vocabulary } = action.payload;
      if (word?.word) {
        state[vocabulary][word.word] = word;
      }
    },
    updateWordInVocabulary: (state, action) => {
      const { word, vocabulary } = action.payload;
      if (word) {
        state[vocabulary][word.word] = {
          ...state[vocabulary][word.word],
          ...word,
        };
      }
    },
    deleteWordFromVocabulary: (state, action) => {
      const { word, vocabulary } = action.payload;
      if (word?.word && word.word in state[vocabulary]) {
        delete state[vocabulary][word.word];
      }
    },
    readVocabulary: (state) => {
      const voc = localStorage.getItem("userVocabulary");
      if (voc) {
        const newState = JSON.parse(voc);
        state.knownWords = newState.knownWords;
        state.targetWords = newState.targetWords;
        state.unknownWords = newState.unknownWords;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addWordToVocabulary,
  updateWordInVocabulary,
  deleteWordFromVocabulary,
  readVocabulary,
} = vocabularySlice.actions;

export default vocabularySlice.reducer;
