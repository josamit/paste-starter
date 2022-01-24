import { mapConcurrent } from "@src/utils/ConcurrentUtils";

describe("ConcurrentUtils", () => {
  it("should render correctly", async () => {
    const mockFunction = jest.fn().mockResolvedValue({});
    const results = await mapConcurrent<{}>(
      ["test", "another test", "another another test"],
      1,
      mockFunction
    );

    expect(mockFunction).toHaveBeenCalledTimes(3);
    expect(results).toEqual([{}, {}, {}]);
  });
});
