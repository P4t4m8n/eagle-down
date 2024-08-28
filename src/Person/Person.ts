import { TDirection } from "../DirectionInput/DirectionInput.model";
import GameObject from "../GameObject/GameObject";
import { IPersonConfig, IPersonState } from "./Person.model";

export default class Person extends GameObject {
  movingProgressRemaining: number;
  directionUpdate: Record<TDirection, ["x" | "y", number]>;
  isPlayerControlled: boolean;
  constructor(config: IPersonConfig) {
    super(config);

    this.movingProgressRemaining = 0;

    this.directionUpdate = {
      up:    ["y", -1],
      down:  ["y",  1],
      left:  ["x", -1],
      right: ["x",  1],
    };

    this.isPlayerControlled = config.isPlayerControlled || false;
  }

  update(state?: IPersonState) {
    this.updatePosition();

    if (
      this.movingProgressRemaining > 0 ||
      !state?.arrow ||
      !this.isPlayerControlled
    ) {
      return;
    }
    this.direction = state.arrow;
    this.movingProgressRemaining = 16;
  }

  updatePosition() {
    if (this.movingProgressRemaining > 0) {
      const [property, change] = this.directionUpdate[this.direction];
      this[property] += change;
      this.movingProgressRemaining -= 1;
    }
  }
}
