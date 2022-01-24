import rison from "rison";
import { invert } from "lodash";

export function encodeJsonToUrlQuery(jsonObject: object): string {
  return rison.encode(jsonObject);
}

export function decodeUrlQueryToJson<T>(string: string): T {
  return rison.decode(string);
}

const encodingMap: { [key: string]: string } = {
  " ": "%20",
  "&": "%26",
  "'": "%27",
};

const decodingMap = invert(encodingMap);

function encodeAccordingToMap(map: { [key: string]: string }) {
  return (str: string) => {
    let mutableStr = str;
    Object.keys(map).forEach((key) => {
      mutableStr = mutableStr.replace(new RegExp(key, "g"), map[key]);
    });

    return mutableStr;
  };
}

export function partiallyEncodeURI(string: string) {
  return encodeAccordingToMap(encodingMap)(string);
}

export function partiallyDecodeURI(string: string) {
  return encodeAccordingToMap(decodingMap)(string);
}
