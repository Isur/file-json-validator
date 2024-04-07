import { compareDirs } from "./compareDirs";
import { FileError, ResultType } from "@/common";

export function validateDirs(
  mainPath: string,
  restPaths: Array<string>
): ResultType<Array<FileError>> {
  const errors = [];
  for (const p of restPaths) {
    const fileError = compareDirs(mainPath, p);
    if (fileError.error) return { error: fileError.error, result: null };
    errors.push({
      path: p,
      errors: fileError.result,
    });
  }

  return { result: errors, error: null };
}
