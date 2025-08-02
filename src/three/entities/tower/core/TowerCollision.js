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
    
    isEnemyInRange(enemy) {
        return this.tower.position.distanceTo(enemy.position) <= this.range;
    }
    
    getVisualRange() {
        return this.rangeMesh;
    }
    
    showRange() {
        this.rangeMesh.visible = true;
    }
    
    hideRange() {
        this.rangeMesh.visible = false;
    }
    
    updateRange(newRange) {
        this.range = newRange;
        this.sphere.radius = newRange;
        
        // Actualizar geometría visual
        this.rangeGeometry.dispose();
        this.rangeGeometry = new SphereGeometry(newRange, 16, 8);
        this.rangeMesh.geometry = this.rangeGeometry;
    }
    
    dispose() {
        this.rangeGeometry.dispose();
        this.rangeMaterial.dispose();
    }
}