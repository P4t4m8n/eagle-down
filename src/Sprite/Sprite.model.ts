import GameObject from "../GameObject/GameObject";

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
  gameObject: GameObject;
  src: string;
  animations?: Record<TAnimation, number[][]>;
  currentAnimation?: TAnimation;
}

