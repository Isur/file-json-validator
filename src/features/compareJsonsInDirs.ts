import { filesToValidate, loadJson } from "@/lib/files";
import { validateJson } from "@/lib/jsons";
import { FileError, ResultType } from "@/lib/types";

export function compareJsonsInDirs(
  mainDir: string,
  restDirs: Array<string>
): ResultType<Array<FileError>> {
  const validations = filesToValidate(mainDir, restDirs);
  if (validations.error) return { error: validations.error, result: null };

  const results: Array<FileError> = [];

  for (const valid of validations.result) {
    const main = loadJson(valid.main);
    if (main.error) return { error: main.error, result: null };

    const toCompare = loadJson(valid.toCompare);
    if (toCompare.error) return { error: toCompare.error, result: null };

    const result = validateJson(main.result, toCompare.result);
    if (result.error) return { error: result.error, result: null };

    results.push({
      path: valid.toCompare,
      errors: result.result,
    });
  }

  return { error: null, result: results };
}
