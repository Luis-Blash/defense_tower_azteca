// src/three/entities/enemy/managers/EnemySpawner.js
import { EventDispatcher } from 'three';

export default class EnemySpawner extends EventDispatcher {
    constructor(scene) {
        super();
        this.scene = scene;
        this.enemyCount = 0;

        this.path = null;

        this.spawnTimer = 0;
        this.waves = [];
        this.waveIndex = -1;
        this.currentWave = null;

        this.enemiesSpawnedInWave = 0;

        this.playing = false
    }

    spawnEnemy(EnemyClass, config = {}, path = null) {
        const enemy = new EnemyClass(config);

        // Configurar posición y camino
        if (path) {
            enemy.position.copy(path.spawnPoint);
            enemy.setPath(path.waypoints, path.goal);
        }

        // Añadir a la escena
        this.scene.add(enemy);

        // Generar ID
        const enemyId = `enemy_${this.enemyCount++}`;

        // Emitir evento
        this.dispatchEvent({
            type: 'enemySpawned',
            enemy: enemy,
            id: enemyId
        });

        return { enemy, id: enemyId };
    }

    configureWaves(waves = [], path = null) {
        if (waves === 0) return
        this.waves = waves;
        this.path = path
        this.playing = true
    }

    setNextWave() {
        if (this.waveIndex === this.waves.length - 1) return
        this.waveIndex++;
        this.currentWave = this.waves[this.waveIndex];
    }

    setEnemySpawned() {
        this.enemiesSpawnedInWave++;
        const randomEnemy = Math.floor(Math.random() * this.currentWave.enemiesTypes.length);
        const enemySelect = this.currentWave.enemiesTypes[randomEnemy];
        this.spawnEnemy(enemySelect.EnemyClass, enemySelect.config, this.path);
    }

    completeWave() {
        console.log('Completado ---- ', this.currentWave.name);
        this.playing = false
        this.spawnTimer = 0;
    }

    update(delta, enemiesCount) {
        if (!this.playing) return

        const isRemainingEnemies = this.enemiesSpawnedInWave === this.currentWave.maxEnemies

        if (isRemainingEnemies && enemiesCount === 0) {
            this.completeWave()
            return
        }

        this.spawnTimer += delta * 1000;
        if (this.spawnTimer >= this.currentWave.spawnInterval) {
            this.spawnTimer = 0;
            if (this.enemiesSpawnedInWave < this.currentWave.maxEnemies) {
                this.setEnemySpawned()
            }
        }
    }

    dispose() {
        this.scene = null;
    }
}