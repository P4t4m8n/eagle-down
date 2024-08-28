import DirectionInput from "./DirectionInput/DirectionInput";
import { IDirectionInput } from "./DirectionInput/DirectionInput.model";
import OverworldMap, { IOverworldMap } from "./OverworldMap";

interface OverworldConfig {
  element: HTMLDivElement | null;
}

export default class Overworld {
  element: HTMLDivElement | null;
  canvas: HTMLCanvasElement | null | undefined;
  ctx: CanvasRenderingContext2D | null | undefined;
  map: IOverworldMap | null;
  directionInput: IDirectionInput | null = null;
  constructor(config: OverworldConfig) {
    this.element = config.element;
    this.canvas = this.element?.querySelector(".game-canvas");
    this.ctx = this.canvas?.getContext("2d");
    this.map = null;
  }

  init() {
    this.map = new OverworldMap(window.OverworldMaps.DemoRooms);

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

      this.map?.drawLowerImg(this.ctx!);

      //Draw game objects
      Object.values(this.map?.gameObjects!).forEach((gameObject) => {
        gameObject.update({
          arrow: this.directionInput?.direction,
        });
        gameObject.sprite.draw(this.ctx!);
      });

      this.map?.drawUpperImg(this.ctx!);
      requestAnimationFrame(() => {
        step();
      });
    };

    step();
  }
}
