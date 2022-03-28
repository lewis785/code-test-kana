import { Coordinates } from "./types";

export const move = ({ x, y }: Coordinates, direction: string) => {
  switch (direction) {
    case "N":
      return { x, y: y + 1 };
    case "S":
      return { x, y: y - 1 };
    case "W":
      return { x: x + 1, y };
    case "E":
      return { x: x - 1, y };
    default:
      throw new Error("Invalid direction");
  }
};
