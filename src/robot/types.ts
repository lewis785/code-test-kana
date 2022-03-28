export interface Coordinates {
  x: number;
  y: number;
}

export interface Crate {
  coordinates: Coordinates;
  bagCount: number;
}

export interface Input {
  conveyorBelt: Coordinates;
  robot: Coordinates;
  crates: Crate[];
  instructions: string[];
}
