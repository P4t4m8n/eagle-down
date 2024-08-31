import GameObject from "../GameObject/GameObject";
import { IBehaviorLoop } from "../GameObject/GameObject.model";

export interface IRoom {
  lowerSrc: string;
  upperSrc: string;
  gameObjects: Record<string, GameObject>;
  walls: Record<string, boolean>;
  cutsceneSpaces?: Record<string, { events: IBehaviorLoop[] }[]>;
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
  cutsceneSpaces?: Record<string, { events: IBehaviorLoop[] }[]>;

}
