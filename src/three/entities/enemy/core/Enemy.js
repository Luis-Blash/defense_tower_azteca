import { Mesh, MeshBasicMaterial, Object3D, SphereGeometry } from "three";

export default class Enemy extends Object3D {
    /**
     * Crea una nueva Enemigo.
     * @param {Object} config - Configuración inicial de la Enemigo.
     * @param {number} [config.life=100] - Vida de la Enemigo.
     * @param {number} [config.maxLife=100] - Vida máxima de la Enemigo.
     * @param {number} [config.damage=10] - Daño que causa la Enemigo.
     * @param {number} [config.speed=1] - Velocidad de la Enemigo.
     * @param {boolean} [config.debug=false] - Debug de la Enemigo.
     */
    constructor(config = {}) {
        super()

        this.statsEnemy(config)
        this.debugMesh(config.debug)
    }

    statsEnemy(config = {}) {
        const {
            life = 100,
            maxLife = 100,
            damage = 10,
            speed = 1,
        } = config;

        this.life = life;
        this.maxLife = maxLife;
        this.damage = damage;
        this.speed = speed;
        this.active = true;
        this.shouldRemove = false;
    }

    debugMesh(debug = false) {
        const geometry = new SphereGeometry(1, 10, 6);
        const material = new MeshBasicMaterial({
            color: 0xffff00,
            transparent: true,
            opacity: 0.2,
            wireframe: true
        });
        const sphere = new Mesh(geometry, material);
        if (debug) this.add(sphere);
    }

    takeDamage(damage) {
        console.log(this.name, 'takeDamage', damage);
        this.life -= damage;
        if (this.life <= 0) {
            this.die();
        }
    }

    die() {
        this.active = false;
        this.shouldRemove = true;
    }

    update(delta) {
        if (!this.active) return;

        this.position.x += this.speed * delta;

        // Verificar si debe morir por vida
        if (this.life <= 0 && !this.shouldRemove) {
            this.die();
        }

        // Verificar límites del mapa (opcional)
        if (this.position.x < -20 || this.position.x > 20) {
            this.shouldRemove = true;
        }
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