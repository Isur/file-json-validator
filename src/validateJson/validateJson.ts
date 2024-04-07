import { Json } from "./json";
import { jsonToKeys } from "./jsonToKeys";
import { ResultType, compareArrays } from "@/common";

export function validateJson(
  object: Json,
  compare: Json
): ResultType<Array<string>> {
  const obj = jsonToKeys(object);
  const cmp = jsonToKeys(compare);

  const comparison = compareArrays(obj, cmp);
  return { result: comparison, error: null };
}
