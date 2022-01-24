import React, { FC } from "react";
import {
  announcementsNamespacedLSKey,
  DISMISSED,
  useAnnouncement,
} from "@app/announcements/hooks/useAnnouncement";
import { Announcement } from "./types/announcement";
import AnnouncementAlert from "./AnnouncementAlert";

export type AnnouncementProps = Announcement;

const AnnouncementContainer: FC<AnnouncementProps> = ({
  valid_from,
  valid_until,
  variant,
  id,
  content,
  can_be_dismissed,
}) => {
  const [isVisible, setVisible] = useAnnouncement(id, valid_from, valid_until);

  const dismissNotification = () => {
    localStorage.setItem(announcementsNamespacedLSKey(id), DISMISSED);
    setVisible(false);
  };

  return (
    <AnnouncementAlert
      id={id}
      variant={variant}
      content={content}
      isVisible={isVisible}
      onDismiss={can_be_dismissed ? dismissNotification : undefined}
    />
  );
};

export default AnnouncementContainer;
