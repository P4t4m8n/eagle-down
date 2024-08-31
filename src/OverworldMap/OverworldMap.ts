import { TDirection } from "../DirectionInput/DirectionInput.model";
import GameObject from "../GameObject/GameObject";
import { IBehaviorLoop } from "../GameObject/GameObject.model";
import Overworld from "../Overworld/Overworld";
import OverworldEvent from "../OverworldEvent/OverworldEvent";
import Person from "../Person/Person";
import { utilService } from "../uti.service";
import { IOverworldMapConfig } from "./OverworldMap.model";

export default class OverworldMap {
  overworld: null | Overworld = null;
  gameObjects: Record<string, GameObject>;
  lowerImg: HTMLImageElement;
  upperImg: HTMLImageElement;
  walls: Record<string, boolean>;
  cutscenePlaying: boolean;
  cutsceneSpaces?: Record<string, { events: IBehaviorLoop[] }[]>;
  constructor(config: IOverworldMapConfig) {
    this.gameObjects = config.gameObjects;

    this.lowerImg = new Image();
    this.lowerImg.src = config.lowerSrc;

    this.upperImg = new Image();
    this.upperImg.src = config.upperSrc;

    this.walls = config.walls || {};

    this.cutscenePlaying = false;

    this.cutsceneSpaces = config.cutsceneSpaces || {};
  }

  drawLowerImg(ctx: CanvasRenderingContext2D, cameraPerson: GameObject) {
    ctx.drawImage(
      this.lowerImg,
      utilService.withGrid(10.5) - cameraPerson.x,
      utilService.withGrid(6) - cameraPerson.y
    );
  }

  drawUpperImg(ctx: CanvasRenderingContext2D, cameraPerson: GameObject) {
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
    Object.keys(this.gameObjects).forEach((key) => {
      //TODO: Determine if object should mount
      let object = this.gameObjects[key];
      object.id = key;
      object.mount(this);
    });
  }

  checkForActionCutscene() {
    const hero = this.gameObjects["hero"];
    const nextCoords = utilService.nextPosition(hero.x, hero.y, hero.direction);

    const match = Object.values(this.gameObjects).find((object) => {
      return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`;
    });

    if (!this.cutscenePlaying && match && match.talking?.length) {
      this.startCutscene(match.talking[0].events);
    }
  }

  checkForFootStepCutscene() {
    const hero = this.gameObjects["hero"];
    if (!this.cutsceneSpaces) return;
    const match = this.cutsceneSpaces[`${hero.x},${hero.y}`];
    if (!this.cutscenePlaying && match) {
      this.startCutscene(match[0].events);
    }
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

  async startCutscene(events: IBehaviorLoop[]) {
    this.cutscenePlaying = true;

    //Start a loop of event and await each one
    for (let i = 0; i < events.length; i++) {
      const eventHandler = new OverworldEvent({
        map: this,
        event: events[i],
      });
      await eventHandler.init();
    }

    this.cutscenePlaying = false;

    //Reset NPCs to defaults
    Object.values(this.gameObjects).forEach((object) =>
      object.doBehaviorEvent(this)
    );
  }

  get isCutscenePlaying() {
    return this.cutscenePlaying;
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
      npcA: new Person({
        x: utilService.withGrid(7),
        y: utilService.withGrid(9),
        src: "/images/characters/people/npc1.png",
        behaviorLoop: [
          { type: "stand", direction: "left", time: 800 },
          { type: "stand", direction: "up", time: 200 },
          { type: "stand", direction: "right", time: 1600 },
          { type: "stand", direction: "up", time: 200 },
        ],
        talking: [
          {
            events: [
              { type: "textMessage", text: "Hello, world!", faceHero: "npcA" },
              { type: "textMessage", text: "something else" },
              { who: "hero", type: "walk", direction: "up" },
            ],
          },
        ],
      }),
      npcB: new Person({
        x: utilService.withGrid(8),
        y: utilService.withGrid(5),
        src: "/images/characters/people/npc2.png",
        // behaviorLoop: [
        //   { type: "walk", direction: "left" },
        //   { type: "stand", direction: "up", time: 800 },
        //   { type: "walk", direction: "up" },
        //   { type: "walk", direction: "right" },
        //   { type: "walk", direction: "down" },
        // ],
      }),
    },
    walls: {
      [utilService.asGridCoord(7, 6)]: true,
      [utilService.asGridCoord(8, 6)]: true,
      [utilService.asGridCoord(7, 7)]: true,
      [utilService.asGridCoord(8, 7)]: true,
    },
    cutsceneSpaces: {
      [utilService.asGridCoord(7, 4)]: [
        {
          events: [
            { who: "npcB", type: "walk", direction: "left" },
            { who: "npcB", type: "stand", direction: "up", time: 500 },

            { type: "textMessage", text: "You cant be there" },

            { who: "npcB", type: "walk", direction: "right" },

            { who: "hero", type: "walk", direction: "down" },
            { who: "hero", type: "walk", direction: "left" },
          ],
        },
      ],
      [utilService.asGridCoord(5, 10)]: [
        {
          events: [
            {
              type: "changeMap",
              map: "Kitchen",
            },
          ],
        },
      ],
    },
  },
  Kitchen: {
    lowerSrc: "/images/maps/KitchenLower.png",
    upperSrc: "/images/maps/KitchenUpper.png",
    gameObjects: {
      hero: new Person({
        x: utilService.withGrid(5),
        y: utilService.withGrid(5),
        src: "/images/characters/people/hero.png",
        isPlayerControlled: true,
      }),

      npcB: new Person({
        x: utilService.withGrid(10),
        y: utilService.withGrid(8),
        src: "/images/characters/people/npc2.png",
        talking: [
          {
            events: [
              { type: "textMessage", text: "You made it", faceHero: "npcB" },
            ],
          },
        ],
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
