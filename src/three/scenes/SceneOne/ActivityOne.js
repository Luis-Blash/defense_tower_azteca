import { Vector3 } from "three";
import Tower from "@three/entities/tower/core/Tower";
import Enemy from "@three/entities/enemy/core/Enemy";
import TowerManager from "@three/entities/tower/manager/TowerManager";

export default class ActityOne {
    constructor(camera, scene) {
        this.camera = camera
        this.scene = scene

        this.init()
    }

    init() {
        this.enemy = new Enemy({
            debug: true
        })
        this.enemy.position.set(0, 0, 6)
        this.enemy.name = "enemy1"
        this.scene.add(this.enemy)

        this.enemy2 = new Enemy({
            debug: true
        })
        this.enemy2.name = "enemy2"
        this.scene.add(this.enemy2)

        this.enemies = [this.enemy, this.enemy2]

        this.towerManager = new TowerManager(this.scene, this.scene.loadingManager);
        this.towerManager.addEventListener('towerCreated', this.onTowerCreated.bind(this));
        this.createTower()
    }

    createTower() {
        this.towerManager.createTower(
            Tower,
            new Vector3(-13.536, 0, 0),
            {
                damage: 10,
                range: 10,
                fireRate: 1,
                cost: 100,
                level: 1,
                debug: true,
            }
        );
    }

    onTowerCreated(event) {
        console.log('Torre creada:', event.id);
    }

    reActiveScene() {
    }

    dispose() {
    }

    renderAnimations(delta) {
        this.towerManager.updateTowers(delta, this.enemies || []);
        if(this.enemy){
            this.enemy.position.x += delta * -1;
        }
        if(this.enemy2){
            this.enemy2.position.x += delta * -0.5;
        }
    }
}