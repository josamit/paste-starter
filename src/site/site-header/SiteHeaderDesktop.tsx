import * as React from "react";
import { Box } from "@twilio-paste/box";
import { Stack } from "@twilio-paste/stack";
import { SiteHeaderSearch } from "./SiteHeaderSearch";
import { SiteHeaderLogo } from "./SiteHeaderLogo";
import { DarkModeToggle } from "./DarkModeToggle";

const SiteHeaderDesktop: React.VFC = () => {
  return (
    <Box
      as="header"
      display={["none", "none", "flex"]}
      alignItems="stretch"
      backgroundColor="colorBackgroundBodyInverse"
      borderBottomColor="colorBorderInverseWeaker"
      borderBottomWidth="borderWidth10"
      borderBottomStyle="solid"
      flex="1 0 auto"
    >
      <SiteHeaderLogo title="Paste Starter" subtitle="Admin template" />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row"
        paddingTop="space60"
        paddingRight="space70"
        paddingBottom="space60"
        paddingLeft="space70"
        width="100%"
      >
        <DarkModeToggle />
        <Box marginTop="space10">
          <Stack orientation="horizontal" spacing="space60">
            <SiteHeaderSearch />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export { SiteHeaderDesktop };
