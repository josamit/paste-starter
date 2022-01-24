import React from "react";
import { Badge } from "@twilio-paste/core";
import { BadgeVariants } from "@twilio-paste/badge/dist/types";
import { useWindowObject } from "@hooks/useWindowObject";

const determineBadgeVariant = (environment: string) => {
  let variant: BadgeVariants = "error";

  if (environment === "stage") {
    variant = "warning";
  }

  if (environment === "dev") {
    variant = "success";
  }

  return variant;
};

const SiteHeaderEnvBadge: React.FC = () => {
  const { environment } = useWindowObject();

  const variant = determineBadgeVariant(environment);

  return (
    <Badge as="span" variant={variant}>
      {environment}
    </Badge>
  );
};

export default SiteHeaderEnvBadge;
