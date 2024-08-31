import { TDirection } from "../DirectionInput/DirectionInput.model";
import OverworldEvent from "../OverworldEvent/OverworldEvent";
import { IEventConfig } from "../OverworldEvent/OverworldEvent.model";
import OverworldMap from "../OverworldMap/OverworldMap";
import Sprite from "../Sprite/Sprite";
import { IBehaviorLoop, IGameObjectConfig } from "./GameObject.model";

export default class GameObject {
  y: number;
  x: number;
  sprite: Sprite;
  direction: TDirection;
  isMounted: boolean;
  id: null | string;
  behaviorLoop: IBehaviorLoop[];
  behaviorLoopIndex: number;
  isStanding: boolean;
  talking?: { events: IBehaviorLoop[] }[];
  constructor(config: IGameObjectConfig) {
    this.id = null;
    this.isMounted = false;
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.isStanding = false;

    this.direction = config.direction || "down";
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "/images/characters/people/hero.png",
      useShadow: true,
      animationFrameLimit: 8,
    });

    this.talking = config.talking || []; ;

    this.behaviorLoop = config.behaviorLoop || [];
    this.behaviorLoopIndex = 0;
  }

  mount(map: OverworldMap) {
    this.isMounted = true;
    map.addWall(this.x, this.y);

    //If behaver kick of after a short delay
    setTimeout(() => {
      this.doBehaviorEvent(map);
    }, 10);
  }

  async doBehaviorEvent(map: OverworldMap) {
    if (
      map.isCutscenePlaying ||
      this.behaviorLoop.length === 0 ||
      this.isStanding
    )
      return;

    //Setting up our event
    let eventConfig: IEventConfig = this.behaviorLoop[this.behaviorLoopIndex];
    eventConfig.who = this.id || "";

    //Create an event instance out of our next event config
    const eventHandler = new OverworldEvent({ map, event: eventConfig });
    await eventHandler.init();

    //Setting the next event to fire
    this.behaviorLoopIndex++;
    if (this.behaviorLoopIndex >= this.behaviorLoop.length) {
      this.behaviorLoopIndex = 0;
    }

    //Do it again
    this.doBehaviorEvent(map);
  }

  update() {}
}
