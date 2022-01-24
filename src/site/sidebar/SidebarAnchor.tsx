import * as React from "react";
import { css, styled } from "@twilio-paste/styling-library";
import { Link } from "react-router-dom";

interface SidebarAnchorProps {
  children: React.ReactNode;
  nested?: boolean;
  to: string;
  isActive?: boolean;
}

// @ts-ignore
const StyledSidebarAnchor = styled(Link)<SidebarAnchorProps>((props) => {
  let style = {
    position: "relative",
    display: "block",
    width: "100%",
    padding: "space40",
    paddingLeft: props.nested
      ? ["space130", "space130", "space110"]
      : ["space110", "space110", "space90"],
    fontWeight: "fontWeightNormal",
    color: "colorText",
    textDecoration: "none",
    transition: "0.1s background-color ease-in-out",
    outline: "none",
    borderRadius: "borderRadius10",

    "&[aria-current='page']": {
      backgroundColor: "colorBackgroundStrong",
      color: "colorText",
      fontWeight: "fontWeightBold",
    },

    "&:hover": {
      color: "colorText",
      textDecoration: "underline",
    },

    "&:focus": {
      boxShadow: "shadowFocus",
      textDecoration: "underline",
    },
  };

  if (props.isActive) {
    // @ts-ignore
    style = { ...style, backgroundColor: "colorBackgroundStrong" };
  }

  return css(style);
});

const SidebarAnchor: React.FC<SidebarAnchorProps> = ({
  children,
  nested,
  to,
  isActive,
}) => (
  <StyledSidebarAnchor nested={nested} to={to} isActive={isActive}>
    {children}
  </StyledSidebarAnchor>
);

export { SidebarAnchor };
