import { validateDirs } from "./validateDirs";

describe("validateDirs", () => {
  it("Should result with correct errors", () => {
    const errors = validateDirs("./failed/en", ["./failed/pl", "./failed/ger"]);

    expect(errors.result!.length).toBe(2);
    expect(errors.result![0].path).toBe("./failed/pl");
    expect(errors.result![0].errors).toStrictEqual(["-buttons.json"]);
    expect(errors.result![1].path).toBe("./failed/ger");
    expect(errors.result![1].errors).toStrictEqual([]);
  });
});
