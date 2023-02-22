import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface FontState {
  size:
    | 8
    | 9
    | 10
    | 11
    | 12
    | 14
    | 16
    | 18
    | 20
    | 22
    | 24
    | 26
    | 28
    | 36
    | 48
    | 72;
  family:
    | "Maven Pro"
    | "Roboto"
    | "Open Sans"
    | "Montserrat"
    | "Lato"
    | "Poppins"
    | "Source Sans Pro"
    | "Ubuntu"
    | "Quicksand"
    | "Playfair Display"
    | "Raleway"
    | "Oswald";
}

export const fontFamilies = [
  "Maven Pro",
  "Roboto",
  "Open Sans",
  "Montserrat",
  "Lato",
  "Poppins",
  "Source Sans Pro",
  "Ubuntu",
  "Quicksand",
  "Playfair Display",
  "Raleway",
  "Oswald",
];

export const fontSizes = [
  8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72,
];

const initialState: FontState = {
  size: 16,
  family: "Maven Pro",
};

export const fontSlice = createSlice({
  name: "font",
  initialState,
  reducers: {
    setFont: (state, action: PayloadAction<FontState>) => {
      state.family = action.payload.family;
      state.size = action.payload.size;
    },
    setFontFamily: (state, action: PayloadAction<FontState["family"]>) => {
      state.family = action.payload;
    },
    setFontSize: (state, action: PayloadAction<FontState["size"]>) => {
      state.size = action.payload;
    },
  },
});

export const { setFont, setFontFamily, setFontSize } = fontSlice.actions;

export default fontSlice.reducer;
