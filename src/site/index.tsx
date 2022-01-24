import * as React from "react";
import { Theme } from "@twilio-paste/theme";
import { useDarkMode } from "@hooks/useDarkMode";
import { SiteBody } from "./SiteBody";
import { DarkModeContext } from "../context/DarkModeContext";
import { SITE_BREAKPOINTS } from "../constants";
import ToastsProvider from "../context/ToastsProvider";

const SiteWrapper: React.FC = ({ children }) => {
  const [theme, toggleMode, componentMounted] = useDarkMode();

  return (
    <Theme.Provider theme={theme} customBreakpoints={SITE_BREAKPOINTS}>
      <DarkModeContext.Provider value={{ theme, toggleMode, componentMounted }}>
        <ToastsProvider>
          <SiteBody>{children}</SiteBody>
        </ToastsProvider>
      </DarkModeContext.Provider>
    </Theme.Provider>
  );
};

export { SiteWrapper };
