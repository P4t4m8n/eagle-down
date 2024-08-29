import DirectionInput from "../DirectionInput/DirectionInput";
import OverworldMap from "../OverworldMap/OverworldMap";
import Person from "../Person/Person";
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

  init() {
    this.map = new OverworldMap(window.OverworldMaps.DemoRooms);
    this.map.mountObjects();

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGameLoop();
  }

  startGameLoop() {
    const step = () => {
      this.ctx?.clearRect(0, 0, this.canvas?.width!, this.canvas?.height!);

      //Establish the camera person
      const cameraPerson = this.map?.gameObjects.hero;

      //Update all objects
      Object.values(this.map?.gameObjects!).forEach((gameObject) => {
        if (gameObject instanceof Person) {
          gameObject.update({
            arrow: this.directionInput?.direction,
            map: this.map!,
          });
        }
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
