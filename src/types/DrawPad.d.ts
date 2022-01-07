import { Dispatch } from "react";

export type DrawingModeContextType = {
  drawMode: boolean;
  setDrawMode: Dispatch<React.SetStateAction<boolean>>;
};
