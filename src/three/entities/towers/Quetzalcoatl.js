import BaseEntity from "@three/base/BaseEntity";
import AnimationComponent from "@three/components/AnimationComponent";
import AttackRangeComponent from "@three/components/AttackRangeComponent";
import ModelComponent from "@three/components/ModelComponent";
import AnimationSystem from "@three/systems/AnimationSystem";
import TowerAttackSystem from "@three/systems/TowerAttackSystem";
import TowerDetectionSystem from "@three/systems/TowerDetectionSystem";

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
            .addComponent("attackRange", new AttackRangeComponent({ radius: 8, debug: true }))
            .addSystem("anim", new AnimationSystem())
            .addSystem("detection", new TowerDetectionSystem())
            .addSystem("attack", new TowerAttackSystem());

    }

    update(delta) {
        this.getSystem("anim").update(delta)
        this.getSystem("detection").update(delta)
        this.getSystem("attack").update(delta)
    }

}