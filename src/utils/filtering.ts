import qs from "qs";
import { To } from "history";
import { QueryParams } from "../context/QueryManagerContext";
import { partiallyDecodeURI, partiallyEncodeURI } from "./url";

export function emptyQueryParams(push: (to: To, state?: any) => void) {
  push({ search: "" });
}

export function parseQueryParamsFromQueryString(queryString: string) {
  return qs.parse(queryString, {
    ignoreQueryPrefix: true,
    decoder: partiallyDecodeURI,
  });
}

export function parseQueryString(queryString: string): QueryParams {
  return parseQueryParamsFromQueryString(queryString);
}

export function stringifyWithEncoder(params: Record<string, string>) {
  return qs.stringify(params, {
    encoder: partiallyEncodeURI,
  });
}

export function setQueryParams(
  push: (to: To, state?: any) => void,
  pathname: string,
  params: QueryParams
): void {
  push({
    pathname,
    search: qs.stringify(params),
  });
}
