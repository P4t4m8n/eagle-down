export interface IDetail {
  whoId: string;
}

export type TCustomEvent = "PersonWalkingComplete" | "PersonStandComplete";

export interface ICustomEvent<T> extends CustomEvent {
  detail: T;
}
