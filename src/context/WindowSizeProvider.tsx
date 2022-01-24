import * as React from "react";
import { WindowSizeState } from "@hooks/useWindowSize";

export const WindowSizeContext =
  React.createContext<WindowSizeState | null>(null);

export const useWindowSizeContext = (): WindowSizeState => {
  const context = React.useContext(WindowSizeContext);
  if (!context) {
    throw new Error("useWindowSizeContext must be used with WindowSizeContext");
  }
  return context;
};
