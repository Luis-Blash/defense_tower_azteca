import BaseSystem from "@three/base/BaseSystem";
import { Box3, Raycaster, Vector3 } from "three";


export default class ProjectileCollisionSystem extends BaseSystem {
    constructor() {
        super();
        this.objects = [];

    }

    setObjects(objects) {
        this.objects = objects
    }

    update(delta) {
        if (this.objects.length === 0) return;
        const projectileRadius = this.entity.getComponent("projectile").getRadius();
        const projectilePosition = this.entity.position;

        for (const object of this.objects) {
            const collision = this.checkCollisionRaycast(projectilePosition, projectileRadius, object);
            if (collision) {
                this.entity.destroy()
                collision
                    ?.getComponent("health")
                    ?.takeDamage(this.entity.getComponent("projectile").getDamage())
            }
        }
    }

    checkCollisionRaycast(projectilePos, projectileRadius, object3D) {
        const raycaster = new Raycaster();
        const directions = [
            new Vector3(1, 0, 0), 
            new Vector3(-1, 0, 0),
            new Vector3(0, 1, 0), 
            new Vector3(0, -1, 0),
            new Vector3(0, 0, 1), 
            new Vector3(0, 0, -1),
        ];

        for (const direction of directions) {
            raycaster.set(projectilePos, direction);
            const intersects = raycaster.intersectObject(object3D, true);
            
            if (intersects.length > 0 && intersects[0].distance <= projectileRadius) {
                return object3D;
            }
        }

        return null;
    }
}
