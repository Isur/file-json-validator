import { CliCommand } from "../cliCommand";
import { compareJsonsFiles } from "@/features/compareJsonsFiles";
import { ResultType } from "@/lib/types";
import { displayErrors } from "@/lib/displayErrors";

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
    const results = compareJsonsFiles(this.main, this.rest);

    if (results.error) return { error: results.error, result: null };

    displayErrors(results.result, this.flags.onlyWarn);

    const errorSum = results.result.reduce(
      (acc, curr) => acc + curr.errors.length,
      0
    );
    const exitCode = errorSum > 0 ? 1 : 0;
    const exit = this.flags.onlyWarn ? 0 : exitCode;

    return {
      error: null,
      result: exit,
    };
  }
}
