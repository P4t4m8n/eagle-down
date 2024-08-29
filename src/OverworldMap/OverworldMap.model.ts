import { TDirection } from "../DirectionInput/DirectionInput.model";
import GameObject from "../GameObject/GameObject";
import { IGameObject } from "../GameObject/GameObject.model";

export interface IRoom {
  lowerSrc: string;
  upperSrc: string;
  gameObjects: Record<string, GameObject>;
  walls: Record<string, boolean>;
}
declare global {
  interface Window {
    OverworldMaps: Record<"DemoRooms" | "Kitchen", IRoom>;
  }
}

export interface IOverworldMapConfig {
  walls: {};
  gameObjects: Record<string, GameObject>;
  lowerSrc: string;
  upperSrc: string;
}

export interface IOverworldMap {
  gameObjects: Record<string, GameObject>;
  lowerImg: HTMLImageElement;
  upperImg: HTMLImageElement;
  drawLowerImg(ctx: CanvasRenderingContext2D, cameraPerson: GameObject): void;
  drawUpperImg(ctx: CanvasRenderingContext2D, cameraPerson: IGameObject): void;
  walls: Record<string, boolean>;
  isSpaceTaken(
    currentX: number,
    currentY: number,
    direction: TDirection
  ): boolean;
}
