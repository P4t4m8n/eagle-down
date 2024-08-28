import { TDirection } from "../DirectionInput/DirectionInput.model";
import { ISprite } from "../Sprite/Sprite.model";

export interface IGameObjectConfig {
  direction?: TDirection;
  x: number;
  y: number;
  src: string;
}

export interface IGameObject {
  x: number;
  y: number;
  sprite: ISprite;
  update: Function;
  direction: TDirection;
}
