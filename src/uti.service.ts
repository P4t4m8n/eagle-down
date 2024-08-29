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

export const utilService = {
  withGrid,
  asGridCoord,
  nextPosition,
};
