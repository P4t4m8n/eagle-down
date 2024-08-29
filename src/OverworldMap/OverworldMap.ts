import { IGameObject } from "../GameObject/GameObject.model";
import Person from "../Person/Person";
import { utilService } from "../uti.service";
import { IOverworldMapConfig } from "./OverworldMap.model";

export interface IOverworldMap {
  gameObjects: Record<string, IGameObject>;
  lowerImg: HTMLImageElement;
  upperImg: HTMLImageElement;
  drawLowerImg(ctx: CanvasRenderingContext2D, cameraPerson: IGameObject): void;
  drawUpperImg(ctx: CanvasRenderingContext2D, cameraPerson: IGameObject): void;
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

  drawLowerImg(ctx: CanvasRenderingContext2D, cameraPerson: IGameObject) {
    ctx.drawImage(
      this.lowerImg,
      utilService.withGrid(10.5) - cameraPerson.x,
      utilService.withGrid(6) - cameraPerson.y
    );
  }

  drawUpperImg(ctx: CanvasRenderingContext2D, cameraPerson: IGameObject) {
    ctx.drawImage(
      this.upperImg,
      utilService.withGrid(10.5) - cameraPerson.x,
      utilService.withGrid(6) - cameraPerson.y
    );
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
      // npc1: new Person({
      //   x: utilService.withGrid(9),
      //   y: utilService.withGrid(6),
      //   src: "/images/characters/people/npc1.png",
      // }),
    },
  },
  Kitchen: {
    lowerSrc: "/images/maps/KitchenLower.png",
    upperSrc: "/images/maps/KitchenUpper.png",
    gameObjects: {
      hero: new Person({
        x: utilService.withGrid(2),
        y: utilService.withGrid(6),
        src: "/images/characters/people/hero.png",
        isPlayerControlled: true,
      }),
      npc1: new Person({
        x: utilService.withGrid(9),
        y: utilService.withGrid(6),
        src: "/images/characters/people/npc1.png",
      }),
      npc2: new Person({
        x: utilService.withGrid(7),
        y: utilService.withGrid(6),
        src: "/images/characters/people/npc2.png",
      }),
    },
  },
};
