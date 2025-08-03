// src/three/entities/tower/core/EnemyManager.js
import { EventDispatcher, Vector3 } from 'three';

export default class EnemyManager extends EventDispatcher {
    constructor(scene) {
        super();
        this.scene = scene;
        this.enemies = new Map();
        this.enemyCount = 0;

        this.spawnPoint = new Vector3(0, 0, 0);
        this.waypoints = [];
        this.goal = null;
    }

    createEnemy(EnemyClass, config = {}) {
        const enemy = new EnemyClass(config);
        
        enemy.position.copy(this.spawnPoint);
        enemy.setPath(this.waypoints, this.goal);

        // Añadir a la escena
        this.scene.add(enemy);

        // Registrar torre
        const enemyId = `enemy_${this.enemyCount++}`;
        this.enemies.set(enemyId, enemy);

        // Emitir evento
        this.dispatchEvent({
            type: 'enemyCreated',
            enemy: enemy,
            id: enemyId
        });

        return { enemy, id: enemyId };
    }

    removeEnemy(enemyId) {
        const enemy = this.enemies.get(enemyId);
        if (enemy) {
            this.scene.remove(enemy);
            // Limpiar recursos
            if (enemy.dispose) {
                enemy.dispose();
            }
            // Remover del mapa
            this.enemies.delete(enemyId);

            console.log(`Enemy ${enemyId} removed successfully`);
            return true;
        }
        return false;
    }

    updateEnemies(delta) {
        const enemiesToRemove = [];

        // Actualizar todos los enemigos
        this.enemies.forEach((enemy, enemyId) => {
            enemy.update(delta);

            // Verificar si debe ser eliminado
            if (enemy.shouldRemove || enemy.life <= 0) {
                enemiesToRemove.push(enemyId);
            }
        });

        // Eliminar enemigos marcados para eliminación
        enemiesToRemove.forEach(enemyId => {
            this.removeEnemy(enemyId);
        });

        // Emitir evento si se eliminaron enemigos
        if (enemiesToRemove.length > 0) {
            this.dispatchEvent({
                type: 'enemiesRemoved',
                count: enemiesToRemove.length,
                removedIds: enemiesToRemove
            });
        }
    }

    /**
     * Establece el camino para los enemigos.
     * @param {Array} waypoints - Lista de waypoints.
     * @param {Object3D} goal - Meta final.
     */
    setPath(waypoints = [], goal) {
        this.waypoints = waypoints.map(wp => wp.position.clone());
        this.goal = goal;

        if (waypoints.length > 0) {
            this.spawnPoint.copy(waypoints[0].position);
        }
    }

    /**
     * Obtiene un enemigo por su ID.
     * @param {string} enemyId - ID del enemigo.
     * @returns {Enemy | undefined} - Enemigo encontrado o undefined si no se encuentra.
     */
    getEnemyById(enemyId) {
        return this.enemies.get(enemyId);
    }

    getAllEnemies() {
        return Array.from(this.enemies.values());
    }

    getActiveEnemies() {
        return Array.from(this.enemies.values()).filter(enemy => enemy.active);
    }

    getActiveEnemyCount() {
        return this.getActiveEnemies().length;
    }

    clearAllEnemies() {
        const enemyIds = Array.from(this.enemies.keys());
        enemyIds.forEach(enemyId => {
            this.removeEnemy(enemyId);
        });
    }

    dispose() {
        this.clearAllEnemies();
        this.enemies.clear();
    }
}