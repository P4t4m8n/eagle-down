import { TDirection } from "../DirectionInput/DirectionInput.model";
import { IGameObjectConfig } from "../GameObject/GameObject.model";
import OverworldMap from "../OverworldMap/OverworldMap";

export interface IPersonConfig extends IGameObjectConfig {
  isPlayerControlled?: boolean;
}

export interface IPersonState {
  arrow?: TDirection;
  isPlayerControlled?: boolean;
  map: OverworldMap;
}

export interface IBehaver {
  type: TBehavior;
  direction: TDirection;
  time?: number;
  retry?: boolean;
}

export type TBehavior = "walk" | "idle" | "stand" | "textMessage" | "changeMap";
