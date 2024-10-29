import { configureStore } from "@reduxjs/toolkit";
import editReducer from "./editSlice";
const store = configureStore({
  reducer: {
    counter: editReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
