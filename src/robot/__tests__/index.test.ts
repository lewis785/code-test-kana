import { robot } from "../index";

describe("robot", () => {
  it.each([
    [`${__dirname}/data/input1.txt`, "3\n0 2 OK"],
    [`${__dirname}/data/input2.txt`, "0\n0 1 BROKEN"],
    [`${__dirname}/data/input3.txt`, "5\n0 3 OK"],
    [`${__dirname}/data/input4.txt`, "1\n-2 -1 BROKEN"],
  ])("should return expected result", (path: string, result) => {
    expect(robot(path)).toBe(result);
  });
});
