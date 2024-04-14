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
});
