import { Vector3 } from "three";
import BaseSystem from "@three/base/BaseSystem";

export default class TowerDetectionSystem extends BaseSystem {
    constructor() {
        super();
        this.waveSpawnerSystem = [];
        this.enemiesInRange = [];
    }

    setWaveSpawnerSystem(waveSpawnerSystem) {
        this.waveSpawnerSystem = waveSpawnerSystem;
    }

    update(delta) {
        const attackComp = this.entity.getComponent("attackRange");
        if (!attackComp) return;

        const radius = attackComp.getRadius();
        const pos = new Vector3().setFromMatrixPosition(this.entity.matrixWorld);

        this.enemiesInRange = [];
        for (const enemy of this.waveSpawnerSystem) {
            const enemyPos = new Vector3().setFromMatrixPosition(enemy.matrixWorld);
            if (pos.distanceTo(enemyPos) <= radius) {
                this.enemiesInRange.push(enemy);
            }
        }
    }

    getTargets() {
        return this.enemiesInRange;
    }
}