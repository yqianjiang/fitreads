import { createSlice } from "@reduxjs/toolkit";
import stores from "../../lib/stores";
import { format } from "date-fns";

// Saving to local storage
const saveToLocalStorage = (wordLists) => {
  stores.setLocal("userVocabulary", wordLists);
};

// Load from local storage
const initialState = {
  newWords: {},
  familiarWords: {},
  targetWords: {},
};
if (typeof localStorage !== "undefined") {
  const newState = stores.getLocal("userVocabulary");
  if (newState) {
    initialState.familiarWords = newState.familiarWords;
    initialState.targetWords = newState.targetWords;
    initialState.newWords = newState.newWords;
  }
}

export const vocabularySlice = createSlice({
  name: "vocabulary",
  initialState,
  reducers: {
    addWordToVocabulary: (state, action) => {
      const { word, vocabulary } = action.payload;
      if (word?.word) {
        state[vocabulary][word.word] = {
          createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
          ...word,
        };
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
          state[vocabulary][word.word] = {
            createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
            ...word,
          };
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
