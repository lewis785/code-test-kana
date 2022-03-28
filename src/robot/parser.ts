import fs from "fs";
import { Coordinates, Container, Input } from "./types";

export const parse = (filePath: string): Input => {
  const input = fs.readFileSync(filePath).toString("utf-8").split("\n");

  if (input.length !== 4) {
    throw new Error(
      `Incorrect number of lines - found: ${input.length} expected: 4`
    );
  }

  const [conveyor, robot, crates, instructions] = input;

  return {
    conveyorBelt: stringToCoordinates(conveyor),
    robot: { coordinates: stringToCoordinates(robot), bagCount: 0 },
    crates: parseCrates(crates),
    instructions: instructions.split(""),
  };
};

const parseCrates = (cratesString: string): Container[] => {
  const crates = cratesString.split(", ");
  return crates.map<Container>((crateString) => {
    const [x, y, bags] = crateString.split(" ");
    return {
      coordinates: {
        x: Number(x),
        y: Number(y),
      },
      bagCount: Number(bags),
    };
  });
};

const stringToCoordinates = (coordString: string): Coordinates => {
  const [x, y] = coordString.split(" ");
  return { x: Number(x), y: Number(y) };
};
