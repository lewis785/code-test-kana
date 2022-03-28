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
  }
  console.log(conveyorBelt);
  return { robot, crates, error: false };
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
