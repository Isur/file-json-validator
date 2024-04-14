import { validateDirs } from "./validateDirs";

describe("validateDirs", () => {
  it("Should result with correct errors", () => {
    const errors = validateDirs("./pub/en", ["./pub/pl", "./pub/ger"]);

    expect(errors.result!.length).toBe(2);
    expect(errors.result![0].path).toBe("./pub/pl");
    expect(errors.result![0].errors).toStrictEqual(["-buttons.json"]);
    expect(errors.result![1].path).toBe("./pub/ger");
    expect(errors.result![1].errors).toStrictEqual([]);
  });
});
