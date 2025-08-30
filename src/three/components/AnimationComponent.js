import { AnimationMixer } from "three";
import BaseComponent from "@three/base/BaseComponent";

export default class AnimationComponent extends BaseComponent {
    constructor() {
      super();
      this.mixer = null;
      this.actions = {};
    }
  
    initMixer(model, animations) {
      this.mixer = new AnimationMixer(model);
      animations?.forEach(clip => {
        this.actions[clip.name] = this.mixer.clipAction(clip);
      });
    }
  
    play(name) { this.actions[name]?.play(); }
    stop(name) { this.actions[name]?.stop(); }
  }