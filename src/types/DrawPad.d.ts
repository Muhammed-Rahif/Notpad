import { Dispatch } from "react";

export type DrawModeContextType = {
  drawMode: boolean;
  setDrawMode: (isDrawMode: boolean) => void;
};

export type DrawPadRefContextType = {
  drawPadRef: any;
  setDrawPadRef: Dispatch<React.SetStateAction<any>>;
};
