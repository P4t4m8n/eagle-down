export interface IDirectionInput {
  heldDirections: TDirection[];
  init: Function;
  map: Record<TMapDirection, TDirection>;
  direction: TDirection;
}

export type TDirection = "down" | "up" | "left" | "right";

export type TMapDirection =
  | "ArrowUp"
  | "ArrowDown"
  | "ArrowLeft"
  | "ArrowRight"
  | "KeyW"
  | "KeyS"
  | "KeyA"
  | "KeyD";
