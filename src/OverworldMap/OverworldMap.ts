import { TDirection } from "../DirectionInput/DirectionInput.model";
import GameObject from "../GameObject/GameObject";
import { IGameObject } from "../GameObject/GameObject.model";
import Person from "../Person/Person";
import { utilService } from "../uti.service";
import { IOverworldMapConfig } from "./OverworldMap.model";

export default class OverworldMap {
  gameObjects: Record<string, IGameObject>;
  lowerImg: HTMLImageElement;
  upperImg: HTMLImageElement;
  walls: Record<string, boolean>;

  constructor(config: IOverworldMapConfig) {
    this.gameObjects = config.gameObjects;

    this.lowerImg = new Image();
    this.lowerImg.src = config.lowerSrc;

    this.upperImg = new Image();
    this.upperImg.src = config.upperSrc;

    this.walls = config.walls || {};
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

  isSpaceTaken(
    currentX: number,
    currentY: number,
    direction: TDirection
  ): boolean {
    const { x, y } = utilService.nextPosition(currentX, currentY, direction);
    return this.walls[`${x},${y}`] || false;
  }

  mountObjects() {
    Object.values(this.gameObjects).forEach((gameObject) => {
      //TODO: Determine if object should mount
      gameObject.mount(this);
    });
  }

  addWall(x: number, y: number) {
    this.walls[`${x},${y}`] = true;
  }

  removeWall(x: number, y: number) {
    delete this.walls[`${x},${y}`];
  }

  moveWall(wasX: number, wasY: number, direction: TDirection) {
    this.removeWall(wasX, wasY);
    const { x, y } = utilService.nextPosition(wasX, wasY, direction);
    this.addWall(x, y);
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
    walls: {
      [utilService.asGridCoord(7, 6)]: true,
      [utilService.asGridCoord(8, 6)]: true,
      [utilService.asGridCoord(7, 7)]: true,
      [utilService.asGridCoord(8, 7)]: true,
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
    walls: {
      [utilService.asGridCoord(7, 6)]: true,
      [utilService.asGridCoord(8, 6)]: true,
      [utilService.asGridCoord(7, 7)]: true,
      [utilService.asGridCoord(8, 7)]: true,
    },
  },
};
