import { Vector3 } from "three";
import BaseSystem from "@three/base/BaseSystem";

export default class TowerAttackSystem extends BaseSystem {
    constructor() {
        super();
        this.lastAttackTime = 0;
        this.currentTarget = null;
    }

    update(delta) {

        const detectionSys = this.entity.getSystem("detection");
        const attackComp = this.entity.getComponent("attackRange");
        const animationComp = this.entity.getComponent("animation");
        if (!detectionSys || !attackComp) return;

        const targets = detectionSys.getTargets();
        if (targets.length === 0) {
            animationComp.stop("atack");
            this.currentTarget = null;
            return;
        }

        // Seleccionar el más cercano
        const pos = new Vector3().setFromMatrixPosition(this.entity.matrixWorld);
        this.currentTarget = targets.reduce((closest, enemy) => {
            const dist = pos.distanceTo(new Vector3().setFromMatrixPosition(enemy.matrixWorld));
            return (!closest || dist < closest.dist) ? { enemy, dist } : closest;
        }, null)?.enemy;

        if (!this.currentTarget || !this.currentTarget.active) return

        // Rotar hacia el objetivo
        this.entity.lookAt(this.currentTarget.position);

        // Cooldown
        this.lastAttackTime += delta * 1000; // delta en ms
        if (this.lastAttackTime >= attackComp.getCooldown()) {
            this._attack();
            this.lastAttackTime = 0;
        }
    }

    _attack() {
        const animationComp = this.entity.getComponent("animation");
        animationComp.play("atack");

    }
}