export interface Coordinates {
  x: number;
  y: number;
}

export interface Container {
  coordinates: Coordinates;
  bagCount: number;
}

export interface Input {
  conveyorBelt: Coordinates;
  robot: Container;
  crates: Container[];
  instructions: string[];
}
