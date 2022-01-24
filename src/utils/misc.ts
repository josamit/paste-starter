import { v4 as uuidv4 } from "uuid";

export function joinClassNames(...classNames: (string | undefined)[]): string {
  return classNames.filter(Boolean).join(" ");
}

// tslint:disable-next-line:no-empty
export const noop = () => {};

export function generateUniqueId() {
  return uuidv4();
}

type TypedEntry<T> = [keyof T, T[keyof T]];

export function typedEntries<T extends object>(obj: T): TypedEntry<T>[] {
  return Object.entries(obj) as TypedEntry<T>[];
}

export function typedKeys<T extends {}>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

export function safelyParseDate(date?: string | null, asDate = false): string {
  if (date === undefined || date === null || date.trim().length === 0) {
    return "-";
  }
  try {
    const parsedDate = new Date(Date.parse(date));
    if (asDate) {
      return parsedDate.toLocaleDateString();
    }

    return parsedDate.toLocaleString();
  } catch (e) {
    return date;
  }
}
