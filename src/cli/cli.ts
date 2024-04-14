#!/usr/bin/env node

/* eslint-disable no-console */

import { CliCommandFactory } from "./cliCommandFactory";

const [, , ...args] = process.argv;

export function cli(args: Array<string>) {
  const cliCommandFactory = new CliCommandFactory();
  const command = cliCommandFactory.create(args);

  if (command.error) {
    console.error(command.error);
    process.exit(1);
  }

  const result = command.result.execute();

  if (result.error) {
    console.error(command.error);
    process.exit(1);
  }

  process.exit(result.result);
}

cli(args);
