import { jsonToKeys } from "./jsonToKeys";
import { Json, ResultType } from "@/lib/types";
import { compareArrays } from "@/lib/compareArrays";

export function validateJson(
  object: Json,
  compare: Json
): ResultType<Array<string>> {
  const obj = jsonToKeys(object);
  const cmp = jsonToKeys(compare);

  const comparison = compareArrays(obj, cmp);
  return { result: comparison, error: null };
}
