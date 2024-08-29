import DirectionInput from "../DirectionInput/DirectionInput";
import { IDirectionInput } from "../DirectionInput/DirectionInput.model";
import OverworldMap, { IOverworldMap } from "../OverworldMap/OverworldMap";
import { IOverworldConfig } from "./Overworld.model";

export default class Overworld {
  element: HTMLDivElement | null;
  canvas: HTMLCanvasElement | null | undefined;
  ctx: CanvasRenderingContext2D | null | undefined;
  map: IOverworldMap | null;
  directionInput: IDirectionInput | null = null;
  constructor(config: IOverworldConfig) {
    this.element = config.element;
    this.canvas = this.element?.querySelector(".game-canvas");
    this.ctx = this.canvas?.getContext("2d");
    this.map = null;
  }

  init() {
    this.map = new OverworldMap(window.OverworldMaps.Kitchen);

    this.directionInput = new DirectionInput();
    this.directionInput.init();
    this.directionInput.direction;
    console.log(
      "this.directionInput.direction:",
      this.directionInput.direction
    );

    this.startGameLoop();
  }

  startGameLoop() {
    const step = () => {
      this.ctx?.clearRect(0, 0, this.canvas?.width!, this.canvas?.height!);

      //Establish the camera person
      const cameraPerson = this.map?.gameObjects.hero;

      //Update all objects
      Object.values(this.map?.gameObjects!).forEach((gameObject) => {
        gameObject.update({
          arrow: this.directionInput?.direction,
        });
      });

      this.map?.drawLowerImg(this.ctx!, cameraPerson!);

      //Draw game objects
      Object.values(this.map?.gameObjects!).forEach((gameObject) => {
        gameObject.sprite.draw(this.ctx!, cameraPerson);
      });

      this.map?.drawUpperImg(this.ctx!, cameraPerson!);
      requestAnimationFrame(() => {
        step();
      });
    };

    step();
  }
}
