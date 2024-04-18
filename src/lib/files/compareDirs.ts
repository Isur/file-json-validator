import { listFilesInDir } from "./listFilesInDir";
import { ResultType } from "@/lib/types";
import { compareArrays } from "@/lib/compareArrays";

export function compareDirs(
  mainPath: string,
  comparePath: string
): ResultType<Array<string>> {
  const filesMain = listFilesInDir(mainPath);
  const filesCompare = listFilesInDir(comparePath);

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
