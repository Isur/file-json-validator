import { compareDirs } from "./compareDirs";

describe("compareDirs", () => {
  it("Should correctly pass", () => {
    const result = compareDirs("./failed/en/", "./failed/ger/");
    expect(result.error).toBe(null);
    expect(result.result).toStrictEqual([]);
  });

  it("Should correctly show missing file", () => {
    const result = compareDirs("./failed/en/", "./failed/pl/");
    expect(result.error).toBe(null);
    expect(result.result).toStrictEqual(["-buttons.json"]);
  });

  it("Should correctly show additional file", () => {
    const result = compareDirs("./failed/pl/", "./failed/en/");
    expect(result.error).toBe(null);
    expect(result.result).toStrictEqual(["+buttons.json"]);
  });

  it("Should correctly show error", () => {
    const result = compareDirs("./failed/sl/", "./failed/en/");
    expect(result.error).not.toBe(null);
  });

  it("Should correctly show error 2 ", () => {
    const result = compareDirs("./failed/pl/", "./failed/n/");
    expect(result.error).not.toBe(null);
  });
});
