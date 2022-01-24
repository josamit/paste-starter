import React, { FC, useMemo } from "react";
import { Alert, Anchor, Box, Text } from "@twilio-paste/core";
import { AlertVariants } from "@twilio-paste/alert";
import { marked } from "marked";

export type AnnouncementProps = {
  id: string;
  content: string;
  isVisible: boolean;
  variant: AlertVariants;
  onDismiss?: () => void;
};

export const markdownToReactNode = (content: string, id: string) => {
  const result = marked.lexer(content);
  const reactTokens: React.ReactElement[] = [];

  result.forEach((topLevelToken) => {
    if ("tokens" in topLevelToken) {
      const tokens = topLevelToken.tokens || [];
      tokens.forEach((token) => {
        switch (token.type) {
          case "text":
            reactTokens.push(
              <Text as="span" key={token.text} id={id}>
                {token.text}
              </Text>
            );
            break;
          case "link":
            // Not using the default parsed variant to show that we can put whatever element we want
            const shouldShowExternal = token.href.includes("twilio.com");
            reactTokens.push(
              <Anchor
                href={token.href}
                showExternal={shouldShowExternal}
                target={shouldShowExternal ? "_blank" : "_self"}
                key={token.text}
                id={id}
              >
                {token.text}
              </Anchor>
            );
            break;
          case "strong":
            reactTokens.push(
              <Text
                as="span"
                fontWeight="fontWeightBold"
                key={token.text}
                id={id}
              >
                {token.text}
              </Text>
            );
            break;
          case "em":
            reactTokens.push(
              <Text
                as="span"
                fontFamily="fontFamilyCode"
                color="colorTextBrandHighlight"
                key={token.text}
                id={id}
              >
                {token.text}
              </Text>
            );
            break;
          default:
            reactTokens.push(
              <span key={token.raw} id={id}>
                {token.raw}
              </span>
            );
            break;
        }
      });
    }
  });

  return <div>{reactTokens}</div>;
};

const AnnouncementAlert: FC<AnnouncementProps> = ({
  isVisible,
  onDismiss,
  variant,
  content,
  id,
}) => {
  const memoizedNodes = useMemo(
    () => markdownToReactNode(content, id),
    [content, id]
  );

  if (isVisible) {
    return (
      <Box id={id} marginBottom="space70" data-testid={id}>
        <Alert variant={variant} onDismiss={onDismiss} data-testid={id}>
          {memoizedNodes}
        </Alert>
      </Box>
    );
  }

  return <></>;
};

export default AnnouncementAlert;
