import { loadJson } from "./loadJson";

describe("loadJson", () => {
  it("should correctly load json", () => {
    const data = loadJson("./public/en/common.json");
    const expected = {
      name: "Name",
      calc: {
        add: "Add",
        minus: "Minus",
        equal: "Equal",
      },
      test: "Test",
    };

    expect(data.error).toBeNull();
    expect(data.result).toStrictEqual(expected);
  });

  it("should return error on fail", () => {
    const data = loadJson("./public/es/common.json");
    expect(data.error.details).toBe("File not found!");
  });

  it("should return error on fail", () => {
    const data = loadJson("./readme.md");
    expect(data.error.details).toBe("Failed to parse file!");
  });
});
