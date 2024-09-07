import { ICustomEvent, IDetail } from "../app.model";
import OverworldMap from "../OverworldMap/OverworldMap";
import Person from "../Person/Person";
import { SceneTransition } from "../SceneTransition/SceneTransition";
import TextMessage from "../TextMessage/TextMessage";
import { utilService } from "../uti.service";
import { IEventConfig, IOverworldEventConfig } from "./OverworldEvent.model";

export default class OverworldEvent {
  map: OverworldMap;
  event: IEventConfig;

  constructor({ map, event }: IOverworldEventConfig) {
    this.map = map;
    this.event = event;
  }

  stand(resolve: Function) {
    const who = this.map.gameObjects[this.event.who!];

    if (who instanceof Person)
      who.startBehavior(
        {
          map: this.map,
        },
        {
          type: "stand",
          direction: this.event.direction!,
          time: this.event.time,
        }
      );

    //Set up event listener for when the person is done walking,then resolve the event
    const completeHandler = (e: ICustomEvent<IDetail>) => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener(
          "PersonStandComplete",
          completeHandler as EventListener
        );
        resolve();
      }
    };
    document.addEventListener(
      "PersonStandComplete",
      completeHandler as EventListener
    );
  }

  walk(resolve: Function) {
    const who = this.map.gameObjects[this.event.who!];
    if (who instanceof Person)
      who.startBehavior(
        {
          map: this.map,
        },
        {
          type: "walk",
          direction: this.event.direction!,
          retry: true,
        }
      );

    //Set up event listener for when the person is done walking,then resolve the event
    const completeHandler = (e: ICustomEvent<IDetail>) => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener(
          "PersonWalkingComplete",
          completeHandler as EventListener
        );
        resolve();
      }
    };
    document.addEventListener(
      "PersonWalkingComplete",
      completeHandler as EventListener
    );
  }

  idle(resolve: Function) {
    console.log("resolve:", resolve);
  }

  textMessage(resolve: Function) {
    if (this.event.faceHero) {
      const obj = this.map.gameObjects[this.event.faceHero];
      obj.direction = utilService.oppositeDirection(
        this.map.gameObjects.hero.direction
      );
    }
    const message = new TextMessage({
      text: this.event.text || "",
      onComplete: () => resolve(),
    });

    const elGameContainer = document.querySelector(".game-container");
    message.init(elGameContainer!);
  }

  changeMap(resolve: Function) {
    const sceneTransition = new SceneTransition();
    const elGameContainer = document.querySelector(".game-container");
    sceneTransition.init(elGameContainer!, () => {
      this.map?.overworld?.startMap(window?.OverworldMaps[this.event.map!]);
      resolve();
      sceneTransition.fadeOut();
    });
  }

  init() {
    return new Promise((resolve) => {
      const eventType = this.event?.type;
      // Ensure the method exists before calling it
      if (typeof this[eventType] === "function") {
        this[eventType](resolve);
      }
    });
  }
}
