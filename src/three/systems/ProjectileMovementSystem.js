import BaseSystem from "@three/base/BaseSystem";


export default class ProjectileMovementSystem extends BaseSystem {
    constructor() {
        super();
        this.direction = null;
    }

    setDirection(direction) {
        this.direction = direction;
    }

    update(delta) {
        if (!this.direction) return;
        const speed = this.entity.getComponent("projectile").speed;
        this.entity.position.add(this.direction.clone().multiplyScalar(delta * speed));
        
    }
}