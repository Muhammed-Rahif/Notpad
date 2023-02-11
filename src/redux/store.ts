import { configureStore } from "@reduxjs/toolkit";
import modelReducer from "./reducers/modelReducer";

export const store = configureStore({
  reducer: {
    modal: modelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
