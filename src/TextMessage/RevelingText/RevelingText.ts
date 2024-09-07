import { utilService } from "../../uti.service";
import { IRevelingTextConfig } from "./RevelingText.model";

export class RevelingText {
  element: Element;
  text: string;
  speed: number;
  timeout: null | number;
  #isDone: boolean;
  constructor(config: IRevelingTextConfig) {
    this.element = config.element;
    this.text = config.text;
    this.speed = config.speed || 60;

    this.timeout = null;
    this.#isDone = false;
  }

  revealOneCharacter(chars: { span: HTMLSpanElement; delayAfter: number }[]) {
    const next = chars.splice(0, 1)[0];
    next.span.classList.add("reveled");
    if (chars.length > 0) {
      this.timeout = setTimeout(() => {
        this.revealOneCharacter(chars);
      }, next.delayAfter);
    } else {
      this.#isDone = true;
    }
  }

  jumpToDone() {
    clearTimeout(this.timeout!);
    this.#isDone = true;
    this.element.querySelectorAll("span").forEach((span) => {
      span.classList.add("reveled");
    });
  }
  init() {
    let chars: { span: HTMLSpanElement; delayAfter: number }[] = [];
    this.text.split("").forEach((char) => {
      // Create a span add in dom
      let span = utilService.createSpan() as HTMLSpanElement;
      span.textContent = char;
      this.element.appendChild(span);

      //Add the span to state array
      chars.push({ span, delayAfter: char === " " ? 0 : this.speed });
    });

    this.revealOneCharacter(chars);
  }

  get isDone() {
    return this.#isDone;
  }
}
