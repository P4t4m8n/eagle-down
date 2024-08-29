import GameObject from "../GameObject/GameObject";

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
