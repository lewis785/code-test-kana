import { move } from "./move";
import { Container, Output } from "./types";
export const action = (
  robot: Container,
  conveyorBelt: Container,
  crates: Record<string, Container>,
  action: string
): Output => {
  switch (action) {
    case "P":
      return { conveyorBelt, ...pickUpAction(robot, crates) };
    case "D":
      return { crates, ...dropAction(robot, conveyorBelt) };
    case "N":
    case "S":
    case "W":
    case "E":
      return {
        crates,
        conveyorBelt,
        error: false,
        robot: moveAction(robot, action),
      };
    default:
      throw new Error("Invalid action");
  }
};

const dropAction = (
  robot: Container,
  conveyorBelt: Container
): { robot: Container; conveyorBelt: Container; error: boolean } => {
  const { coordinates } = robot;

  const isOverConveyor =
    coordinates.x === conveyorBelt.coordinates.x &&
    coordinates.y === conveyorBelt.coordinates.y;

  if (!isOverConveyor) {
    return {
      robot: { ...robot, bagCount: 0 },
      conveyorBelt,
      error: true,
    };
  }

  return {
    robot: { ...robot, bagCount: 0 },
    conveyorBelt: {
      ...conveyorBelt,
      bagCount: conveyorBelt.bagCount + robot.bagCount,
    },
    error: false,
  };
};

const moveAction = (robot: Container, direction: string): Container => {
  const newPosition = move(robot.coordinates, direction);
  return { ...robot, coordinates: newPosition };
};

const pickUpAction = (
  robot: Container,
  crates: Record<string, Container>
): { robot: Container; crates: Record<string, Container>; error: boolean } => {
  const crateId = `${robot.coordinates.x}:${robot.coordinates.y}`;

  const crate = crates[crateId];

  if (crate === undefined) {
    return { robot, crates, error: true };
  }

  if (crate.bagCount === 0) {
    return { robot, crates, error: false };
  }

  const updatedCrates = {
    ...crates,
    [crateId]: { ...crate, bagCount: crate.bagCount - 1 },
  };

  return {
    robot: { ...robot, bagCount: robot.bagCount + 1 },
    crates: updatedCrates,
    error: false,
  };
};
