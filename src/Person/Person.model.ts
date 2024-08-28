import { TDirection } from "../DirectionInput/DirectionInput.model";
import { IGameObjectConfig } from "../GameObject/GameObject.model";

export interface IPersonConfig extends IGameObjectConfig {
  isPlayerControlled?: boolean;
}

export interface IPersonState {
  arrow?: TDirection;
  isPlayerControlled?: boolean;
}
