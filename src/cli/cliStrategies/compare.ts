import { CliCommand } from "../cliCommand";

export class CliCompare implements CliCommand {
  public name = "compare";

  private flags = {
    onlyWarn: false,
    onlyStructure: false,
    onlyJson: false,
  };

  private path: string;
  private main: string;

  public parseInput(args: Array<string>, flags: Array<string>): string | null {
    if (args.length != 2) {
      return "2 arguments required!";
    }

    this.path = args[0];
    this.main = args[1];

    for (const flag of flags) {
      if (flag === "--only-warn") {
        this.flags.onlyWarn = true;
      } else if (flag === "--only-structure") {
        this.flags.onlyStructure = true;
      } else if (flag === "--only-json") {
        this.flags.onlyJson = true;
      } else {
        return `Unknown flag: ${flag}`;
      }
    }

    return null;
  }

  public execute() {
    return {
      error: null,
      result: 0,
    };
  }
}
