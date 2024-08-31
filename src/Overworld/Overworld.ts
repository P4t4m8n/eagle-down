import { ICustomEvent, IDetail } from "../app.model";
import DirectionInput from "../DirectionInput/DirectionInput";
import KeyPressListener from "../KeyPressListener/KeyPressListener";
import OverworldMap from "../OverworldMap/OverworldMap";
import { IOverworldMapConfig } from "../OverworldMap/OverworldMap.model";
import Person from "../Person/Person";
import { utilService } from "../uti.service";
import { IOverworldConfig } from "./Overworld.model";

export default class Overworld {
  element: HTMLDivElement | null;
  canvas: HTMLCanvasElement | null | undefined;
  ctx: CanvasRenderingContext2D | null | undefined;
  map: OverworldMap | null;
  directionInput: DirectionInput | null = null;
  constructor(config: IOverworldConfig) {
    this.element = config.element;
    this.canvas = this.element?.querySelector(".game-canvas");
    this.ctx = this.canvas?.getContext("2d");
    this.map = null;
  }

  startMap(mapConfig: IOverworldMapConfig) {
    this.map = new OverworldMap(mapConfig);
    this.map.overworld = this;
    this.map.mountObjects();
  }

  init() {
    this.startMap(window.OverworldMaps.DemoRooms);

    this.bindActionInput();
    this.bindHeroPositionCheck();

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGameLoop();

    this.map?.startCutscene([
      // { who: "hero", type: "walk", direction: "down" },
      // { who: "hero", type: "walk", direction: "down" },
      // { who: "npcA", type: "walk", direction: "up" },
      // { who: "npcA", type: "walk", direction: "left" },
      // { who: "hero", type: "stand", direction: "right", time: 200 },
      // { type: "textMessage", text: "Hello, world!" },
    ]);
  }
  bindHeroPositionCheck() {
    document.addEventListener("PersonWalkingComplete", (e) => {
      if ((e as ICustomEvent<IDetail>).detail.whoId === "hero") {
        //Hero position changed
        this.map?.checkForFootStepCutscene();
      }
    });
  }

  bindActionInput() {
    new KeyPressListener("Enter", () => {
      //Check if Pearson to talk
      this.map?.checkForActionCutscene();
    });
  }

  startGameLoop() {
    const fps = 60; // Fixed updates per second
    const frameDuration = 1000 / fps;
    let lastTime = 0;
    let accumulatedTime = 0;

    const step = (timestamp: number) => {
      if (lastTime === 0) {
        lastTime = timestamp;
      }

      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      accumulatedTime += deltaTime;

      // Run the game logic at a fixed rate
      while (accumulatedTime >= frameDuration) {
        this.ctx?.clearRect(0, 0, this.canvas?.width!, this.canvas?.height!);

        // Establish the camera person
        const cameraPerson = this.map?.gameObjects.hero;

        // Update all objects
        Object.values(this.map?.gameObjects!).forEach((gameObject) => {
          if (gameObject instanceof Person) {
            gameObject.update({
              arrow: this.directionInput?.direction,
              map: this.map!,
            });
          }
        });

        this.map?.drawLowerImg(this.ctx!, cameraPerson!);

        // Draw game objects
        Object.values(this.map?.gameObjects!)
          .sort((a, b) => a.y - b.y)
          .forEach((gameObject) => {
            gameObject.sprite.draw(this.ctx!, cameraPerson);
          });

        this.map?.drawUpperImg(this.ctx!, cameraPerson!);

        accumulatedTime -= frameDuration;
      }

      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }
}
