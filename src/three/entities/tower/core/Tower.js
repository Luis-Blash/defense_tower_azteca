// src/three/entities/tower/core/Tower.js
import { BoxGeometry, Mesh, MeshBasicMaterial, Object3D } from 'three';
import TowerCollision from './TowerCollision.js';

const getClosestTarget = (towerPosition, targets) => {
    return targets.reduce((closest, enemy) => {
        const distanceToEnemy = enemy.position.distanceTo(towerPosition);
        return distanceToEnemy < closest.position.distanceTo(towerPosition)
            ? enemy
            : closest;
    });
}

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
     */
    constructor(config = {}) {
        super();


        // Inicialización de estadísticas
        this.statsInit(config);
        // Modelo 3D (será asignado por las clases hijas)
        this.model = null;
        // Sistema de colisión
        this.collision = new TowerCollision(this, this.stats.range, config.debug);
        // Debug
        this.configDebugTower(config.debug);

    }

    statsInit(config = {}) {
        const {
            life = 100,
            maxLife = 100,
            damage = 10,
            range = 5,
            fireRate = 1,
            cost = 100,
        } = config;

        this.stats = {
            life,
            maxLife,
            damage,
            range,
            fireRate,
            cost,
        };

        // Estado interno
        this.targets = [];
        this.currentTarget = null;
        this.timeSinceLastFire = 0;
        this.isActive = true;
    }

    configDebugTower(debug) {
        const geometry = new BoxGeometry(1, 3, 1); // Ancho, Alto, Profundidad
        const material = new MeshBasicMaterial({
            color: 0x00ff00,
            transparent: true,
            opacity: 0.2,
            wireframe: true
        });
        const cube = new Mesh(geometry, material);
        if (debug) this.add(cube);
        this.add(this.collision.getVisualRange());
    }

    update(delta, enemies = []) {
        if (!this.isActive) return;
        this.findTargets(enemies);
        this.selectTarget();
        this.attack(delta);
    }

    selectTarget() {
        if (this.targets.length === 0) {
            this.currentTarget = null;
            return;
        }
        this.currentTarget = getClosestTarget(this.position, this.targets);
    }

    attack(delta) {
        if (!this.currentTarget) return;

        this.timeSinceLastFire += delta;
        const fireInterval = 1 / this.stats.fireRate;

        if (this.timeSinceLastFire >= fireInterval) {
            this.fire();
            this.timeSinceLastFire = 0;
        }
    }

    fire() {
        if (!this.currentTarget) return;
        // Aplicar daño al objetivo
        this.currentTarget.takeDamage(this.stats.damage);
        // Rotar hacia el objetivo
        this.lookAt(this.currentTarget.position);
    }

    findTargets(enemies = []) {
        this.targets = this.collision.getEnemiesInRange(enemies);
    }

}