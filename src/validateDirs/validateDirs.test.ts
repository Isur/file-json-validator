import { validateDirs } from "./validateDirs";

describe("validateDirs", () => {
  it("Should result with correct errors", () => {
    const errors = validateDirs("./public/en", ["./public/pl", "./public/ger"]);

    expect(errors.length).toBe(2);
    expect(errors[0].path).toBe("./public/pl");
    expect(errors[0].errors).toStrictEqual(["-buttons.json"]);
    expect(errors[1].path).toBe("./public/ger");
    expect(errors[1].errors).toStrictEqual([]);
  });
});
