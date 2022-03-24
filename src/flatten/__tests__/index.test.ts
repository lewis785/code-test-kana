import { flatten } from "../index";

describe("flatten", () => {
  it("should return empty array if input array is empty", () => {
    expect(flatten([])).toStrictEqual([]);
  });

  it("should return same array if input array is 1 dimensional", () => {
    expect(flatten([1, 2, 3, 4, 5])).toStrictEqual([1, 2, 3, 4, 5]);
  });

  it("should return flatten array if input array is 2 dimensional", () => {
    expect(flatten([1, [2, 3], [4, 5]])).toStrictEqual([1, 2, 3, 4, 5]);
  });

  it("should return flatten array if input array is 3 dimensional", () => {
    expect(flatten([1, [[2, 3], [4]], 5])).toStrictEqual([1, 2, 3, 4, 5]);
  });

  it("should return empty array if input array multi dimensional and contains no elements", () => {
    expect(flatten([[], [[[]]], [[]], [], []])).toStrictEqual([]);
  });

  it("should not change original array", () => {
    const input = [1, [[2, 3], [4]], 5];
    flatten(input);
    expect(input).toStrictEqual([1, [[2, 3], [4]], 5]);
  });
});
