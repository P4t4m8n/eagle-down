import { IBehaviorLoop } from "../GameObject/GameObject.model";
import OverworldMap from "../OverworldMap/OverworldMap";

export interface IEventConfig extends IBehaviorLoop {
  who?: string;
  text?: string;
}

export interface IOverworldEventConfig{
    map: OverworldMap;
    event: IEventConfig;
}
