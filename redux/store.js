import { configureStore } from "@reduxjs/toolkit";
import vocabularyReducer from "./slices/vocabularySlice";

const store = configureStore({
  reducer: {
    vocabulary: vocabularyReducer,
  },
});

// Saving to local storage
const saveToLocalStorage = (wordLists) => {
  localStorage.setItem("userVocabulary", JSON.stringify(wordLists));
};

store.subscribe(() => {
  const state = store.getState();
  saveToLocalStorage(state.vocabulary);
});

export default store;
