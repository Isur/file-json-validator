import { Json } from "./json";

export function jsonToKeys(obj: Json, parent?: string): Array<string> {
  const resultArray = [];

  const keys = Object.keys(obj);

  for (const key of keys) {
    if (parent) {
      resultArray.push(`${parent}.${key}`);
    } else {
      resultArray.push(key);
    }

    if (typeof obj[key] == "object") {
      const p = parent ? `${parent}.${key}` : key;
      const nested = jsonToKeys(obj[key] as Json, p);

      resultArray.push(...nested);
    }
  }

  return resultArray;
}
