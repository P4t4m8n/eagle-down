import { TKeyCode } from "./KeyPressListener.model";

export default class KeyPressListener {
  keydownFunction: (event: KeyboardEvent) => void;
  keyupFunction: (event: KeyboardEvent) => void;

  constructor(keyCode: TKeyCode, callback: Function) {
    let keySafe = true;
    this.keydownFunction = function (event: KeyboardEvent) {
      if (event.code !== keyCode || !keySafe) return;
      keySafe = false;
      callback();
    };

    this.keyupFunction = function (event: KeyboardEvent) {
      if (event.code !== keyCode) return;
      keySafe = true;
    };

    document.addEventListener("keydown", this.keydownFunction);
    document.addEventListener("keyup", this.keyupFunction);
  }

  unbind() {
    document.removeEventListener("keydown", this.keydownFunction);
    document.removeEventListener("keyup", this.keyupFunction);
  }
}
