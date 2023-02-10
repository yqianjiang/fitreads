import { createSlice } from "@reduxjs/toolkit";
import stores from "../../lib/stores";

// Saving to local storage
const saveToLocalStorage = (wordLists) => {
  stores.setLocal("userVocabulary", wordLists);
};

// Load from local storage
const initialState = {
  unknownWords: {},
  knownWords: {},
  targetWords: {},
}
if (typeof localStorage !== 'undefined') {
  const newState = stores.getLocal("userVocabulary");
  if (newState) {
    initialState.knownWords = newState.knownWords;
    initialState.targetWords = newState.targetWords;
    initialState.unknownWords = newState.unknownWords;
  }
}

export const vocabularySlice = createSlice({
  name: "vocabulary",
  initialState,
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
      saveToLocalStorage(state);
    },
    updateWordInVocabulary: (state, action) => {
      const { word, vocabulary } = action.payload;
      if (word) {
        state[vocabulary][word.word] = {
          ...state[vocabulary][word.word],
          ...word,
        };
      }
      saveToLocalStorage(state);
    },
    deleteWordFromVocabulary: (state, action) => {
      const { word, vocabulary } = action.payload;
      if (word?.word && word.word in state[vocabulary]) {
        delete state[vocabulary][word.word];
      }
      saveToLocalStorage(state);
    },
    addWordsToVocabulary: (state, action) => {
      const { words, vocabulary } = action.payload;
      for (const word of words) {
        if (word?.word) {
          state[vocabulary][word.word] = word;
        }
      }
      saveToLocalStorage(state);
    },
    deleteWordsFromVocabulary: (state, action) => {
      const { words, vocabulary } = action.payload;
      for (const word of words) {
        if (word?.word && word.word in state[vocabulary]) {
          delete state[vocabulary][word.word];
        }
      }
      saveToLocalStorage(state);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addWordToVocabulary,
  updateWordInVocabulary,
  deleteWordFromVocabulary,
  addWordsToVocabulary,
  deleteWordsFromVocabulary,
} = vocabularySlice.actions;

export default vocabularySlice.reducer;
