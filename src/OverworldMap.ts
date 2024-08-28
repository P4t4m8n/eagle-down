import GameObject from "./GameObject/GameObject";
import { IGameObject } from "./GameObject/GameObject.model";
import Person from "./Person/Person";
import { utilService } from "./uti.service";

interface IOverworldMapConfig {
  gameObjects: Record<string, IGameObject>;
  lowerSrc: string;
  upperSrc: string;
}

export interface IOverworldMap {
  gameObjects: Record<string, IGameObject>;
  lowerImg: HTMLImageElement;
  upperImg: HTMLImageElement;
  drawLowerImg(ctx: CanvasRenderingContext2D): void;
  drawUpperImg(ctx: CanvasRenderingContext2D): void;
}
export default class OverworldMap {
  gameObjects: Record<string, IGameObject>;
  lowerImg: HTMLImageElement;
  upperImg: HTMLImageElement;

  constructor(config: IOverworldMapConfig) {
    this.gameObjects = config.gameObjects;

    this.lowerImg = new Image();
    this.lowerImg.src = config.lowerSrc;

    this.upperImg = new Image();
    this.upperImg.src = config.upperSrc;
  }

  drawLowerImg(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.lowerImg, 0, 0);
  }

  drawUpperImg(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.upperImg, 0, 0);
  }
}

interface IRoom {
  lowerSrc: string;
  upperSrc: string;
  gameObjects: Record<string, IGameObject>;
}
declare global {
  interface Window {
    OverworldMaps: Record<"DemoRooms" | "Kitchen", IRoom>;
  }
}

window.OverworldMaps = {
  DemoRooms: {
    lowerSrc: "/images/maps/DemoLower.png",
    upperSrc: "/images/maps/DemoUpper.png",
    gameObjects: {
      hero: new Person({
        x: utilService.withGrid(5),
        y: utilService.withGrid(6),
        src: "/images/characters/people/hero.png",
        isPlayerControlled: true,
      }),
      npc1: new Person({
        x: utilService.withGrid(9),
        y: utilService.withGrid(6),
        src: "/images/characters/people/npc1.png",
      }),
    },
  },
  Kitchen: {
    lowerSrc: "/images/maps/KitchenLower.png",
    upperSrc: "/images/maps/KitchenUpper.png",
    gameObjects: {
      hero: new GameObject({
        x: 2,
        y: 6,
        src: "/images/characters/people/hero.png",
      }),
      npc1: new GameObject({
        x: 9,
        y: 6,
        src: "/images/characters/people/npc1.png",
      }),
      npc2: new GameObject({
        x: 7,
        y: 6,
        src: "/images/characters/people/npc2.png",
      }),
    },
  },
};
