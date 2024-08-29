import { TDirection } from "../DirectionInput/DirectionInput.model";
import { IGameObjectConfig } from "../GameObject/GameObject.model";
import OverworldMap from "../OverworldMap/OverworldMap";
import { IOverworldMap } from "../OverworldMap/OverworldMap.model";

export interface IPersonConfig extends IGameObjectConfig {
  isPlayerControlled?: boolean;
}

export interface IPersonState {
  arrow?: TDirection;
  isPlayerControlled?: boolean;
  map: OverworldMap;
}

export interface IBehaver{
  type: TBehavior;
  direction: TDirection;
}

export type TBehavior = "walk" | "idle";
