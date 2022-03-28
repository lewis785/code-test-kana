import { move } from "./move";
import { Coordinates, Container, Output } from "./types";
export const action = (
  robot: Container,
  conveyorBelt: Coordinates,
  crates: Record<string, Container>,
  action: string
): Output => {
  switch (action) {
    case "P":
      return pickUpAction(robot, crates);
    case "D":
      return { crates, ...dropAction(robot, conveyorBelt) };
    default:
      return { crates, error: false, robot: moveAction(robot, action) };
  }
};

const dropAction = (
  robot: Container,
  conveyorBelt: Coordinates
): { robot: Container; error: boolean } => {
  const { coordinates } = robot;

  const isOverConveyor =
    coordinates.x === conveyorBelt.x && coordinates.y === conveyorBelt.y;

  return { robot: { ...robot, bagCount: 0 }, error: !isOverConveyor };
};

const moveAction = (robot: Container, direction: string): Container => {
  const newPosition = move(robot.coordinates, direction);
  return { ...robot, coordinates: newPosition };
};

const pickUpAction = (
  robot: Container,
  crates: Record<string, Container>
): Output => {
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
