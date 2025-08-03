import { Vector3 } from "three";
import Tower from "@three/entities/tower/core/Tower";
import Enemy from "@three/entities/enemy/core/Enemy";
import Pyramid from "@three/entities/pyramid/core/Pyramid";
import Waypoint from "@three/entities/system/Waypoint/Waypoint";
import TowerManager from "@three/entities/tower/manager/TowerManager";
import EnemyManager from "@three/entities/enemy/managers/EnemyManager";

// util
import { meshListGui } from "@three/utils/helperDatGui";

export default class ActityOne {
    constructor(camera, scene) {
        this.camera = camera
        this.scene = scene

        this.init()
    }

    init() {
        this.pyramid = new Pyramid({
            position: new Vector3(-18.1215, 0, 0),
        });
        this.scene.add(this.pyramid);

        this.towerManager = new TowerManager(this.scene, this.scene.loadingManager);
        this.towerManager.addEventListener('towerCreated', this.onTowerCreated.bind(this));

        this.enemyManager = new EnemyManager(this.scene, this.scene.loadingManager);
        this.enemyManager.addEventListener('enemyCreated', this.onEnemyCreated.bind(this));
        this.enemyManager.addEventListener('enemiesRemoved', this.onEnemiesRemoved.bind(this));

        this.setupWaypoints()

        // test
        this.enemyManager.createEnemy(
            Enemy,
            {
                debug: true,
                speed: 5,
                life: 40,
            }
        );

        this.towerManager.createTower(
            Tower,
            new Vector3(6.466, 0, 0),
            {
                damage: 10,
                range: 10,
                fireRate: 1,
                cost: 100,
                level: 1,
                debug: true,
            }
        );

        // const objectToGui = this.towerManager.getTowerById("tower_0")
        // this.scene.transformControlsHelper.addMesh(objectToGui, this.scene);
        // meshListGui(objectToGui)
    }

    setupWaypoints() {
        const waypoints = []
        const waypointsConfig = [
            { position: new Vector3(-10, 0, 0), config: { debug: true } },
            { position: new Vector3(-5, 0, 5), config: { debug: true } },
            { position: new Vector3(0, 0, 5), config: { debug: true } },
            { position: new Vector3(5, 0, 2), config: { debug: true } },
            { position: new Vector3(8, 0, -3), config: { debug: true } },
        ];

        waypointsConfig.forEach((wp, index) => {
            const waypoint = new Waypoint(wp.position, { ...wp.config, id: index });
            waypoints.push(waypoint)
            this.scene.add(waypoint);
        });

        this.enemyManager.setPath(waypoints, this.pyramid)
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