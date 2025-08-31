import { AnimationMixer, LoopOnce } from "three";
import BaseComponent from "@three/base/BaseComponent";

export default class AnimationComponent extends BaseComponent {
  constructor(config = {}) {
    super();
    const {
        names = [],
    } = config
    this.mixer = null;
    this.actions = {};
    this.names = names;
  }

  initMixer(model, animations) {
    this.mixer = new AnimationMixer(model);
    animations?.forEach(clip => {
      const action = this.mixer.clipAction(clip);
      this.actions[clip.name] = action;

      // Para animaciones de ataque, configurar para que no se repitan automáticamente
      if (this.names.includes(clip.name)) {
        action.setLoop(LoopOnce);
        action.clampWhenFinished = true;
      }
    });
  }

  play(name) {
    const action = this.actions[name];
    if (action) {
      action.reset();
      action.play();
    }
  }

  stop(name) {
    this.actions[name]?.stop();
  }

  isPlaying(name) {
    const action = this.actions[name];
    return action ? action.isRunning() : false;
  }

  getAnimationProgress(name) {
    const action = this.actions[name];
    if (!action) return 0;
    return action.time / action.getClip().duration;
  }
}