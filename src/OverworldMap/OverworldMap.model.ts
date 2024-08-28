import { IGameObject } from "../GameObject/GameObject.model";

export interface IRoom {
  lowerSrc: string;
  upperSrc: string;
  gameObjects: Record<string, IGameObject>;
}
declare global {
  interface Window {
    OverworldMaps: Record<"DemoRooms" | "Kitchen", IRoom>;
  }
}

export interface IOverworldMapConfig {
  gameObjects: Record<string, IGameObject>;
  lowerSrc: string;
  upperSrc: string;
}
