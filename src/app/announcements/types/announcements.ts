import { Announcement } from "@app/announcements/types/announcement";

export const announcements: Announcement[] = [
  {
    id: "first_announcement",
    content: "This is a sample announcment. You can dissmiss it safely.",
    valid_from: "2021-01-01T00:00:00Z",
    valid_until: "2025-12-31T23:59:59Z",
    variant: "neutral",
    can_be_dismissed: true,
  },
];
