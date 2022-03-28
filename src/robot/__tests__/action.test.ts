import { Container } from "../types";
import { action } from "../action";

describe("action", () => {
  let robot: Container;

  let crates: Record<string, Container> = {};
  let conveyorBelt: Container;

  beforeEach(() => {
    robot = {
      coordinates: { x: 0, y: 0 },
      bagCount: 0,
    };
    crates = {
      "-1:-1": { coordinates: { x: -1, y: -1 }, bagCount: 5 },
    };
    conveyorBelt = {
      coordinates: { x: 1, y: 1 },
      bagCount: 0,
    };
  });

  it("should throw error if invalid action provided", () => {
    expect(() => action(robot, conveyorBelt, crates, "Z")).toThrowError(
      new Error("Invalid action")
    );
  });

  describe("pickup actions", () => {
    describe("crate contains bags", () => {
      beforeEach(() => {
        crates = { "0:0": { coordinates: { x: -1, y: -1 }, bagCount: 5 } };
      });

      it("should increase bags carried by robot", () => {
        expect(action(robot, conveyorBelt, crates, "P").robot.bagCount).toBe(1);
      });

      it("should decrease bags carried by crate", () => {
        expect(action(robot, conveyorBelt, crates, "P").crates).toStrictEqual({
          "0:0": { coordinates: { x: -1, y: -1 }, bagCount: 4 },
        });
      });

      it("should not error", () => {
        expect(action(robot, conveyorBelt, crates, "P").error).toBe(false);
      });
    });

    describe("crate empty", () => {
      beforeEach(() => {
        crates = { "0:0": { coordinates: { x: 0, y: 0 }, bagCount: 0 } };
      });

      it("should not increase bags carried by robot", () => {
        expect(action(robot, conveyorBelt, crates, "P").robot.bagCount).toBe(0);
      });

      it("should not decrease bags carried by crate", () => {
        expect(action(robot, conveyorBelt, crates, "P").crates).toStrictEqual({
          "0:0": { coordinates: { x: 0, y: 0 }, bagCount: 0 },
        });
      });

      it("should not error", () => {
        expect(action(robot, conveyorBelt, crates, "P").error).toBe(false);
      });
    });

    describe("no crate", () => {
      it("should not increase bags carried by robot", () => {
        expect(action(robot, conveyorBelt, crates, "P").robot.bagCount).toBe(0);
      });

      it("should not decrease bags carried by crate", () => {
        expect(action(robot, conveyorBelt, crates, "P").crates).toStrictEqual({
          "-1:-1": { coordinates: { x: -1, y: -1 }, bagCount: 5 },
        });
      });

      it("should error", () => {
        expect(action(robot, conveyorBelt, crates, "P").error).toBe(true);
      });
    });
  });

  describe("drop action", () => {
    beforeEach(() => {
      robot = { ...robot, bagCount: 5 };
    });

    describe("not over conveyor belt", () => {
      it("should set robot bag count to zero", () => {
        expect(action(robot, conveyorBelt, crates, "D").robot.bagCount).toBe(0);
      });

      it("should not increase convey belt bag count", () => {
        expect(
          action(robot, conveyorBelt, crates, "D").conveyorBelt.bagCount
        ).toBe(0);
      });

      it("should error", () => {
        expect(action(robot, conveyorBelt, crates, "D").error).toBe(true);
      });
    });

    describe("over conveyor belt", () => {
      beforeEach(() => {
        conveyorBelt = {
          coordinates: { x: 0, y: 0 },
          bagCount: 0,
        };
      });

      it("should set robot bag count to zero", () => {
        expect(action(robot, conveyorBelt, crates, "D").robot.bagCount).toBe(0);
      });

      it("should increase convey belt bag count", () => {
        expect(
          action(robot, conveyorBelt, crates, "D").conveyorBelt.bagCount
        ).toBe(5);
      });

      it("should error", () => {
        expect(action(robot, conveyorBelt, crates, "D").error).toBe(false);
      });
    });
  });

  describe("move action", () => {
    it("should not change crates", () => {
      expect(action(robot, conveyorBelt, crates, "N").crates).toStrictEqual(
        crates
      );
    });

    it("should not error", () => {
      expect(action(robot, conveyorBelt, crates, "N").error).toBe(false);
    });

    it.each([
      ["N", { x: 0, y: 1 }],
      ["S", { x: 0, y: -1 }],
      ["W", { x: -1, y: 0 }],
      ["E", { x: 1, y: 0 }],
    ])("should move robot in direction: %s", (direction, expectedPosition) => {
      expect(
        action(robot, conveyorBelt, crates, direction).robot.coordinates
      ).toStrictEqual(expectedPosition);
    });
  });
});
