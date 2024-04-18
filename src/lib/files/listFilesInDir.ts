import fs from "fs";
import { getPath } from "./getPath";
import { ResultType } from "@/lib/types";

export function listFilesInDir(dirPath: string): ResultType<Array<string>> {
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

  return {
    result: files,
    error: null,
  };
}
