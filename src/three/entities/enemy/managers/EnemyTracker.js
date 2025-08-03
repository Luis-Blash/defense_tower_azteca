
// src/three/entities/enemy/managers/EnemyTracker.js
import { EventDispatcher } from 'three';

export default class EnemyTracker extends EventDispatcher {
    constructor() {
        super();
        this.enemies = new Map();
    }

    addEnemy(enemyId, enemy) {
        this.enemies.set(enemyId, enemy);
    }

    removeEnemy(enemyId) {
        const enemy = this.enemies.get(enemyId);
        if (enemy) {
            // Remover de la escena (el scene se maneja desde el spawner)
            if (enemy.parent) {
                enemy.parent.remove(enemy);
            }

            // Limpiar recursos
            if (enemy.dispose) {
                enemy.dispose();
            }

            // Remover del mapa
            this.enemies.delete(enemyId);

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
            if (!enemy.active || enemy.life <= 0) {
                enemiesToRemove.push(enemyId);
            }

            if (enemy.hasReachedGoal) {
                this.dispatchEvent({
                    type: 'enemyReachedGoal',
                    enemyId: enemyId,
                    enemy: enemy
                });
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