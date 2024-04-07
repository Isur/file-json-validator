import fs from "fs";
import path from "path";
import { Json } from "./json";
import { ResultType } from "@/common";

export function loadJson(filePath: string): ResultType<Json> {
  const isAbsolute = path.isAbsolute(filePath);
  const fullPath = isAbsolute ? filePath : path.join(process.cwd(), filePath);

  const fileExists = fs.existsSync(fullPath);

  if (!fileExists) {
    return {
      error: { details: "File not found!" },
      result: null,
    };
  }

  try {
    const fileData = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(fileData) as Json;

    return {
      result: jsonData,
      error: null,
    };
  } catch {
    return {
      result: null,
      error: {
        details: "Failed to parse file!",
      },
    };
  }
}
