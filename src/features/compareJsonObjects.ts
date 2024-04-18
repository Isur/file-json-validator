import { Json, ResultType } from "@/lib/types";
import { validateJson } from "@/lib/jsons";

export function compareJsonObjects(
  main: Json,
  rest: Json
): ResultType<Array<string>> {
  return validateJson(main, rest);
}
