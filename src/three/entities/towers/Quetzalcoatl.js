import BaseEntity from "@three/base/BaseEntity";
import AnimationComponent from "@three/components/AnimationComponent";
import ModelComponent from "@three/components/ModelComponent";
import AnimationSystem from "@three/systems/AnimationSystem";

export default class Quetzalcoatl extends BaseEntity {
    constructor(config = {}) {
        const {
            name = "Quetzalcoatl",
            loadingManager,
            modelPath,
        } = config

        super({ name });

        this
            .addComponent("model", new ModelComponent({ loadingManager, path: modelPath }))
            .addComponent("animation", new AnimationComponent())
            .addSystem("anim", new AnimationSystem())

    }

    update(delta) {
        // this.getSystem("anim").update(delta)        
    }

}