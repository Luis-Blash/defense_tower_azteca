// src/three/entities/tower/core/TowerCollision.js
import { SphereGeometry, MeshBasicMaterial, Mesh, Sphere, Vector3 } from 'three';

export default class TowerCollision {
    constructor(tower, range, debug = false) {
        this.tower = tower;
        this.range = range;
        this.sphere = new Sphere(tower.position, range);
        
        // Representación visual del rango (opcional, para debug)
        this.rangeGeometry = new SphereGeometry(range, 16, 8);
        this.rangeMaterial = new MeshBasicMaterial({ 
            color: 0xff0000, 
            transparent: true, 
            opacity: 0.2,
            wireframe: true
        });
        this.rangeMesh = new Mesh(this.rangeGeometry, this.rangeMaterial);
        this.rangeMesh.name = "TowerCollision";
        this.rangeMesh.visible = debug; // Oculto por defecto
    }
    
    getEnemiesInRange(enemies) {
        const enemiesInRange = [];
        const towerPos = this.tower.position;
        
        enemies.forEach(enemy => {
            const distance = towerPos.distanceTo(enemy.position);
            if (distance <= this.range) {
                enemiesInRange.push(enemy);
            }
        });
        
        return enemiesInRange;
    }
    
    getVisualRange() {
        return this.rangeMesh;
    }
    
    dispose() {
        this.rangeGeometry.dispose();
        this.rangeMaterial.dispose();
    }
}