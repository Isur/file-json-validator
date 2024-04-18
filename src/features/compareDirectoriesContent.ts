import { compareDirs } from "@/lib/files";
import { FileError, ResultType } from "@/lib/types";

export function compareDirectoriesContent(
  mainDir: string,
  toCompareDirs: Array<string>
): ResultType<Array<FileError>> {
  const allErrors: Array<FileError> = [];

  for (const toCompare of toCompareDirs) {
    const dirErrors = compareDirs(mainDir, toCompare);
    if (dirErrors.error) return { error: dirErrors.error, result: null };
    allErrors.push({
      path: toCompare,
      errors: dirErrors.result,
    });
  }

  return {
    error: null,
    result: allErrors,
  };
}
