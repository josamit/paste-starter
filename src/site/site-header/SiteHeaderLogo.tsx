import * as React from "react";
import { Text } from "@twilio-paste/text";
import { Box } from "@twilio-paste/box";
import {
  MediaBody,
  MediaFigure,
  MediaObject,
} from "@twilio-paste/media-object";
import { styled } from "@twilio-paste/styling-library";
import { Link } from "react-router-dom";
import { LogoTwilioIcon } from "@twilio-paste/icons/esm/LogoTwilioIcon";
import { Stack } from "@twilio-paste/stack";
import SiteHeaderEnvBadge from "./SiteHeaderEnvBadge";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:visited {
    color: inherit;
  }
`;

interface SiteHeaderLogoProps {
  title?: string;
  subtitle?: string;
}

// Note: 'subtitle' isn't passed for the mobile view, so we use that fact
// to render different sizes and spacing in mobile
const SiteHeaderLogo: React.VFC<SiteHeaderLogoProps> = ({
  title,
  subtitle,
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      paddingRight="space70"
      paddingLeft="space70"
      borderRightColor="colorBorderInverseWeaker"
      borderRightStyle="solid"
      borderRightWidth={["borderWidth0", "borderWidth0", "borderWidth10"]}
      minWidth={subtitle ? "sizeSidebar" : "size0"}
    >
      <MediaObject verticalAlign="center">
        <MediaFigure spacing="space40">
          <LogoTwilioIcon
            decorative
            color="colorTextInverse"
            size="sizeIcon60"
          />
        </MediaFigure>
        <MediaBody>
          <Text
            as="div"
            fontSize="fontSize40"
            lineHeight="lineHeight40"
            color="colorTextInverse"
          >
            <StyledLink to="/">{title}</StyledLink>
          </Text>
          {subtitle ? (
            <Stack orientation="horizontal" spacing="space20">
              <Text
                as="span"
                fontSize="fontSize20"
                fontWeight="fontWeightNormal"
                lineHeight="lineHeight20"
                color="colorTextInverse"
              >
                {subtitle}
              </Text>
            </Stack>
          ) : null}
        </MediaBody>
      </MediaObject>
    </Box>
  );
};

export { SiteHeaderLogo };
