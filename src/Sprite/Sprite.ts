import { IGameObject } from "../GameObject/GameObject.model";
import { utilService } from "../uti.service";
import { ISpriteConfig, TAnimation } from "./Sprite.model";

export default class Sprite {
  //Variables
  animations: Record<TAnimation, number[][]>;
  currentAnimation: TAnimation;
  currentAnimationFrame: number;
  img: HTMLImageElement;
  isLoaded: boolean = false;
  gameObject: IGameObject;
  shadow: HTMLImageElement;
  isShadowLoaded: boolean = false;
  useShadow: boolean;
  animationFrameLimit: number;
  animationFrameProgress: number;

  //Constructor
  constructor(config: ISpriteConfig) {
    //Set up the image
    this.img = new Image();
    this.img.src = config.src;
    this.img.onload = () => {
      this.isLoaded = true;
    };

    //Shadow
    this.shadow = new Image();
    this.useShadow = config.useShadow || false;
    if (this.useShadow) {
      this.shadow.src = "/images/characters/shadow.png";
    }
    this.shadow.onload = () => {
      this.isShadowLoaded = true;
    };

    this.animations = config.animations || {
      "idle-down": [[0, 0]],
      "idle-right": [[0, 1]],
      "idle-up": [[0, 2]],
      "idle-left": [[0, 3]],
      "walk-down": [
        [1, 0],
        [0, 0],
        [3, 0],
        [0, 0],
      ],
      "walk-right": [
        [1, 1],
        [0, 1],
        [3, 1],
        [0, 1],
      ],
      "walk-up": [
        [1, 2],
        [0, 2],
        [3, 2],
        [0, 2],
      ],
      "walk-left": [
        [1, 3],
        [0, 3],
        [3, 3],
        [0, 3],
      ],
    };

    this.currentAnimation = config.currentAnimation || "idle-down";
    this.currentAnimationFrame = 0;

    this.animationFrameLimit = config.animationFrameLimit || 16;
    this.animationFrameProgress = this.animationFrameLimit;

    //Reference to the gameObject
    this.gameObject = config.gameObject;
  }

  get frame(): number[] {
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  }

  set animation(key: TAnimation) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }

  updateAnimationProgress() {
    //Downtick frame progress
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }

    //Reset the counter
    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1;

    if (this.frame === undefined) {
      this.currentAnimationFrame = 0;
    }
  }

  draw(ctx: CanvasRenderingContext2D, cameraPerson?: IGameObject) {
    const x = this.gameObject.x - 8 + utilService.withGrid(10.5) - (cameraPerson?.x || 0)
    const y = this.gameObject.y - 18 + utilService.withGrid(6) - (cameraPerson?.y || 0)

    const [frameX, frameY] = this.frame;

    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);
    this.isLoaded &&
      ctx.drawImage(this.img, frameX * 32, frameY * 32, 32, 32, x, y, 32, 32);

    this.updateAnimationProgress();
  }
}
