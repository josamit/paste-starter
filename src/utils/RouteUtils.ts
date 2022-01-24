import { kebabCase } from "lodash";

const hasWindowObject = (): boolean =>
  typeof window !== `undefined` && window.location != null;

// Gets the current browser pathname
export function getCurrentPathname(): string {
  if (!hasWindowObject()) {
    return "";
  }
  return window.location.pathname;
}

export function getCurrentPathHash(): string {
  if (!hasWindowObject()) {
    return "";
  }
  return window.location.hash;
}

export function slugify(text: string): string {
  return kebabCase(text.toLowerCase().replace(/[&+]/g, "-and-"));
}
