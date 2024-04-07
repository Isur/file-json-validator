import path from "path";
import fs from "fs";
import { ResultType } from "@/common";

export function openDir(dirPath: string): ResultType<Array<string>> {
  const isAbsolute = path.isAbsolute(dirPath);
  const d = isAbsolute ? dirPath : path.join(process.cwd(), dirPath);

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
