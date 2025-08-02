// src/three/entities/tower/core/Tower.js
import { BoxGeometry, Mesh, MeshBasicMaterial, Object3D } from 'three';
import TowerCollision from './TowerCollision.js';

export default class Tower extends Object3D {
    /**
     * Crea una nueva torre.
     * @param {Object} config - Configuración inicial de la torre.
     * @param {number} [config.life=100] - Vida de la torre.
     * @param {number} [config.maxLife=100] - Vida máxima de la torre.
     * @param {number} [config.damage=10] - Daño que causa la torre.
     * @param {number} [config.range=5] - Rango de ataque de la torre.
     * @param {number} [config.fireRate=1] - Disparos por segundo.
     * @param {number} [config.cost=100] - Costo de construcción de la torre.
     * @param {Object} [config.debug=false] - Debug de la torre.
     * @param {Object} [config.debugCollision=false] - Debug de la colisión.
     */
    constructor(config = {}) {
        super();
        
        // Propiedades de la torre
        this.life = config.life || 100;
        this.maxLife = config.maxLife || 100;
        this.damage = config.damage || 10;
        this.range = config.range || 5;
        this.fireRate = config.fireRate || 1;
        this.cost = config.cost || 100;
        
        // Estado interno
        this.targets = [];
        this.currentTarget = null;
        this.lastFireTime = 0;
        this.isActive = true;
        
        // Sistema de colisión
        this.collision = new TowerCollision(this, this.range, config.debugCollision);
        
        // Modelo 3D (será asignado por las clases hijas)
        this.model = null;

        //mesh Area
        const geometry = new BoxGeometry(1, 3, 1); // Ancho, Alto, Profundidad
        const material = new MeshBasicMaterial({ 
            color: 0x00ff00,
            transparent: true, 
            opacity: 0.2,
            wireframe: true
        });
        const cube = new Mesh(geometry, material);
        if(!this.debug) this.add(cube);
        
        this.init();
    }
    
    init() {
        // Configuración inicial
        this.setupCollisionArea();
    }
    
    setupCollisionArea() {
        // El área de colisión se maneja en TowerCollision
        this.add(this.collision.getVisualRange());
    }
    
    // Método principal de actualización
    update(delta, enemies = []) {
        if (!this.isActive) return;
        
        this.findTargets(enemies);
        this.selectTarget();
        this.attack(delta);
        this.updateModel(delta);
    }
    
    findTargets(enemies) {
        this.targets = this.collision.getEnemiesInRange(enemies);
    }
    
    selectTarget() {
        if (this.targets.length === 0) {
            this.currentTarget = null;
            return;
        }
        
        // Estrategia: atacar al enemigo más cercano al objetivo
        this.currentTarget = this.targets.reduce((closest, enemy) => {
            return enemy.distanceToGoal < closest.distanceToGoal ? enemy : closest;
        });
    }
    
    attack(delta) {
        if (!this.currentTarget) return;
        
        const currentTime = Date.now();
        const timeSinceLastFire = currentTime - this.lastFireTime;
        const fireInterval = 1000 / this.fireRate;
        
        if (timeSinceLastFire >= fireInterval) {
            this.fire();
            this.lastFireTime = currentTime;
        }
    }
    
    fire() {
        if (!this.currentTarget) return;
        
        // Aplicar daño al objetivo
        this.currentTarget.takeDamage(this.damage);
        
        // Rotar hacia el objetivo
        this.lookAt(this.currentTarget.position);
        
        // Efectos visuales (implementar en clases hijas)
        this.playFireAnimation();
        this.createProjectile();
    }
    
    // Métodos para override en clases hijas
    playFireAnimation() {
        // Implementar en clases específicas
    }
    
    createProjectile() {
        // Implementar en clases específicas
    }
    
    updateModel(delta) {
        // Actualizar animaciones del modelo 3D
        if (this.model && this.model.update) {
            this.model.update(delta);
        }
    }
    
    // Métodos de gestión
    upgrade() {
        this.level++;
        this.damage *= 1.2;
        this.range *= 1.1;
        this.fireRate *= 1.1;
    }
    
    setModel(modelInstance) {
        if (this.model) {
            this.remove(this.model);
        }
        this.model = modelInstance;
        this.add(this.model);
    }
    
    dispose() {
        if (this.model && this.model.dispose) {
            this.model.dispose();
        }
        this.collision.dispose();
    }
}