import { listFilesInDir } from "./listFilesInDir";

describe("openDir", () => {
  it("Should open test directory", () => {
    const files = listFilesInDir("./failed/en");
    expect(files.error).toBeNull();
    expect(files.result?.length).toBe(2);
    expect(files.result![0]).toBe("buttons.json");
    expect(files.result![1]).toBe("common.json");
  });

  it("Should return error if nothing under path", () => {
    const files = listFilesInDir("./failed/es");
    expect(files.error!.details).toBe("Directory not found!");
  });

  it("Should return error if it is not directory", () => {
    const files = listFilesInDir("./failed/en/common.json");
    expect(files.error!.details).toBe("It is not directory!");
  });
  it("Should open nested test direcotry", () => {
    const files = listFilesInDir("./nested/en");
    expect(files.error).toBeNull();

    const expected = [
      "buttons/",
      "buttons/buttons.json",
      "buttons/buttons2.json",
      "pages/",
      "pages/dashboard/",
      "pages/dashboard/title.json",
      "pages/home/",
      "pages/home/title.json",
      "titles/",
      "titles/title.json",
      "titles/title2.json",
    ];

    expect(files.result?.length).toBe(expected.length);
    expect(files.result).toEqual(expected);
  });

  it("Should open nested test direcotry - nested = false", () => {
    const files = listFilesInDir("./nested/en", false);
    expect(files.error).toBeNull();

    const expected = ["buttons", "pages", "titles"];

    expect(files.result?.length).toBe(expected.length);
    expect(files.result).toEqual(expected);
  });
});
