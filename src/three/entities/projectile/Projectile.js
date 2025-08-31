import BaseEntity from "@three/base/BaseEntity";
import ProjectileComponent from "@three/components/ProjectileComponent";
import ProjectileMeshComponent from "@three/components/ProjectileMeshComponent";
import ProjectileMovementSystem from "@three/systems/ProjectileMovementSyste";


export default class Projectile extends BaseEntity {
    constructor(config = {}) {
        super({ name: "projectile" });

        const { 
            speed = 2,
        } = config

        this
            .addComponent("projectile", new ProjectileComponent({ speed }))
            .addComponent("projectileMesh", new ProjectileMeshComponent())
            .addSystem("movement", new ProjectileMovementSystem())
    }

    update(delta) {
        this.getSystem("movement").update(delta)
    }
}