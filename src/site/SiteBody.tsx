import * as React from "react";
import { styled, themeGet } from "@twilio-paste/styling-library";
import { Box } from "@twilio-paste/box";
import { useWindowSize } from "@hooks/useWindowSize";
import AnnouncementsContainer from "@app/announcements/AnnouncementsContainer";
import { Sidebar } from "./sidebar";
import { SiteHeader } from "./site-header";
import { SITE_BREAKPOINTS } from "../constants";
import { WindowSizeContext } from "../context/WindowSizeProvider";

/* Wraps the main region and footer on the doc site page */
const StyledSiteBody = styled.div`
  display: flex;
  min-width: 240px;
  overflow: auto;
  /* note: needed for scrollspy, removing position breaks site layout  */
  position: relative;

  @supports (scroll-behavior: smooth) {
    scroll-behavior: smooth;
  }

  @supports (display: grid) {
    display: grid;
    grid-template-columns: 1fr;

    @media screen and (min-width: ${SITE_BREAKPOINTS[1]}) {
      grid-template-columns: ${themeGet("sizes.sizeSidebar")} 1fr;
    }
  }
`;

export const SiteBody: React.FC = ({ children }) => {
  const windowSize = useWindowSize();

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <WindowSizeContext.Provider value={{ ...windowSize }}>
        <AnnouncementsContainer/>
        <SiteHeader/>
        <StyledSiteBody id="styled-site-body">
          {windowSize.breakpointIndex === undefined ||
           windowSize.breakpointIndex > 1 ? (
             <Sidebar/>
           ) : null}
          <Box flex="1" minWidth="size0">
            <main id="paste-starter-app-content-area">{children}</main>
          </Box>
        </StyledSiteBody>
      </WindowSizeContext.Provider>
    </Box>
  );
};
