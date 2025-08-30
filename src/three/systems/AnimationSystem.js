import BaseSystem from "@three/base/BaseSystem";
import { AnimationMixer } from "three";

export default class AnimationSystem extends BaseSystem {
  start(entity) {
    super.start(entity);
    this.nameAction = ""
    const modelComp = entity.getComponent("model");
    if (!modelComp?.getModelInstance()) {
      modelComp.addOnModelReadyCallback(() => this.initMixer(entity));
      return;
    }
    this.initMixer(entity);
  }
  
  initMixer(entity) {
    this.mixer = new AnimationMixer(entity.getComponent("model").getModelInstance());
    const gltf = entity.getComponent("model").getGLTF();
    if (gltf?.animations?.length) {
      this.actions = {};
      gltf.animations.forEach(clip => {
        this.actions[clip.name] = this.mixer.clipAction(clip).play();
      });
    }
  }

  getActions() { return this.actions; }
  
  play(name) { 
    this.actions?.[name]?.play(); 
  }
  
  stop(name) { 
    this.actions?.[name]?.stop(); 
  }
  
  update(delta) { 
    this.mixer?.update(delta); 
  }
}