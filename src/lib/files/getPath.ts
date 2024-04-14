import path from "path";

export function getPath(p: string): string {
  const isAbsolute = path.isAbsolute(p);
  const d = isAbsolute ? p : path.join(process.cwd(), p);
  return d;
}
