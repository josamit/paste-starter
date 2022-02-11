import React, { FC } from "react";
import { Box } from "@twilio-paste/core";
import { announcements as defaultAnnouncements } from "@app/announcements/types/announcements";
import { Announcement } from "./types/announcement";
import AnnouncementContainer from "./AnnouncementContainer";

export type AnnouncementsProps = {
  presetAnnouncements?: Announcement[];
};

const AnnouncementsContainer: FC<AnnouncementsProps> = ({
  presetAnnouncements = defaultAnnouncements,
}) => {
  return (
    <>
      {presetAnnouncements.map(
        ({
          id,
          content,
          variant,
          valid_from,
          valid_until,
          can_be_dismissed,
        }) => (
          <AnnouncementContainer
            id={id}
            content={content}
            variant={variant}
            valid_from={valid_from}
            valid_until={valid_until}
            data-tesid={`${id}-container`}
            can_be_dismissed={can_be_dismissed}
          />
        )
      )}
    </>
  );
};

export default AnnouncementsContainer;
