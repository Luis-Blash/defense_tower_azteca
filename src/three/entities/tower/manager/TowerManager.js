// src/three/entities/tower/core/TowerManager.js
import { EventDispatcher } from 'three';

export default class TowerManager extends EventDispatcher {
    constructor(scene) {
        super();
        this.scene = scene;
        this.towers = new Map();
        this.towerCount = 0;
    }
    
    createTower(TowerClass, position, config = {}) {
        const tower = new TowerClass(config);
        tower.position.copy(position);
        
        // Añadir a la escena
        this.scene.add(tower);
        
        // Registrar torre
        const towerId = `tower_${this.towerCount++}`;
        this.towers.set(towerId, tower);
        
        // Emitir evento
        this.dispatchEvent({
            type: 'towerCreated',
            tower: tower,
            id: towerId
        });
        
        return { tower, id: towerId };
    }
    
    removeTower(towerId) {
        const tower = this.towers.get(towerId);
        if (tower) {
            this.scene.remove(tower);
            tower.dispose();
            this.towers.delete(towerId);
            
            this.dispatchEvent({
                type: 'towerRemoved',
                id: towerId
            });
        }
    }
    
    updateTowers(delta, enemies = []) {
        this.towers.forEach(tower => {
            tower.update(delta, enemies);
        });
    }

    getTowerById(towerId) {
        return this.towers.get(towerId);
    }
    
    getAllTowers() {
        return Array.from(this.towers.values());
    }
    
    dispose() {
        this.towers.forEach(tower => tower.dispose());
        this.towers.clear();
    }
}