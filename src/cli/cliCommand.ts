import { ResultType } from "@/lib/types";

export interface CliCommand {
  name: string;
  parseInput: (args: Array<string>, flags: Array<string>) => string | null;
  execute: () => ResultType<number>;
}
