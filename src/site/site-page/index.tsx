import React from "react";
import { Box } from "@twilio-paste/box";
import { SITE_CONTENT_MAX_WIDTH } from "../../constants";

const SitePage: React.FC = ({ children }) => {
  return (
    <Box
      paddingX={["space40", "space90"]}
      paddingTop={["space40", "space90"]}
      paddingBottom={["space40", "space90", "space120"]}
      position="relative"
    >
      <Box
        maxWidth={SITE_CONTENT_MAX_WIDTH}
        marginLeft="auto"
        marginRight="auto"
        position="relative"
      >
        {children}
      </Box>
    </Box>
  );
};

export default SitePage;
