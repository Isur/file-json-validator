import { validateFiles } from "./validateFiles";

describe("validateFiles", () => {
  it("Should returns correct errors - no errors", () => {
    const result = validateFiles("./public/en", ["./public/pl"]);
    expect(result.result?.length).toBe(1);
    expect(result.result![0]).toMatchObject({
      path: "./public/pl/common.json",
      errors: [],
    });
  });
  it("Should returns correct errors - errors", () => {
    const result = validateFiles("./public/en", ["./public/ger"]);
    expect(result.result?.length).toBe(2);
    expect(result.result![0]).toMatchObject({
      path: "./public/ger/buttons.json",
      errors: [],
    });
    expect(result.result![1]).toMatchObject({
      path: "./public/ger/common.json",
      errors: ["-calc.minus", "-calc.equal", "+no"],
    });
  });

  it("Should returns errors", () => {
    const result = validateFiles("./public/en", ["./public/xd"]);
    expect(result.error).not.toBeNull();
  });
});
