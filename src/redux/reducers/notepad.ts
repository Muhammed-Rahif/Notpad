import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import uuid from "short-uuid";
import { Descendant } from "slate";

export interface NotepadState {
  name: string;
  content: Descendant[];
  id: string;
}

const initialState: NotepadState = {
  name: "Untitled",
  content: [
    {
      type: "paragraph",
      children: [{ text: "" }],
    } as Descendant,
  ],
  id: uuid.generate(),
};

export const NOTEPAD_STATE_STORE_KEY = "notepad-state";

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
