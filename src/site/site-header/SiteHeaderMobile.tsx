import * as React from "react";
import { Box } from "@twilio-paste/box";
import { Button } from "@twilio-paste/button";
import { SearchIcon } from "@twilio-paste/icons/esm/SearchIcon";
import { HamburgerToggle } from "./HamburgerToggle";
import { SiteHeaderLogo } from "./SiteHeaderLogo";
import { MobileNavigation } from "./SiteHeaderMobileNavigation";
import { MobileSearch } from "./SiteHeaderMobileSearch";

const SiteHeaderMobile: React.VFC = () => {
  const [navigationOpen, setNavigationOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);

  return (
    <Box
      as="header"
      display={["flex", "flex", "none"]}
      alignItems="center"
      justifyContent="space-between"
      backgroundColor="colorBackgroundBodyInverse"
      position="sticky"
      top="0px"
      zIndex="zIndex80"
    >
      <Box margin="space60">
        <Button
          variant="inverse"
          size="icon_small"
          onClick={() => setSearchOpen(!searchOpen)}
        >
          <Box paddingX="space20">
            <SearchIcon
              size="sizeIcon50"
              decorative={false}
              title="Search by Account SID (ACxxx)"
            />
          </Box>
        </Button>
        <MobileSearch
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
        />
      </Box>
      <SiteHeaderLogo title="Paste Starter" />
      <Box margin="space60">
        <Button
          data-testid="open_main_navigation"
          aria-label="Open main navigation"
          variant="inverse"
          size="icon_small"
          onClick={() => setNavigationOpen(!navigationOpen)}
        >
          <HamburgerToggle
            aria-hidden
            toggled={navigationOpen}
            color={
              navigationOpen
                ? "colorBackgroundBodyInverse"
                : "colorBackgroundBody"
            }
          />
        </Button>
        <MobileNavigation
          isOpen={navigationOpen}
          onClose={() => setNavigationOpen(false)}
        />
      </Box>
    </Box>
  );
};

export { SiteHeaderMobile };
