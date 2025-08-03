import { Mesh, MeshBasicMaterial, Object3D, SphereGeometry, Vector3 } from "three";

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

        // Estado del movimiento
        this.path = [];
        this.currentWaypointIndex = 0;
        this.distanceToGoal = 0;
        this.totalPathDistance = 0;
        this.hasReachedGoal = false;

        this.goalPosition = new Vector3();
        this.waypointThreshold = 0.1;

        // Movimiento
        this.velocity = new Vector3();
        this.targetPosition = new Vector3();
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

    setPath(waypoints, goal) {
        // waypoints = [Vector3, Vector3, Vector3]
        // goal = Object3D
        this.path = [...waypoints];
        this.goalPosition.copy(goal.position);

        if (this.path.length > 0) {
            this.position.copy(this.path[0]);
            this.currentWaypointIndex = 0;

            this.targetPosition.copy(this.path[this.currentWaypointIndex]);
        }
    }

    takeDamage(damage) {
        console.log('takeDamage', damage);
        this.life -= damage;
        if (this.life <= 0) {
            this.die();
        }
    }

    die() {
        this.active = false;
    }

    // Implementar el método moveTowardsTarget:
    moveTowardsTarget(target, moveDistance) {
        const direction = new Vector3();
        direction.subVectors(target, this.position);
        const distanceToTarget = direction.length();

        // Si estamos muy cerca O si el movimiento nos llevaría más allá del target
        if (distanceToTarget <= this.waypointThreshold || distanceToTarget <= moveDistance) {
            this.position.copy(target);
            return true;
        }

        direction.normalize();
        direction.multiplyScalar(moveDistance);
        this.position.add(direction);

        return false; // No hemos llegado aún
    }

    // Implementar el método move:
    move(delta) {
        if (this.hasReachedGoal || !this.active || this.path.length === 0) return;

        const moveDistance = this.speed * delta;

        // Si estamos siguiendo waypoints
        if (this.currentWaypointIndex < this.path.length) {
            this.targetPosition.copy(this.path[this.currentWaypointIndex]);

            // Moverse hacia el waypoint actual
            const reachedWaypoint = this.moveTowardsTarget(this.targetPosition, moveDistance);

            if (reachedWaypoint) {
                // Avanzar al siguiente waypoint
                this.currentWaypointIndex++;

                // Si hemos completado todos los waypoints, ir al goal
                if (this.currentWaypointIndex >= this.path.length) {
                    this.targetPosition.copy(this.goalPosition);
                }
            }
        } else {
            // Ir hacia el goal final
            const reachedGoal = this.moveTowardsTarget(this.goalPosition, moveDistance);

            if (reachedGoal) {
                this.hasReachedGoal = true;
                console.log('Enemy ha llegado al goal!');
            }
        }
    }

    update(delta) {
        if (!this.active || this.hasReachedGoal) return;

        this.move(delta);
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