import { IDetail, TCustomEvent } from "./app.model";
import { TDirection } from "./DirectionInput/DirectionInput.model";

const withGrid = (num: number): number => {
  return num * 16;
};

const asGridCoord = (x: number, y: number): string => {
  return `${x * 16},${y * 16}`;
};

const nextPosition = (
  initialX: number,
  initialY: number,
  direction: TDirection
): { x: number; y: number } => {
  let x = initialX;
  let y = initialY;
  const size = 16;

  switch (direction) {
    case "up":
      y -= size;
      break;
    case "down":
      y += size;
      break;
    case "left":
      x -= size;
      break;
    case "right":
      x += size;
      break;
  }
  return { x, y };
};

const emitEvent = (name: TCustomEvent, detail: IDetail) => {
  const event = new CustomEvent(name, {
    detail,
  });
  document.dispatchEvent(event);
};

const oppositeDirection = (direction: TDirection): TDirection => {
  switch (direction) {
    case "up":
      return "down";
    case "down":
      return "up";
    case "left":
      return "right";
    case "right":
      return "left";
  }
};

const createElement = (
  element: "span" | "div"
): (() => HTMLSpanElement | HTMLDivElement) => {
  return (): HTMLSpanElement | HTMLDivElement => {
    return document.createElement(element);
  };
};

const createSpan = createElement("span");
const createDiv = createElement("div");

export const utilService = {
  withGrid,
  asGridCoord,
  nextPosition,
  emitEvent,
  oppositeDirection,
  createSpan,
  createDiv,
};
