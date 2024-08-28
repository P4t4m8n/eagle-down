import { IGameObject } from "../GameObject/GameObject.model";

export type TAnimation =
  | "idle-down"
  | "idle-right"
  | "idle-up"
  | "idle-left"
  | "walk-down"
  | "walk-right"
  | "walk-up"
  | "walk-left";

export interface ISpriteConfig {
  animationFrameLimit: number;
  useShadow: boolean;
  gameObject: IGameObject;
  src: string;
  animations?: Record<TAnimation, number[][]>;
  currentAnimation?: TAnimation;
}

export interface ISprite {
  draw: Function;
  frame: number[];
  updateAnimationProgress: Function;
  animation: TAnimation;
}
