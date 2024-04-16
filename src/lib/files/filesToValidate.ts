import { listFilesInDir } from "./listFilesInDir";
import { ResultType, FileToValidate } from "@/lib/types";

export function filesToValidate(
  mainDir: string,
  restDirs: Array<string>
): ResultType<Array<FileToValidate>> {
  const mainList = listFilesInDir(mainDir);
  if (mainList.error) return { error: mainList.error, result: null };

  const result: Array<FileToValidate> = [];
  const restLists: Record<string, Array<string>> = {};

  for (const dir of restDirs) {
    const list = listFilesInDir(dir);
    if (list.error) return { error: list.error, result: null };
    restLists[dir] = list.result;
  }

  for (const file of mainList.result) {
    for (const dir of restDirs) {
      if (restLists[dir].includes(file)) {
        result.push({
          main: `${mainDir}/${file}`,
          toCompare: `${dir}/${file}`,
        });
      }
    }
  }

  return { error: null, result };
}
