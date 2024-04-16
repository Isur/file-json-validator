import { compareJsonsInDirs } from "./compareJsonsInDirs";

describe("validateFiles", () => {
  it("Should returns correct errors - no errors", () => {
    const result = compareJsonsInDirs("./failed/en", ["./failed/pl"]);
    expect(result.result?.length).toBe(1);
    expect(result.result![0]).toMatchObject({
      path: "./failed/pl/common.json",
      errors: [],
    });
  });
  it("Should returns correct errors - errors", () => {
    const result = compareJsonsInDirs("./failed/en", ["./failed/ger"]);
    expect(result.result?.length).toBe(2);
    expect(result.result![0]).toMatchObject({
      path: "./failed/ger/buttons.json",
      errors: [],
    });
    expect(result.result![1]).toMatchObject({
      path: "./failed/ger/common.json",
      errors: ["-calc.minus", "-calc.equal", "+no"],
    });
  });

  it("Should returns errors", () => {
    const result = compareJsonsInDirs("./failed/en", ["./failed/xd"]);
    expect(result.error).not.toBeNull();
  });
});
