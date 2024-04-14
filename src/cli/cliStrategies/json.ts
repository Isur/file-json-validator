import { CliCommand } from "../cliCommand";
import { FileError, ResultType, niceDisplay } from "@/common";
import { loadJson, validateJson } from "@/validateJson";

export class CliJson implements CliCommand {
  public name = "json";

  private flags = {
    onlyWarn: false,
  };

  private main: string;
  private rest: Array<string>;

  public parseInput(args: Array<string>, flags: Array<string>): string | null {
    if (args.length < 2) {
      return "Not enough arguments! At least 2 arguments are required.";
    }
    const [main, ...rest] = args;

    this.main = main;
    this.rest = rest;

    for (const flag of flags) {
      if (flag === "--only-warn") {
        this.flags.onlyWarn = true;
      } else {
        return `Unknown flag: ${flag}`;
      }
    }

    return null;
  }

  public execute(): ResultType<number> {
    const main = loadJson(this.main);
    if (main.error) {
      return {
        error: main.error,
        result: null,
      };
    }

    const results: Array<FileError> = [];

    for (const file of this.rest) {
      const toCompare = loadJson(file);
      if (toCompare.error) {
        return {
          error: toCompare.error,
          result: null,
        };
      }

      const result = validateJson(main.result, toCompare.result);

      results.push({ path: file, errors: result.result! });
    }

    niceDisplay(results, this.flags.onlyWarn);

    const errorSum = results.reduce((acc, curr) => acc + curr.errors.length, 0);
    const exitCode = errorSum > 0 ? 1 : 0;
    const exit = this.flags.onlyWarn ? 0 : exitCode;

    return {
      error: null,
      result: exit,
    };
  }
}
