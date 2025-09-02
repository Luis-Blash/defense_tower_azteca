import BaseSystem from "@three/base/BaseSystem";


export default class ProjectileMovementSystem extends BaseSystem {
    constructor() {
        super();
        this.direction = null;
        this.maxDistance = 50;
    }

    setDirection(direction) {
        this.direction = direction;
    }

    update(delta) {
        if (!this.direction) return;
        const speed = this.entity.getComponent("projectile").getSpeed();
        this.entity.position.add(this.direction.clone().multiplyScalar(delta * speed));
        this.maxDistance -= delta * speed;
        if (this.maxDistance <= 0) {
            this.entity.destroy();
        }   
    }
}