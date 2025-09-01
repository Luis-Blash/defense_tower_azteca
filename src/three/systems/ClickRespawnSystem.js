import BaseSystem from "@three/base/BaseSystem";

export default class ClickRespawnSystem extends BaseSystem {
    constructor() {
        super();
        this.spawnedTowers = new Map();
        this.count = 0;
        this._onClick = null;
    }

    start(scene) {
        this.scene = scene;
        this.scene.getSystem("mouseEvents").setClickObject("Escenario1")
        this.quetzalcoatl = this.scene.getEntity("prototypeQuetzalcoatl")
    }



    mouseClick(createClickTower, projectileRespawnSystem) {
        this._onClick = ({ intersects, objectClickByName }) => {
            const intersection = intersects[0];
            if (!intersection) return;
            const clickedObject = intersection.object;
            if (!objectClickByName.includes(clickedObject.name)) return;

            const clickPoint = intersection.point;
            const tower = createClickTower(this.quetzalcoatl, clickPoint, projectileRespawnSystem);
            this.spawnedTowers.set(`tower_${this.count}`, tower);
            this.scene.add(tower);
            this.count++;
        };
        this.scene.getSystem("mouseEvents").setCallBackIntersect(this._onClick);
    }

    setWaveSpawnerSystem(waveSpawnerSystem = []) {
        for (const tower of this.spawnedTowers.values()) {
            tower.getSystem("detection").setWaveSpawnerSystem(waveSpawnerSystem);
        }
    }

    update(delta) {
        for (const tower of this.spawnedTowers.values()) {
            tower.update(delta);
        }
    }

    getTowers() {
        return this.spawnedTowers;
    }
}