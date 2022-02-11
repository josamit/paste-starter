import * as React from "react";
import { Theme } from "@twilio-paste/theme";
import { useDarkMode } from "@hooks/useDarkMode";
import { DarkModeContext } from "@context/DarkModeContext";
import ToastsProvider from "@context/ToastsProvider";
import { SiteBody } from "./SiteBody";
import { SITE_BREAKPOINTS } from "../constants";

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
