import { CliCommandFactory } from "./cliCommandFactory";

describe("CliCommandFactory", () => {
  it("Should create a factory", () => {
    const factory = new CliCommandFactory();
    expect(factory).toBeDefined();
  });

  describe("create", () => {
    let factory: CliCommandFactory;
    beforeEach(() => {
      factory = new CliCommandFactory();
    });

    it("should return error if no args", () => {
      const result = factory.create([]);
      expect(result.error).not.toBeNull();
      expect(result.error?.details).toBe("Command not found!");
    });

    it("Should return an error - unknown command", () => {
      const result = factory.create(["something"]);
      expect(result.error).not.toBeNull();
      expect(result.error?.details).toBe("Command not found!");
    });

    it("Should return an error - not enough arguments", () => {
      const result = factory.create(["dir"]);
      expect(result.error).not.toBeNull();
      expect(result.error?.details).toBeDefined();
      expect(typeof result.error?.details).toBe("string");
    });

    it("Should create a command - compare", () => {
      const args = ["compare", "./public/locale", "en"];
      const command = factory.create(args);
      expect(command).toBeDefined();
      expect(command.result?.name).toBe("compare");
    });

    it("Should create a command with arguments", () => {
      const args = ["dir", "./public/en", "./public/pl", "./public/ger"];
      const command = factory.create(args);
      expect(command).toBeDefined();
      expect(command.result?.name).toBe("dir");
    });
  });
});
