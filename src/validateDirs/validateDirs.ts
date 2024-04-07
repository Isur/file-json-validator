import { compareDirs } from "./compareDirs";
import { FileError } from "@/common";

export function validateDirs(
  mainPath: string,
  restPaths: Array<string>
): Array<FileError> {
  const errors = [];
  for (const p of restPaths) {
    const fileError = compareDirs(mainPath, p);
    if (!fileError.error) {
      errors.push({
        path: p,
        errors: fileError.result,
      });
    }
  }

  return errors;
}
