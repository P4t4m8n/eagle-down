import { TDirection } from "../DirectionInput/DirectionInput.model";
import GameObject from "../GameObject/GameObject";
import { utilService } from "../uti.service";
import { IBehaver, IPersonConfig, IPersonState } from "./Person.model";

export default class Person extends GameObject {
  movingProgressRemaining: number;
  directionUpdate: Record<TDirection, ["x" | "y", number]>;
  isPlayerControlled: boolean;

  constructor(config: IPersonConfig) {
    super(config);

    this.movingProgressRemaining = 0;
    this.isStanding = false;

    this.directionUpdate = {
      up: ["y", -1],
      down: ["y", 1],
      left: ["x", -1],
      right: ["x", 1],
    };

    this.isPlayerControlled = config.isPlayerControlled || false;
  }

  update(state?: IPersonState) {
    if (this.movingProgressRemaining > 0) {
      this.updatePosition();
    } else {
      //TODO More cased for starting to walk

      //Case:Keyboard ready and have arrow pressed
      if (
        !state?.map.isCutscenePlaying &&
        state?.arrow &&
        this.isPlayerControlled
      ) {
        this.startBehavior(state, {
          type: "walk",
          direction: state.arrow,
        });
      }
      this.updateSprite();
    }
  }

  startBehavior(state: IPersonState, behavior: IBehaver) {
    //Set character direction to whatever behaver has
    this.direction = behavior.direction;
    if (behavior.type === "walk") {
      //Stop here if space is not free
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
        behavior.retry &&
          setTimeout(() => {
            this.startBehavior(state, behavior);
          }, behavior.time || 10);
        return;
      }
      //Keep moving
      state.map.moveWall(this.x, this.y, this.direction);
      this.movingProgressRemaining = 16;
      this.updateSprite();
    }

    if (behavior.type === "stand") {
      this.isStanding = true;
      setTimeout(() => {
        utilService.emitEvent("PersonStandComplete", {
          whoId: this.id || "",
        });
        this.isStanding = false;
      }, behavior.time);
    }
  }

  updatePosition() {
    const [property, change] = this.directionUpdate[this.direction];
    this[property] += change;
    this.movingProgressRemaining -= 1;

    if (!this.movingProgressRemaining) {
      //Finished walk
      utilService.emitEvent("PersonWalkingComplete", {
        whoId: this.id || "",
      });
    }
  }

  updateSprite() {
    if (this.movingProgressRemaining) {
      this.sprite.animation = `walk-${this.direction}`;
      return;
    }

    this.sprite.animation = `idle-${this.direction}`;
  }
}
