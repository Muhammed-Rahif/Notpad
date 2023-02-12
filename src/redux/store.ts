import { configureStore } from "@reduxjs/toolkit";
import modelReducer from "./reducers/modal";
import notepadReducer from "./reducers/notepad";

export const store = configureStore({
  reducer: {
    modal: modelReducer,
    notepad: notepadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
