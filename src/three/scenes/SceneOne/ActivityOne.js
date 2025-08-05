import { Vector3 } from "three";
import Tower from "@three/entities/tower/core/Tower";
import Enemy from "@three/entities/enemy/core/Enemy";
import Pyramid from "@three/entities/pyramid/core/Pyramid";
import Waypoint from "@three/entities/system/Waypoint/Waypoint";
import TowerManager from "@three/entities/tower/manager/TowerManager";
import EnemyManager from "@three/entities/enemy/managers/EnemyManager";

// util
// import { meshListGui } from "@three/utils/helperDatGui";


export default class ActityOne {
    constructor(camera, scene) {
        this.camera = camera
        this.scene = scene
        this.mouseEvents = scene.mouseEvents
        this.init()
    }

    init() {
        this.pyramid = new Pyramid({
            position: new Vector3(-18.1215, 0, 0),
        });
        this.scene.add(this.pyramid);

        this.towerManager = new TowerManager(this.scene, this.scene.loadingManager);
        this.enemyManager = new EnemyManager(this.scene, this.scene.loadingManager);

        this.setupWaypoints()
        this.configureWavesNivel()
        this.setNextWave()
        this.configMouseClickManager()

    }

    setupWaypoints() {
        const waypoints = []
        const waypointsConfig = [
            { position: new Vector3(8, 0, -3), config: { debug: true } },
            { position: new Vector3(5, 0, 2), config: { debug: true } },
            { position: new Vector3(0, 0, 5), config: { debug: true } },
            { position: new Vector3(-5, 0, 5), config: { debug: true } },
            { position: new Vector3(-10, 0, 0), config: { debug: true } },
        ];

        waypointsConfig.forEach((wp, index) => {
            const waypoint = new Waypoint(wp.position, { ...wp.config, id: index });
            waypoints.push(waypoint)
            this.scene.add(waypoint);
        });

        this.enemyManager.setPath(waypoints, this.pyramid)
    }

    configureWavesNivel() {
        const waves = [
            {
                name: "wave_1",
                spawnInterval: 3000,
                maxEnemies: 3,
                enemiesTypes: [
                    {
                        EnemyClass: Enemy,
                        config: {
                            debug: true,
                            speed: 5,
                            life: 40,
                        }
                    },
                    {
                        EnemyClass: Enemy,
                        config: {
                            debug: true,
                            speed: 8,
                            life: 60,
                        }
                    }
                ]
            }
        ]
        this.enemyManager.configureWaves(waves)
    }

    setNextWave() {
        this.enemyManager.setNextWave()
    }

    configMouseClickManager() {
		this.mouseEvents.setClickObject("MapScene")
		this.mouseEvents.setCallBackIntersect(({intersects, objectClickByName}) => {
			const intersection = intersects[0];
            const clickedObject = intersection.object;
            console.log(clickedObject)
            if (objectClickByName.includes(clickedObject.name)) {
                // Punto exacto donde se hizo clic en coordenadas del mundo
                const clickPoint = intersection.point;

                // Información adicional del punto de intersección
                console.log('Objeto clickeado:', clickedObject.name);
                console.log('Punto de clic (mundo):', clickPoint);
                console.log('Distancia desde la cámara:', intersection.distance);
                // Si quieres las coordenadas locales del objeto
                const localPoint = clickedObject.worldToLocal(clickPoint.clone());
                console.log('Punto de clic (local):', localPoint);
            }
		})
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