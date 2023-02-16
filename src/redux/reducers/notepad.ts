import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import uuid from "short-uuid";

export interface NotepadState {
  name: string;
  content: string;
  id: string;
}

const initialState: Partial<NotepadState> = {
  name: "Untitled",
  content: "",
  id: uuid.generate(),
};

export const notepadSlice = createSlice({
  name: "notepad",
  initialState,
  reducers: {
    setNotepad: (state, action: PayloadAction<NotepadState>) => {
      return { ...action.payload };
    },
    updateNotepad: (state, action: PayloadAction<Partial<NotepadState>>) => {
      return { ...state, ...action.payload, id: state.id || uuid.generate() };
    },
  },
});

export const { setNotepad, updateNotepad } = notepadSlice.actions;

export default notepadSlice.reducer;
