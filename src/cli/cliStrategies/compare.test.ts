import { CliCompare } from "./compare";

describe("cli compare", () => {
  it("Should create compare strategy", () => {
    const compare = new CliCompare();
    expect(compare).toBeDefined();
  });

  describe("parseInput", () => {
    it("Should return error when not enough arguments", () => {
      const compare = new CliCompare();
      const result = compare.parseInput([], []);
      expect(result).toEqual("2 arguments required!");
    });

    it("Should set main and rest", () => {
      const compare = new CliCompare();
      const result = compare.parseInput(["path", "main", "x"], []);
      expect(result).toEqual("2 arguments required!");
    });

    it("Should set main and rest", () => {
      const compare = new CliCompare();
      compare.parseInput(["path", "main"], []);
      expect(compare["path"]).toEqual("path");
      expect(compare["main"]).toEqual("main");
    });

    it("Should set flags", () => {
      const compare = new CliCompare();
      compare.parseInput(
        ["path", "main"],
        ["--only-warn", "--only-structure", "--only-json"]
      );
      expect(compare["flags"]).toEqual({
        onlyWarn: true,
        onlyStructure: true,
        onlyJson: true,
      });
    });

    it("Should return error when unknown flag", () => {
      const compare = new CliCompare();
      const result = compare.parseInput(["path", "main"], ["--unknown"]);
      expect(result).toEqual("Unknown flag: --unknown");
    });
  });
});
