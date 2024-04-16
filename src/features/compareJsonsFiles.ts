import { loadJson } from "@/lib/files";
import { validateJson } from "@/lib/jsons";
import { ResultType, FileError } from "@/lib/types";

export function compareJsonsFiles(
  main: string,
  rest: Array<string>
): ResultType<Array<FileError>> {
  const mainContent = loadJson(main);
  if (mainContent.error) return { error: mainContent.error, result: null };

  const result: Array<FileError> = [];

  for (const toCompare of rest) {
    const toCompareContent = loadJson(toCompare);
    if (toCompareContent.error) {
      return { error: toCompareContent.error, result: null };
    }

    const validateResult = validateJson(
      mainContent.result,
      toCompareContent.result
    );
    if (validateResult.error) {
      return { error: validateResult.error, result: null };
    }

    result.push({
      path: toCompare,
      errors: validateResult.result,
    });
  }

  return {
    error: null,
    result,
  };
}
