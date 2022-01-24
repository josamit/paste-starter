import * as React from "react";
import { Box } from "@twilio-paste/box";

export const SidebarNestedList: React.FC = (props) => {
  const { children } = props;
  return (
    <Box
      as="ul"
      padding="space0"
      margin="space0"
      listStyleType="none"
      textTransform="capitalize"
    >
      {children}
    </Box>
  );
};
