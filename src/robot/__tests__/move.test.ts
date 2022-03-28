import { move } from "../move";

describe("move", () => {
  it("should increase y if direction is N", () => {
    expect(move({ x: 0, y: 0 }, "N")).toStrictEqual({ x: 0, y: 1 });
  });

  it("should decrease y if direction is S", () => {
    expect(move({ x: 0, y: 0 }, "S")).toStrictEqual({ x: 0, y: -1 });
  });

  it("should increase x if direction is W", () => {
    expect(move({ x: 0, y: 0 }, "W")).toStrictEqual({ x: 1, y: 0 });
  });

  it("should decrease x if direction is E", () => {
    expect(move({ x: 0, y: 0 }, "E")).toStrictEqual({ x: -1, y: 0 });
  });

  it("should throw error if invalid direction provided", () => {
    expect(() => move({ x: 0, y: 0 }, "Z")).toThrowError(
      new Error("Invalid direction")
    );
  });
});
