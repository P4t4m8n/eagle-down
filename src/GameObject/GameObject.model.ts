import { TDirection } from "../DirectionInput/DirectionInput.model";
import { TBehavior } from "../Person/Person.model";

export interface IGameObjectConfig {
  direction?: TDirection;
  x: number;
  y: number;
  src: string;
  behaviorLoop?: IBehaviorLoop[];
  talking?: { events: IBehaviorLoop[] }[];
}

export interface IBehaviorLoop {
  type: TBehavior;
  direction?: TDirection;
  time?: number;
  who?: string;
  text?: string;
  faceHero?: string;
  map?: "DemoRooms" | "Kitchen";
}
