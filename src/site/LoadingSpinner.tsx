import React from "react";
import { Flex, Spinner } from "@twilio-paste/core";
import { Box } from "@twilio-paste/box";
import {
  MarginProps,
  PaddingProps,
} from "@twilio-paste/style-props/dist/types/space";
import { IconWrapperProps } from "@twilio-paste/icons/esm/helpers/IconWrapper";

type LoadingSpinnerProps = MarginProps &
  PaddingProps &
  IconWrapperProps & { loadingText?: string | React.ReactElement };

const LoadingSpinner: React.VFC<LoadingSpinnerProps> = ({
  marginTop,
  marginBottom,
  size,
  loadingText,
}) => {
  const fieldRef = React.useRef<HTMLDivElement>(null);
  return (
    <Flex
      vertical
      hAlignContent="center"
      data-testid="loading-spinner"
      marginTop={marginTop || "space200"}
    >
      <Flex
        marginTop={marginTop || "space200"}
        marginBottom={marginBottom || "space0"}
      >
        <Box
          width="100%"
          ref={fieldRef}
          padding="space40"
          data-testid="loading-spinner"
          marginTop={marginTop || "space200"}
          marginBottom={marginBottom || "space0"}
        >
          <Flex hAlignContent="center" vertical>
            <Flex>
              <Box marginBottom="space60">
                <Spinner
                  title="Loading"
                  decorative={false}
                  size={size || "sizeIcon110"}
                />
              </Box>
            </Flex>
            <Flex>
              <Box>{loadingText}</Box>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default LoadingSpinner;
