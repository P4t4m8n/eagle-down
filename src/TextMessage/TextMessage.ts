import KeyPressListener from "../KeyPressListener/KeyPressListener";
import { ITextMessageConfig } from "./TextMessage.model";

export default class TextMessage {
  text: string;
  onComplete: any;
  element: null | Element;
  actionListener: KeyPressListener| null=null;
  constructor(config: ITextMessageConfig) {
    this.text = config.text;
    this.onComplete = config.onComplete;

    this.element = null;
  }

  createElement() {
    //Create the element
    this.element = document.createElement("div");
    this.element.classList.add("TextMessage");

    this.element.innerHTML = `
        <p class="TextMessage_p">${this.text}</p>
        <button class="TextMessage_button">Next</button>
        `;

    this.element.querySelector("button")?.addEventListener("click", () => {
      //Close the text msg
      this.done();
    });

    this.actionListener = new KeyPressListener("Enter",()=>{
      this.actionListener?.unbind();
      this.done();
    })

    
  }

  done() {
    this.element?.remove();
    this.onComplete();
  }

  init(container: Element) {
    this.createElement();
    if (!this.element) return;
    container.appendChild(this.element);
  }
}
