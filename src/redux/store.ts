import { configureStore } from "@reduxjs/toolkit";
import modelReducer from "./reducers/modal";
import notepadReducer, { NotepadState } from "./reducers/notepad";
import undoable, { ActionTypes } from "redux-undo";

export const store = configureStore({
  reducer: {
    modal: modelReducer,
    notepad: undoable<Partial<NotepadState>>(notepadReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
