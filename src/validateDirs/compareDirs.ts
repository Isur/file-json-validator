import { openDir } from "./openDir";
import { ResultType, compareArrays } from "@/common";

export function compareDirs(
  mainPath: string,
  comparePath: string
): ResultType<Array<string>> {
  const filesMain = openDir(mainPath);
  const filesCompare = openDir(comparePath);

  if (filesMain.error) {
    return { error: filesMain.error, result: null };
  }

  if (filesCompare.error) return { error: filesCompare.error, result: null };

  const result = compareArrays(filesMain.result, filesCompare.result);

  return {
    error: null,
    result,
  };
}
