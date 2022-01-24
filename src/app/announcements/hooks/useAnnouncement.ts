import { isAfter, isBefore, parseISO } from "date-fns";
import { useState } from "react";

export const NEW = "NEW";
export const DISMISSED = "DISMISSED";

export const announcementsNamespacedLSKey = (key: string): string =>
  `messaging-console.announcements.${key}`;

const isWithinTimeBounds = (
  valid_from?: string,
  valid_until?: string
): boolean => {
  const today = Date.now();
  if (valid_from && valid_until) {
    return (
      isBefore(parseISO(valid_from), today) &&
      isAfter(parseISO(valid_until), today)
    );
  }

  if (valid_from) {
    return isBefore(parseISO(valid_from), today);
  }

  if (valid_until) {
    return isAfter(parseISO(valid_until), today);
  }

  return true;
};

const doesRouteMatchForAnnouncement = (
  currentPath: string,
  routeToCheck?: string[]
): boolean => {
  if (routeToCheck && routeToCheck.length > 0) {
    return (
      routeToCheck.filter((route) => currentPath.match(route.trim()) !== null)
        .length > 0
    );
  }

  return true;
};

export const useAnnouncement = (
  id: string,
  valid_from?: string,
  valid_until?: string
): [isVisible: boolean, setIsVisible: (isVisible: boolean) => void] => {
  const getInitialState = () => {
    const notificationStatus = localStorage.getItem(
      announcementsNamespacedLSKey(id)
    );

    if (!notificationStatus) {
      localStorage.setItem(announcementsNamespacedLSKey(id), NEW);
    }

    if (notificationStatus && notificationStatus === DISMISSED) {
      return false;
    }

    return isWithinTimeBounds(valid_from, valid_until);
  };

  return useState(getInitialState);
};
