import BaseEntity from "@three/base/BaseEntity";
import ProjectileComponent from "@three/components/ProjectileComponent";
import ProjectileMeshComponent from "@three/components/ProjectileMeshComponent";
import ProjectileCollisionSystem from "@three/systems/ProjectileCollisionSystem";
import ProjectileMovementSystem from "@three/systems/ProjectileMovementSystem";


export default class Projectile extends BaseEntity {
    constructor(config = {}) {
        super({ name: "projectile" });

        const { 
            speed = 2,
            radius = 0.75,
            damage = 10,
        } = config

        this
            .addComponent("projectile", new ProjectileComponent({ speed, radius, damage }))
            .addComponent("projectileMesh", new ProjectileMeshComponent())
            .addSystem("movement", new ProjectileMovementSystem())
            .addSystem("collision", new ProjectileCollisionSystem())
    }

    destroy() {
        this.deactivate()
    }

    update(delta) {
        if (!this.active) return;
        this.getSystem("movement").update(delta)
        this.getSystem("collision").update(delta)
    }
}