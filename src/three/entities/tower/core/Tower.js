// src/three/entities/tower/core/Tower.js
import { BoxGeometry, Mesh, MeshBasicMaterial, Object3D } from 'three';
import TowerCollision from './TowerCollision.js';
import TowerAttack from './TowerAttack.js';

export default class Tower extends Object3D {
    /**
     * Crea una nueva torre.
     * @param {Object} config - Configuración inicial de la torre.
     * @param {string} [config.name='Tower'] - Nombre de la torre.
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


        const {
            name = 'Tower',
            life = 100,
            maxLife = 100,
            damage = 10,
            range = 5,
            fireRate = 1,
            cost = 100,
            debug = false,
            isActive = true
        } = config
        this.name = name
        this.life = life;
        this.maxLife = maxLife;
        this.cost = cost;
        this.isActive = isActive;

        // Sistema de colisión
        this.collision = new TowerCollision(this, range, debug);
        // Sistema de ataque
        this.attack = new TowerAttack(this, {
            fireRate,
            damage
        });
        // Debug
        this.configDebugTower(debug);

    }

    configDebugTower(debug) {
        const geometry = new BoxGeometry(1, 3, 1); // Ancho, Alto, Profundidad
        const material = new MeshBasicMaterial({
            color: 0x00ff00,
            transparent: true,
            opacity: debug ? 1 : 0,
            wireframe: true
        });
        const cube = new Mesh(geometry, material);
        cube.name = `${this.name}`;
        this.add(cube);
        this.add(this.collision.getVisualRange());
    }

    update(delta, enemies = []) {
        if (!this.isActive) return;
        const targets = this.collision.getEnemiesInRange(enemies);
        this.attack.update(delta, targets)
    }

}