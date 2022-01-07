import React, { createContext, ReactNode, useState } from "react";
import { AlertBox, AlertBoxContextType } from "../types/AlertBox";
import { DrawingModeContextType } from "../types/DrawPad";

export const AlertBoxContext = createContext<AlertBoxContextType>(
  {} as AlertBoxContextType
);

export const DrawingModeContext = createContext<DrawingModeContextType>(
  {} as DrawingModeContextType
);

function Context({ children }: { children: ReactNode }) {
  const [alertBox, setAlertBox] = useState<AlertBox>(null);
  const [drawMode, setDrawMode] = useState<boolean>(false);

  return (
    <AlertBoxContext.Provider value={{ alertBox, setAlertBox }}>
      <DrawingModeContext.Provider value={{ drawMode, setDrawMode }}>
        {children}
      </DrawingModeContext.Provider>
    </AlertBoxContext.Provider>
  );
}

export default Context;
