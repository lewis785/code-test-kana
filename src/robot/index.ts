import { Output } from "./types";
import { action } from "./action";
import { parse } from "./parser";

export const robot = (filePath: string) => {
  let { robot, conveyorBelt, crates, instructions } = parse(filePath);
  let error = false;
  let result: Output;

  instructions.every((instruction) => {
    if (error) {
      return false;
    }

    result = action(robot, conveyorBelt, crates, instruction);

    robot = result.robot;
    error = result.error;
    crates = result.crates;
    conveyorBelt = result.conveyorBelt;

    return true;
  });

  const status = error ? "BROKEN" : "OK";
  return `${conveyorBelt.bagCount}\n${robot.coordinates.x} ${robot.coordinates.y} ${status}`;
  return {
    conveyorBeltBags: result!.conveyorBelt.bagCount,
    robot: {
      coordinates: result!.robot.coordinates,
      status: result!.error ? "BROKEN" : "OK",
    },
  };
};
