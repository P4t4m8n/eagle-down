import { IGameObject } from "../GameObject/GameObject.model";
import { ISpriteConfig, TAnimation } from "./Sprite.model";

export default class Sprite {
  //Variables
  animations: {
    idleDown: number[][];
  };
  currentAnimation: TAnimation;
  currentAnimationFrame: number;
  img: HTMLImageElement;
  isLoaded: boolean = false;
  gameObject: IGameObject;
  shadow: HTMLImageElement;
  isShadowLoaded: boolean = false;
  useShadow: boolean;

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

    //Configure Animation and initial state
    this.animations = config.animations || {
      idleDown: [[0, 0]],
    };
    this.currentAnimation = config.currentAnimation || "idleDown";
    this.currentAnimationFrame = 0;

    //Reference to the gameObject
    this.gameObject = config.gameObject;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const x = this.gameObject.x - 8;
    const y = this.gameObject.y - 18;

    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);
    this.isLoaded && ctx.drawImage(this.img, 0, 0, 32, 32, x, y, 32, 32);
  }
}
