import { TDirection } from "../DirectionInput/DirectionInput.model";
import Sprite from "../Sprite/Sprite";
import { IGameObjectConfig } from "./GameObject.model";

export default class GameObject {
  y: number;
  x: number;
  sprite: Sprite;
  direction: TDirection;
  constructor(config: IGameObjectConfig) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || "up";
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "/images/characters/people/hero.png",
      useShadow: true,
      animationFrameLimit:16,
    });
  }

  update() {}
}
