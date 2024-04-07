import { ResultType } from "@/common";
import { openDir } from "@/validateDirs";

type FileToValidate = {
  main: string;
  toCompare: string;
};

export function filesToValidate(
  mainDir: string,
  restDirs: Array<string>
): ResultType<Array<FileToValidate>> {
  const mainList = openDir(mainDir);
  const result: Array<FileToValidate> = [];
  const restLists: Record<string, Array<string>> = {};

  if (mainList.error) return { error: mainList.error, result: null };

  for (const dir of restDirs) {
    const list = openDir(dir);
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
