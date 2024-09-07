import { utilService } from "../uti.service";

export class SceneTransition {
  element: Element | null;
  constructor() {
    this.element = null;
  }

  createElement() {
    this.element = utilService.createDiv();
    this.element.classList.add("SceneTransition");
  }

  fadeOut() {
    if (!this.element) {
      alert("SceneTransition element not found");
      return;
    }
    this.element.classList.add("fade-out");
    this.element.addEventListener(
      "animationend",
      () => {
        this.element?.classList.remove();
      },
      { once: true }
    );
  }

  init(container: Element, cb: () => void) {
    this.createElement();
    if (!this.element) {
      alert("SceneTransition element not found");
      return;
    }
    container.appendChild(this.element);
    this.element.addEventListener(
      "animationend",
      () => {
        console.log("SceneTransition animationend");
        cb();
      },
      { once: true }
    );
  }
}
