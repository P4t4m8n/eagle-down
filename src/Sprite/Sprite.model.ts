import { IGameObject } from "../GameObject/GameObject.model";

export type TAnimation = "idleDown";

export interface ISpriteConfig {
  useShadow: boolean;
  gameObject: IGameObject;
  src: string;
  animations?: {
    idleDown: number[][];
  };
  currentAnimation?: TAnimation;
}

export interface ISprite {
  animations: {
    idleDown: number[][];
  };
  currentAnimation: TAnimation;
  currentAnimationFrame: number;
  img: HTMLImageElement;
  isLoaded: boolean;
  gameObject: IGameObject;
  shadow: HTMLImageElement;
  isShadowLoaded: boolean;
  useShadow: boolean;
  draw: Function;
}
