// src/three/entities/tower/core/EnemyManager.js
import { EventDispatcher } from 'three';

export default class EnemyManager extends EventDispatcher {
    constructor(scene) {
        super();
        this.scene = scene;
        this.enemies = new Map();
        this.enemyCount = 0;
    }

    createEnemy(EnemyClass, position, config = {}) {
        const enemy = new EnemyClass(config);
        enemy.position.copy(position);

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