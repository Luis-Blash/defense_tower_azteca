import { Mesh, MeshBasicMaterial, Object3D, SphereGeometry, Vector3 } from "three";
import HealthComponent from "./HealthComponent";
import EnemyWaypoint from "./EnemyWaypoint";

export default class Enemy extends Object3D {
    /**
     * Crea una nueva Enemigo.
     * @param {Object} config - Configuración inicial de la Enemigo.
     * @param {string} [config.name='Enemy'] - Nombre de la Enemigo.
     * @param {number} [config.life=100] - Vida de la Enemigo.
     * @param {number} [config.maxLife=100] - Vida máxima de la Enemigo.
     * @param {number} [config.speed=1] - Velocidad de la Enemigo.
     * @param {boolean} [config.debug=false] - Debug de la Enemigo.
     */
    constructor(config = {}) {
        super()

        const {
            name = 'Enemy',
            life = 100,
            maxLife = 100,
            speed = 1,
            debug = false,
        } = config

        this.name = name
        this.active = true;
        this.hasReachedGoal = false;
        this.healthComponent = new HealthComponent({ life, maxLife })
        this.enemyWaypoint = new EnemyWaypoint(this, { speed })
        this.debugMesh(debug)
    }

    debugMesh(debug = false) {
        const geometry = new SphereGeometry(1, 10, 6);
        const material = new MeshBasicMaterial({
            color: 0xffff00,
            transparent: true,
            opacity: debug ? 1 : 0,
            wireframe: true
        });
        const sphere = new Mesh(geometry, material);
        sphere.name = `${this.name}`;
        this.add(sphere);
    }

    setPath(waypoints, goal) {
        this.enemyWaypoint.setPath(waypoints, goal)
    }

    die() {
        this.active = false;
    }

    takeDamage(damage) {
        if (!this.active) return;
        this.healthComponent.takeDamage(damage, this.die.bind(this))
    }

    update(delta) {
        if (!this.active || this.hasReachedGoal) return;

        this.enemyWaypoint.move(delta);
    }

    dispose() {
        // Limpiar geometrías y materiales
        this.traverse((child) => {
            if (child.geometry) {
                child.geometry.dispose();
            }
            if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach(material => material.dispose());
                } else {
                    child.material.dispose();
                }
            }
        });
    }
}