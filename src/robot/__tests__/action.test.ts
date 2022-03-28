import { Container } from "../types";
import { action } from "../action";

describe("robot", () => {
  let robot: Container = {
    coordinates: { x: 0, y: 0 },
    bagCount: 0,
  };

  let crates: Record<string, Container> = {};
  beforeEach(() => {
    crates = {
      "-1:-1": { coordinates: { x: -1, y: -1 }, bagCount: 5 },
    };
  });

  let conveyBelt = { x: 1, y: 1 };

  describe("pickup actions", () => {
    describe("crate contains bags", () => {
      beforeEach(() => {
        crates = { "0:0": { coordinates: { x: -1, y: -1 }, bagCount: 5 } };
      });

      it("should increase bags carried by robot", () => {
        expect(action(robot, conveyBelt, crates, "P").robot.bagCount).toBe(1);
      });

      it("should decrease bags carried by crate", () => {
        expect(action(robot, conveyBelt, crates, "P").crates).toStrictEqual({
          "0:0": { coordinates: { x: -1, y: -1 }, bagCount: 4 },
        });
      });

      it("should not error", () => {
        expect(action(robot, conveyBelt, crates, "P").error).toBe(false);
      });
    });

    describe("crate empty", () => {
      beforeEach(() => {
        crates = { "0:0": { coordinates: { x: 0, y: 0 }, bagCount: 0 } };
      });

      it("should not increase bags carried by robot", () => {
        expect(action(robot, conveyBelt, crates, "P").robot.bagCount).toBe(0);
      });

      it("should not decrease bags carried by crate", () => {
        expect(action(robot, conveyBelt, crates, "P").crates).toStrictEqual({
          "0:0": { coordinates: { x: 0, y: 0 }, bagCount: 0 },
        });
      });

      it("should not error", () => {
        expect(action(robot, conveyBelt, crates, "P").error).toBe(false);
      });
    });

    describe("no crate", () => {
      it("should not increase bags carried by robot", () => {
        expect(action(robot, conveyBelt, crates, "P").robot.bagCount).toBe(0);
      });

      it("should not decrease bags carried by crate", () => {
        expect(action(robot, conveyBelt, crates, "P").crates).toStrictEqual({
          "-1:-1": { coordinates: { x: -1, y: -1 }, bagCount: 5 },
        });
      });

      it("should error", () => {
        expect(action(robot, conveyBelt, crates, "P").error).toBe(true);
      });
    });
  });

  describe("drop action", () => {
    describe("not over conveyor belt", () => {
      it("should set robot bag count to zero", () => {
        expect(action(robot, conveyBelt, crates, "D").robot.bagCount).toBe(0);
      });

      it("should error", () => {
        expect(action(robot, conveyBelt, crates, "D").error).toBe(true);
      });
    });

    describe("over conveyor belt", () => {
      beforeEach(() => {
        conveyBelt = { x: 0, y: 0 };
      });

      it("should set robot bag count to zero", () => {
        expect(action(robot, conveyBelt, crates, "D").robot.bagCount).toBe(0);
      });

      it("should error", () => {
        expect(action(robot, conveyBelt, crates, "D").error).toBe(false);
      });
    });
  });

  describe("move action", () => {
    it("should not change crates", () => {
      expect(action(robot, conveyBelt, crates, "N").crates).toStrictEqual(
        crates
      );
    });

    it("should not error", () => {
      expect(action(robot, conveyBelt, crates, "N").error).toBe(false);
    });

    it.each([
      ["N", { x: 0, y: 1 }],
      ["S", { x: 0, y: -1 }],
      ["W", { x: 1, y: 0 }],
      ["E", { x: -1, y: 0 }],
    ])("should move robot in direction: %s", (direction, expectedPosition) => {
      expect(
        action(robot, conveyBelt, crates, direction).robot.coordinates
      ).toStrictEqual(expectedPosition);
    });
  });
});
