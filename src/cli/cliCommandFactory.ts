import { CliCommand } from "./cliCommand";
import { CliCompare, CliDir, CliJson } from "./cliStrategies";
import { ResultType } from "@/common";

export class CliCommandFactory {
  private commandMap: Record<string, new () => CliCommand> = {
    compare: CliCompare,
    dir: CliDir,
    json: CliJson,
  };

  public create(args: Array<string>): ResultType<CliCommand> {
    const [cmd, ...restArgs] = args;
    if (!cmd) {
      return { error: { details: "Command not provided!" }, result: null };
    }
    const flags = restArgs.filter((arg) => arg.startsWith("--"));
    const commandArgs = restArgs.filter((arg) => !arg.startsWith("--"));

    const commandConstructor = this.commandMap[cmd];

    if (!commandConstructor) {
      return { error: { details: "Command not found!" }, result: null };
    }
    const command = new commandConstructor();

    const check = command.parseInput(commandArgs, flags);

    if (check !== null) {
      return { error: { details: check }, result: null };
    }

    return { error: null, result: command };
  }
}
