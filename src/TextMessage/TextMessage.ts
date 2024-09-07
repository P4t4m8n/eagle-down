import KeyPressListener from "../KeyPressListener/KeyPressListener";
import { utilService } from "../uti.service";
import { RevelingText } from "./RevelingText/RevelingText";
import { ITextMessageConfig } from "./TextMessage.model";

export default class TextMessage {
  text: string;
  onComplete: any;
  element: null | Element;
  actionListener: KeyPressListener | null = null;
  revealingText: RevelingText | null;
  constructor(config: ITextMessageConfig) {
    this.text = config.text;
    this.onComplete = config.onComplete;

    this.element = null;
    this.revealingText = null;
  }

  createElement() {
    //Create the element
    this.element = utilService.createDiv();
    this.element.classList.add("TextMessage");

    this.element.innerHTML = `
        <p class="TextMessage_p"></p>
        <button class="TextMessage_button">Next</button>
        `;
    const elTextMsg = this.element.querySelector(".TextMessage_p");
    if (!elTextMsg) {
      alert("TextMessage_p not found");
      return;
    }
    this.revealingText = new RevelingText({
      text: this.text,
      element: elTextMsg,
    });
    this.element.querySelector("button")?.addEventListener("click", () => {
      //Close the text msg
      this.done();
    });

    this.actionListener = new KeyPressListener("Enter", () => {
      this.done();
    });
  }

  done() {
    if (this.revealingText?.isDone) {
      this.actionListener?.unbind();
      this.element?.remove();
      this.onComplete();
      return;
    }
    this.revealingText?.jumpToDone();
    return;
  }

  init(container: Element) {
    this.createElement();

    if (!this.element) return;
    container.appendChild(this.element);
    this.revealingText?.init();
  }
}
