// Golem.js
import BaseEntity from "@three/base/BaseEntity";
import HealthComponent from "@three/components/HealthComponent";
import ModelComponent from "@three/components/ModelComponent";
import MovementComponent from "@three/components/MovementComponent";
import AnimationSystem from "@three/systems/AnimationSystem";
import WaypointSystem from "@three/systems/WaypointSystem";


export default class Golem extends BaseEntity {
    /**
     * @param {Object} config
     * @param {string} config.name
     * @param {number} config.life
     * @param {number} config.maxLife
     * @param {Object} config.loadingManager
     * @param {string} config.modelPath
     * @param {number} config.speed
     */
    constructor(config = {}) {
        const {
            name = "Golem",
            life = 100,
            maxLife = 100,
            loadingManager,
            modelPath,
            speed = 10,
        } = config

        super({ name });
        this
            .addComponent("health", new HealthComponent({ life, maxLife }))
            .addComponent("movement", new MovementComponent({ speed }))
            .addComponent("model", new ModelComponent({ loadingManager, path: modelPath }))
            .addSystem("waypoint", new WaypointSystem())
            .addSystem("anim", new AnimationSystem())
    }

    die() {
        console.log(`${this.name} destruido`);
        this.visible = false;
        this.deactivate();
    }

    update(delta) {
        this.getSystem("waypoint").move(delta)
        this.getSystem("anim").update(delta)
    }
}