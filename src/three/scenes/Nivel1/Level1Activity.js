import BaseActivityScene from "@three/base/BaseActivityScene"
import { configLevel1, createClickTower } from "./resource";
// import { meshListGui } from "@three/utils/helperDatGui";

export default class Level1Activity extends BaseActivityScene {
    constructor(scene, config = {}) {
        super(scene, config)
        this.isActive = false
    }

    start() {
        this.isActive = true

        const {
            pathWaypoints,
            waves
        } = configLevel1()

        // this.scene.transformControlsHelper.addMesh(waypoint, this.scene)
        // meshListGui(waypoint)
        pathWaypoints.forEach((waypoint, index) => {
            this.scene.add(waypoint)
        })

        this.scene.getSystem("waveSpawner").setPathWaypoints(pathWaypoints)
        this.scene.getSystem("waveSpawner").setWaves(waves)

        this.scene.getSystem("clickRespawn").mouseClick(
            createClickTower, 
            this.scene.getSystem("projectileRespawn"))
    }

    update(delta) {
        if (!this.isActive) return
        this.scene.getSystem("waveSpawner").update(delta)
        const enemies = this.scene.getSystem("waveSpawner").getActiveEntities();
        this.scene.getSystem("clickRespawn").setWaveSpawnerSystem(enemies)
        this.scene.getSystem("clickRespawn").update(delta)

        this.scene.getSystem("projectileRespawn").setEnemies(enemies)
        this.scene.getSystem("projectileRespawn").update(delta)
    }

    dispose() {
        console.log('dispose level 1');
        this.isActive = false
    }
}