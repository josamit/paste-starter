import * as React from "react";
import { Box } from "@twilio-paste/box";
import { styled } from "@twilio-paste/styling-library";
import { ContactUsMenu } from "@site/sidebar/ContactUsMenu";
import { SITE_MASTHEAD_HEIGHT } from "../../constants";
import { SidebarNavigation } from "./SidebarNavigation";

const StyledSidebar = styled(Box)(() => ({
  height: `calc(100vh - ${SITE_MASTHEAD_HEIGHT}px)`,
  WebkitOverflowScrolling: "touch",
}));

const Sidebar: React.VFC = () => {
  return (
    <StyledSidebar
      as="aside"
      backgroundColor="colorBackground"
      borderRightColor="colorBorderInverseWeaker"
      borderRightWidth="borderWidth10"
      borderRightStyle="solid"
      position="sticky"
      top="0px"
      width="sizeSidebar"
      display={["none", "none", "flex"]}
      flexDirection="column"
      zIndex="zIndex20"
    >
      <SidebarNavigation />
      <ContactUsMenu />
    </StyledSidebar>
  );
};

export { Sidebar };
