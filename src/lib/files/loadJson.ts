import fs from "fs";
import { getPath } from "./getPath";
import { Json, ResultType } from "@/lib/types";

export function loadJson(filePath: string): ResultType<Json> {
  const fullPath = getPath(filePath);

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
