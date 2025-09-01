import { Vector3 } from "three";
import BaseSystem from "@three/base/BaseSystem";

export default class TowerAttackSystem extends BaseSystem {
    constructor() {
        super();
        this.currentTarget = null;
        this.isAttacking = false;
    }

    setActionProjectiles(actionProjectiles) {
        this.actionProjectiles = actionProjectiles
    }

    update(delta) {
        const detectionSys = this.entity.getSystem("detection");
        const attackComp = this.entity.getComponent("attackRange");
        const animationComp = this.entity.getComponent("animation");
        if (!detectionSys || !attackComp || !animationComp) return;

        const targets = detectionSys.getTargets();

        // Si no hay objetivos, detener ataque
        if (targets.length === 0) {
            this._stopAttack(animationComp);
            return;
        }

        // Seleccionar el más cercano
        const pos = new Vector3().setFromMatrixPosition(this.entity.matrixWorld);
        this.currentTarget = targets.reduce((closest, enemy) => {
            const dist = pos.distanceTo(new Vector3().setFromMatrixPosition(enemy.matrixWorld));
            return (!closest || dist < closest.dist) ? { enemy, dist } : closest;
        }, null)?.enemy;

        if (!this.currentTarget || !this.currentTarget.active) {
            this._stopAttack(animationComp);
            return;
        }

        // Rotar hacia el objetivo
        this.entity.lookAt(this.currentTarget.position);

        // Solo atacar si no estamos ya atacando
        if (!this.isAttacking) {
            this._startAttack(animationComp);
        }

        // Verificar si la animación ha terminado para poder atacar de nuevo
        this._checkAnimationFinished(animationComp);
    }

    _startAttack(animationComp) {
        if (!this.currentTarget) return;
        this.isAttacking = true;
        // Reproducir animación
        animationComp.play("atack");
        // Aplicar daño inmediatamente o con delay según prefieras
        if(this.actionProjectiles) {
            this.actionProjectiles({
                entity: this.entity,
                target: this.currentTarget
            })
        }
    }

    _stopAttack(animationComp) {
        if (this.isAttacking) {
            animationComp.stop("atack");
            this.isAttacking = false;
        }
        this.currentTarget = null;
    }

    _checkAnimationFinished(animationComp) {
        if (!this.isAttacking) return;

        const attackAction = animationComp.actions["atack"];
        if (attackAction) {
            // Si la animación ha terminado o está muy cerca del final
            const normalizedTime = attackAction.time / attackAction.getClip().duration;
            if (normalizedTime >= 0.95 || !attackAction.isRunning()) {
                this.isAttacking = false;
            }
        }
    }
}