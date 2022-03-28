import { parse } from "../parser";

describe("#parse", () => {
  it("should return input object", () => {
    expect(parse(`${__dirname}/data/input1.txt`)).toStrictEqual({
      conveyorBelt: { x: 0, y: 2 },
      robot: { coordinates: { x: 0, y: 0 }, bagCount: 0 },
      crates: [
        { coordinates: { x: 0, y: 1 }, bagCount: 10 },
        { coordinates: { x: -1, y: -2 }, bagCount: 5 },
      ],
      instructions: ["N", "P", "P", "P", "N", "D"],
    });
  });

  it("should throw an error if too few lines provided", () => {
    expect(() =>
      parse(`${__dirname}/data/not_enough_lines_input.txt`)
    ).toThrowError(
      new Error("Incorrect number of lines - found: 3 expected: 4")
    );
  });

  it("should throw an error if too many lines provided", () => {
    expect(() =>
      parse(`${__dirname}/data/too_many_lines_input.txt`)
    ).toThrowError(
      new Error("Incorrect number of lines - found: 5 expected: 4")
    );
  });
});
