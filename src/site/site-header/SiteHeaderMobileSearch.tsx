import * as React from "react";
import { Box } from "@twilio-paste/box";
import { Heading } from "@twilio-paste/heading";
import { pasteBaseStyles } from "@twilio-paste/theme";
import { Button } from "@twilio-paste/button";
import { CloseIcon } from "@twilio-paste/icons/esm/CloseIcon";
import { css, styled } from "@twilio-paste/styling-library";
import {
  ModalDialogPrimitiveContent,
  ModalDialogPrimitiveOverlay,
} from "@twilio-paste/modal-dialog-primitive";
import { SiteHeaderSearch } from "./SiteHeaderSearch";

const StyledModalDialogOverlay = styled(ModalDialogPrimitiveOverlay)(
  // @ts-ignore
  css({
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    padding: "space30",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "colorBackgroundOverlay",
    zIndex: "zIndex80",
    overflow: "scroll",
  }),
  // import Paste Theme Based Styles due to portal positioning.
  // reach portal is a sibling to the main app, so you are now
  // no longer a child of the theme provider. We need to re-set
  // some of the base styles that we rely on inheriting from
  // such as font-family and line-height so that compositions
  // of paste components in the modal are styled correctly
  pasteBaseStyles
);

// @ts-ignore
const StyledModalDialogContent = styled(ModalDialogPrimitiveContent)(
  // @ts-ignore
  css({
    position: "absolute",
    top: 10,
    width: "calc(100% - 20px)",
    maxWidth: "500px",
    height: "200px",
    paddingY: "space70",
    paddingX: "space60",
    backgroundColor: "colorBackgroundBody",
    borderRadius: "borderRadius20",
  })
);

interface MobileSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSearch: React.FC<MobileSearchProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <StyledModalDialogOverlay onDismiss={onClose} allowPinchZoom>
      <Box
        height="300px"
        width="100vw"
        overflow="scroll"
        display="flex"
        justifyContent="center"
      >
        <StyledModalDialogContent aria-label="Website navigation">
          <Box position="absolute" top="24px" right="24px" zIndex="zIndex10">
            <Button variant="reset" size="reset" onClick={onClose}>
              <CloseIcon
                decorative={false}
                color="colorTextWeak"
                size="sizeIcon60"
                title="Close Search"
              />
            </Button>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            <Heading as="label" variant="heading30">
              Search
            </Heading>
            <SiteHeaderSearch />
          </Box>
        </StyledModalDialogContent>
      </Box>
    </StyledModalDialogOverlay>
  );
};
export { MobileSearch };
