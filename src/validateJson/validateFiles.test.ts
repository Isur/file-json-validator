import { validateFiles } from "./validateFiles";

describe("validateFiles", () => {
  it("Should returns correct errors - no errors", () => {
    const result = validateFiles("./pub/en", ["./pub/pl"]);
    expect(result.result?.length).toBe(1);
    expect(result.result![0]).toMatchObject({
      path: "./pub/pl/common.json",
      errors: [],
    });
  });
  it("Should returns correct errors - errors", () => {
    const result = validateFiles("./pub/en", ["./pub/ger"]);
    expect(result.result?.length).toBe(2);
    expect(result.result![0]).toMatchObject({
      path: "./pub/ger/buttons.json",
      errors: [],
    });
    expect(result.result![1]).toMatchObject({
      path: "./pub/ger/common.json",
      errors: ["-calc.minus", "-calc.equal", "+no"],
    });
  });

  it("Should returns errors", () => {
    const result = validateFiles("./pub/en", ["./pub/xd"]);
    expect(result.error).not.toBeNull();
  });
});
