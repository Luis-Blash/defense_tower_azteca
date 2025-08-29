// Golem.js
import BaseEntity from "@three/base/BaseEntity";
import HealthComponent from "@three/components/HealthComponent";
import MovementComponent from "@three/components/MovementComponent";
import WaypointSystem from "@three/systems/WaypointSystem";


export default class Golem extends BaseEntity {
    constructor(config = {}) {
        const {
            name = "Golem",
            life = 100,
            maxLife = 100,
        } = config

        super({ name });
        this
            .addComponent("health", new HealthComponent({ life, maxLife }))
            .addComponent("movement", new MovementComponent({ speed: 10 }))
            .addSystem("waypoint", new WaypointSystem())
    }

    die() {
        console.log(`${this.name} destruido`);
        this.deactivate();
    }

    update(delta) {
        this.getSystem("waypoint").move(delta)
    }
}