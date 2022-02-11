import * as React from "react";
import { Box } from "@twilio-paste/box";
import { Text } from "@twilio-paste/text";
import {
  DisclosurePrimitive,
  DisclosurePrimitiveContent,
  useDisclosurePrimitiveState,
} from "@twilio-paste/disclosure-primitive";
import _ from "lodash";
import { useWindowObject } from "@hooks/useWindowObject";
import { useLocation } from "react-router-dom";
import { SidebarCategoryRoutes } from "../../constants";
import { getCurrentPathname } from "../../utils/RouteUtils";
import { useQueryManager } from "../../context/QueryManagerContext";
import { SidebarAnchor } from "./SidebarAnchor";
import { SidebarDisclosureButton } from "./SidebarDisclosureButton";
import { SidebarItem } from "./SidebarItem";
import { SidebarNestedItem } from "./SidebarNestedItem";
import { SidebarNestedList } from "./SidebarNestedList";

interface SidebarNavigationProps {
  children?: React.ReactNode;
}

const SidebarNavigation: React.VFC<SidebarNavigationProps> = () => {
  const { username } = useWindowObject();
  const { queryParams } = useQueryManager();
  const { pathname } = useLocation();

  const firstDisclosure = useDisclosurePrimitiveState({
    visible: getCurrentPathname().startsWith(SidebarCategoryRoutes.SECOND_PAGE),
  });

  const optionalRouteWithAccountSid = (
    baseRoute: string,
    accountSid?: string
  ) => {
    if (_.isEmpty(accountSid)) {
      return baseRoute;
    }

    return `${baseRoute}?accountSid=${queryParams.accountSid}`;
  };

  const siteHome = () => {
    const baseRoute = SidebarCategoryRoutes.HOME;
    return optionalRouteWithAccountSid(baseRoute, queryParams.accountSid);
  };

  const siteFirstPage = () => {
    const baseRoute = SidebarCategoryRoutes.FIRST_PAGE;
    return optionalRouteWithAccountSid(baseRoute, queryParams.accountSid);
  };

  const siteSecondPage = () => {
    const baseRoute = SidebarCategoryRoutes.SECOND_PAGE;
    return optionalRouteWithAccountSid(baseRoute, queryParams.accountSid);
  };

  const isRouteActive = (route: string) => {
    const currentPath = pathname;
    const currentRoute = route.split("?")[0];

    return currentRoute === currentPath;
  };

  return (
    <Box
      as="nav"
      marginTop={["space0", "space0", "space70"]}
      marginLeft={["space10", "space10", "space0"]}
      paddingBottom={["space50", "space50", "space0"]}
      overflow="auto"
      role="navigation"
      aria-label="Main"
    >
      <Box
        display={["block", "block", "none"]}
        marginTop="space20"
        marginLeft="space20"
        marginRight={["space160", "space160", "space0"]}
      >
        <SidebarAnchor to={siteHome()}>
          <Box
            display={["flex", "flex", "none"]}
            alignItems="center"
            marginLeft="spaceNegative80"
            height="28px"
          >
            <Text
              as="span"
              fontSize={["fontSize50", "fontSize50", "fontSize30"]}
            >
              Dashboard
            </Text>
          </Box>
        </SidebarAnchor>
      </Box>
      <Box as="ul" padding="space0" margin="space0" listStyleType="none">
        <SidebarItem display={["none", "none", "block"]}>
          <SidebarAnchor to={siteHome()}>Welcome {username}!</SidebarAnchor>
        </SidebarItem>
        <SidebarItem display={["none", "none", "block"]}>
          <SidebarAnchor isActive={isRouteActive(siteHome())} to={siteHome()}>
            Dashboard
          </SidebarAnchor>
        </SidebarItem>
        <SidebarItem>
          <SidebarAnchor
            to={siteFirstPage()}
            isActive={isRouteActive(siteFirstPage())}
          >
            First page
          </SidebarAnchor>
        </SidebarItem>
        <SidebarItem>
          <DisclosurePrimitive
            as={SidebarDisclosureButton}
            {...firstDisclosure}
            data-cy="onboarding-button"
          >
            Second page
          </DisclosurePrimitive>
          <DisclosurePrimitiveContent
            {...firstDisclosure}
            data-cy="onboarding-list"
          >
            <SidebarNestedList>
              <SidebarNestedItem>
                <SidebarAnchor
                  nested
                  to={siteSecondPage()}
                  isActive={isRouteActive(siteSecondPage())}
                >
                  Second sub page : 1
                </SidebarAnchor>
              </SidebarNestedItem>
              <SidebarNestedItem>
                <SidebarAnchor
                  nested
                  to={siteSecondPage()}
                  isActive={isRouteActive(siteSecondPage())}
                >
                  Second sub page : 2
                </SidebarAnchor>
              </SidebarNestedItem>
            </SidebarNestedList>
          </DisclosurePrimitiveContent>
        </SidebarItem>
      </Box>
    </Box>
  );
};

export { SidebarNavigation };
