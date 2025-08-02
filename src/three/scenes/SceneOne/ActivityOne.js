import { Vector3 } from "three";
import Tower from "@three/entities/tower/core/Tower";
import Enemy from "@three/entities/enemy/core/Enemy";
import TowerManager from "@three/entities/tower/manager/TowerManager";
import EnemyManager from "@three/entities/enemy/managers/EnemyManager";

export default class ActityOne {
    constructor(camera, scene) {
        this.camera = camera
        this.scene = scene

        this.init()
    }

    init() {
        this.towerManager = new TowerManager(this.scene, this.scene.loadingManager);
        this.towerManager.addEventListener('towerCreated', this.onTowerCreated.bind(this));

        this.enemyManager = new EnemyManager(this.scene, this.scene.loadingManager);
        this.enemyManager.addEventListener('enemyCreated', this.onEnemyCreated.bind(this));
        this.enemyManager.addEventListener('enemiesRemoved', this.onEnemiesRemoved.bind(this));

        this.createTower()
        this.createEnemy()
    }

    createEnemy() {
        this.enemyManager.createEnemy(
            Enemy,
            new Vector3(0, 0, 6),
            {
                debug: true,
                speed: -1,
                life: 40,
            }
        );
        this.enemyManager.createEnemy(
            Enemy,
            new Vector3(0, 0, 0),
            {
                debug: true,
                speed: -2,
                life: 40,
            }
        );

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

    onEnemyCreated(event) {
        console.log('Enemigo creado:', event.id);
        console.log('Total enemigos activos:', this.enemyManager.getActiveEnemyCount());
    }

    onEnemiesRemoved(event) {
        console.log(`${event.count} enemigos eliminados:`, event.removedIds);
        console.log('Enemigos restantes:', this.enemyManager.getActiveEnemyCount());
    }
    
    reActiveScene() {
    }

    dispose() {
    }

    renderAnimations(delta) {
        this.towerManager.updateTowers(delta, this.enemyManager.getAllEnemies());
        this.enemyManager.updateEnemies(delta);
    }
}