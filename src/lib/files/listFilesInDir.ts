import fs from "fs";
import { getPath } from "./getPath";
import { ResultType } from "@/lib/types";

export function listFilesInDir(
  dirPath: string,
  listNested: boolean = true
): ResultType<Array<string>> {
  const d = getPath(dirPath);

  const exists = fs.existsSync(d);

  if (!exists) {
    return { result: null, error: { details: "Directory not found!" } };
  }

  const isDir = fs.lstatSync(d).isDirectory();

  if (!isDir) {
    return { result: null, error: { details: "It is not directory!" } };
  }

  const files = fs.readdirSync(d);

  const allFiles = [];

  for (let i = 0; i < files.length; i++) {
    if (!listNested) {
      allFiles.push(files[i]);
      continue;
    }
    const filePath = d + "/" + files[i];
    const isDir = fs.lstatSync(filePath).isDirectory();

    if (!isDir) {
      allFiles.push(files[i]);
      continue;
    }

    files[i] += "/";
    allFiles.push(files[i]);
    const nested = listFilesInDir(filePath);
    if (nested.error) return { error: nested.error, result: null };

    for (let j = 0; j < nested.result.length; j++) {
      const newEntry = files[i] + nested.result[j];
      allFiles.push(newEntry);
    }
  }

  return {
    result: allFiles,
    error: null,
  };
}
