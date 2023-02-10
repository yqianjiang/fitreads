import { configureStore } from "@reduxjs/toolkit";
import vocabularyReducer from "./slices/vocabularySlice";

const store = configureStore({
  reducer: {
    vocabulary: vocabularyReducer,
  },
});

export default store;
