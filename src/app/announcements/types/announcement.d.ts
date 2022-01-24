import { AlertVariants } from "@twilio-paste/alert";

export type Announcement = {
  id: string;
  content: string;
  valid_from?: string;
  valid_until?: string;
  variant: AlertVariants;
  can_be_dismissed: boolean;
};
