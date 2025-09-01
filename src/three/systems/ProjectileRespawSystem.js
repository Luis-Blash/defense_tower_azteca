import { Vector3 } from "three";
import BaseSystem from "@three/base/BaseSystem";


export default class ProjectileRespawSystem extends BaseSystem {
    constructor() {
        super();
        this.projectiles = new Map()
        this.projectileCount = 0;
    }

    addProjectile({ ProjectileClass, entity, target }) {
        const projectile = new ProjectileClass({ speed: 10 })
        projectile.getSystem("movement").setDirection(target.position.clone().sub(entity.position).normalize())
        projectile.position.set(entity.position.x, entity.position.y, entity.position.z)
        this.entity.add(projectile)

        this.projectiles.set(`projectile_${this.projectileCount}`, { entity: projectile});
        this.projectileCount++;
    }

    update(delta) {
        for (const projectile of this.projectiles.values()) {
            projectile.entity.update(delta)
        }
    }
}