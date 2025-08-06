// src/three/entities/tower/core/TowerCollision.js
import { SphereGeometry, MeshBasicMaterial, Mesh, Sphere, Vector3 } from 'three';

export default class TowerCollision {
    constructor(tower, range, debug = false) {
        this.tower = tower;
        this.range = range;
        
       this.createVisualRange(debug)
    }

    createVisualRange(debug) {
        this.sphere = new Sphere(this.tower.position, this.range);
        this.rangeGeometry = new SphereGeometry(this.range, 16, 8);
        this.rangeMaterial = new MeshBasicMaterial({ 
            color: 0xff0000, 
            transparent: true, 
            opacity: debug ? 1 : 0,
            wireframe: true
        });
        this.rangeMesh = new Mesh(this.rangeGeometry, this.rangeMaterial);
        this.rangeMesh.name = "TowerCollision";
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