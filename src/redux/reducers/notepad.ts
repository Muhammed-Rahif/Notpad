import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

export interface NotepadState {
  name?: string;
  content?: string;
  id?: string;
}

const initialState: NotepadState = {};

export const notepadSlice = createSlice({
  name: "notepad",
  initialState,
  reducers: {
    setNotepad: (state, action: PayloadAction<NotepadState>) => {
      state.content = action.payload.content;
      state.name = action.payload.name;
      state.id = action.payload.id;
    },
    updateNotepad: (state, action: PayloadAction<NotepadState>) => {
      state = { ...state, ...action.payload };
    },
  },
});

export const { setNotepad, updateNotepad } = notepadSlice.actions;

export default notepadSlice.reducer;
