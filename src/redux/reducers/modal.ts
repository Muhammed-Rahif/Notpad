import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

export interface ModalState {
  title?: string;
  content?: string | ReactNode;
  open: boolean;
  footer?: ReactNode;
}

const initialState: ModalState = {
  open: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalState>) => {
      state.open = true;
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.footer = action.payload.footer;
    },
    closeModal: (state: any) => {
      Object.keys(state).forEach(key => (state[key] = undefined));
      state.open = false;
    },
  },
});

export const { closeModal, openModal } = modalSlice.actions;

export default modalSlice.reducer;
