import { Vector3 } from "three";
import BaseSystem from "@three/base/BaseSystem";

export default class TowerDetectionSystem extends BaseSystem {
    constructor() {
        super();
        this.waveSpawnerSystem = [];
        this.enemiesInRange = [];
        this.currentTarget = null;

        // Reutilizar vectores para no crear muchos objetos en el loop
        this._pos = new Vector3();
        this._enemyPos = new Vector3();
    }

    setWaveSpawnerSystem(waveSpawnerSystem) {
        this.waveSpawnerSystem = waveSpawnerSystem;
    }

    update(delta) {
        const attackComp = this.entity.getComponent("attackRange");
        if (!attackComp) return;

        const radius = attackComp.getRadius();
        const radiusSq = radius * radius;
        this._pos.setFromMatrixPosition(this.entity.matrixWorld);

        // limpiar array sin reasignar (mejor para referencia)
        this.enemiesInRange.length = 0;

        // buscamos el enemigo más cercano válido dentro del rango
        let closest = null;
        let closestDistSq = Infinity;

        for (const enemy of this.waveSpawnerSystem) {
            // filtrar por flag activo primero
            if (!enemy || !enemy.active) continue;

            this._enemyPos.setFromMatrixPosition(enemy.matrixWorld);
            const distSq = this._pos.distanceToSquared(this._enemyPos);

            if (distSq <= radiusSq) {
                this.enemiesInRange.push(enemy);

                if (distSq < closestDistSq) {
                    closestDistSq = distSq;
                    closest = enemy;
                }
            }
        }

        // Si currentTarget ya no es válido (inactivo o fuera de rango), lo limpiamos
        if (this.currentTarget) {
            const stillValid = this.currentTarget.active &&
                this.enemiesInRange.indexOf(this.currentTarget) !== -1;

            if (!stillValid) this.currentTarget = null;
        }

        // Si no hay target, asignamos el más cercano encontrado (si existe)
        if (!this.currentTarget && closest) {
            this.currentTarget = closest;
        }
    }

    // devuelve copia para evitar manipulación externa directa
    getTargets() {
        return this.enemiesInRange.slice();
    }

    // método explícito para obtener el objetivo actual (puede ser null)
    getCurrentTarget() {
        return this.currentTarget;
    }

    // utilidad opcional para forzar limpiar el target (ej. al morir el enemigo)
    clearCurrentTargetIf(predicate) {
        if (this.currentTarget && predicate(this.currentTarget)) {
            this.currentTarget = null;
        }
    }
}
