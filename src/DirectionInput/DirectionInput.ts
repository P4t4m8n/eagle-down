import { TDirection, TMapDirection } from "./DirectionInput.model";

export default class DirectionInput {
  heldDirections: TDirection[];
  map: Record<TMapDirection, TDirection>;
  constructor() {
    this.heldDirections = [];

    this.map = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
      KeyW: "up",
      KeyS: "down",
      KeyA: "left",
      KeyD: "right",
    };
  }

  get direction() {
    return this.heldDirections[0];
  }

  init() {
    document.addEventListener("keydown", (e) => {
      const direction = this.map[e.code as TMapDirection] as TDirection;
      if (direction && this.heldDirections.indexOf(direction) === -1) {
        this.heldDirections.unshift(direction);
      }
    });

    document.addEventListener("keyup", (e) => {
      const direction = this.map[e.code as TMapDirection] as TDirection;
      const idx = this.heldDirections.indexOf(direction);
      if (idx > -1) {
        this.heldDirections.splice(idx, 1);
      }
    });
  }
}
