import { EventDispatcher } from "three";
import EnemySpawner from "./EnemySpawner";
import EnemyTracker from "./EnemyTracker";
import PathManager from "./PathManager";

export default class EnemyManager extends EventDispatcher {
    constructor(scene) {
        super();
        this.scene = scene;

        // Componentes especializados
        this.spawner = new EnemySpawner(scene);
        this.tracker = new EnemyTracker();
        this.pathManager = new PathManager();

        // Configurar eventos entre componentes
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Eventos del spawner
        this.spawner.addEventListener('enemySpawned', (event) => {
            const { enemy, id } = event;
            this.tracker.addEnemy(id, enemy);
        });

        // Eventos del tracker
        this.tracker.addEventListener('enemyReachedGoal', (event) => {
            this.tracker.removeEnemy(event.enemyId);
        });
    }

    createEnemy(EnemyClass, config = {}) {
        const path = this.pathManager.getCurrentPath();
        return this.spawner.spawnEnemy(EnemyClass, config, path);
    }

    updateEnemies(delta) {
        this.tracker.updateEnemies(delta);
        this.spawner.update(delta, this.tracker.getActiveEnemyCount());
    }

    // Configuración de caminos
    setPath(waypoints = [], goal) {
        this.pathManager.setPath(waypoints, goal);
    }

    //
    /**
     * Configura las waves de enemigos
     * @param {Array} waves [{
     *      name: string,
     *      spawnInterval: number,
     *      maxEnemies: number,
     *      enemiesTypes: Array
     * }]
     */
    configureWaves(waves = []) {
        this.spawner.configureWaves(waves, this.pathManager.getCurrentPath())
    }

    setNextWave() {
        this.spawner.setNextWave()
    }

    // Métodos de consulta
    getEnemyById(enemyId) {
        return this.tracker.getEnemyById(enemyId);
    }

    getAllEnemies() {
        return this.tracker.getAllEnemies();
    }

    getActiveEnemies() {
        return this.tracker.getActiveEnemies();
    }

    getActiveEnemyCount() {
        return this.tracker.getActiveEnemyCount();
    }

    clearAllEnemies() {
        this.tracker.clearAllEnemies();
    }

    dispose() {
        this.spawner.dispose();
        this.tracker.dispose();
        this.pathManager.dispose();
    }
}