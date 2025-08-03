import { Vector3 } from "three";


export default class EnemyWaypoint {
    constructor(enemy, {speed = 1}) {

        this.enemy = enemy;
        // Estado del movimiento
        this.speed = speed;
        this.path = [];
        this.currentWaypointIndex = 0;
        this.goalPosition = new Vector3();
        this.targetPosition = new Vector3();

        // Movimiento
        this.distanceToGoal = 0;
        this.totalPathDistance = 0;
        this.waypointThreshold = 0.1;
        this.velocity = new Vector3();

    }


    setPath(waypoints, goal) {
        // waypoints = [Vector3, Vector3, Vector3]
        // goal = Object3D
        this.path = [...waypoints];
        this.goalPosition.copy(goal.position);

        if (this.path.length > 0) {
            this.enemy.position.copy(this.path[0]);
            this.currentWaypointIndex = 0;

            this.targetPosition.copy(this.path[this.currentWaypointIndex]);
        }
    }


    // Implementar el método moveTowardsTarget:
    moveTowardsTarget(target, moveDistance) {
        const direction = new Vector3();
        direction.subVectors(target, this.enemy.position);
        const distanceToTarget = direction.length();

        // Si estamos muy cerca O si el movimiento nos llevaría más allá del target
        if (distanceToTarget <= this.waypointThreshold || distanceToTarget <= moveDistance) {
            this.enemy.position.copy(target);
            return true;
        }

        direction.normalize();
        direction.multiplyScalar(moveDistance);
        this.enemy.position.add(direction);
        this.enemy.lookAt(this.enemy.position.clone().add(direction));

        return false; // No hemos llegado aún
    }

    // Implementar el método move:
    move(delta) {
        if (this.enemy.hasReachedGoal || !this.enemy.active || this.path.length === 0) return;

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
                this.enemy.hasReachedGoal = true;
            }
        }
    }
}