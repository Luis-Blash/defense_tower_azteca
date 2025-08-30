import BaseSystem from "@three/base/BaseSystem";

export default class AnimationSystem extends BaseSystem {

  start(entity) {
    super.start(entity);
    const modelComp = entity.getComponent("model");
    const animComp = entity.getComponent("animation");
    
    if (modelComp.modelInstance) {
      animComp.initMixer(modelComp.modelInstance, modelComp.gltf?.animations);
    } else {
      modelComp.addOnModelReadyCallback(() => {
        animComp.initMixer(modelComp.modelInstance, modelComp.gltf?.animations)
      });
    }
  }

  update(delta) {
    this.entity.getComponent("animation").mixer?.update(delta);
  }
}