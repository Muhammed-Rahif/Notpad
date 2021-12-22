import React, { createContext, ReactNode, useState } from "react";
import { AlertBox, AlertBoxContextType } from "../types/AlertBox";

export const AlertBoxContext = createContext<AlertBoxContextType>(
  {} as AlertBoxContextType
);

function Context({ children }: { children: ReactNode }) {
  const [alertBox, setAlertBox] = useState<AlertBox>(null);

  return (
    <AlertBoxContext.Provider value={{ alertBox, setAlertBox }}>
      {children}
    </AlertBoxContext.Provider>
  );
}

export default Context;
