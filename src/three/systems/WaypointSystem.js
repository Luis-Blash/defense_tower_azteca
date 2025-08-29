import { Vector3 } from "three";
import BaseSystem from "@three/base/BaseSystem";

export default class WaypointSystem extends BaseSystem {
    constructor(config = {}) {
        super();
        const {
            threshold = 0.1,
        } = config

        this.threshold = threshold;
        this.path = [];
        this.currentIndex = 0;
        this.goal = new Vector3();

    }

    setPath(waypoints, goal) {
        this.path = waypoints.map(wp => wp.position.clone());
        this.entity?.position.copy(this.path[0]);
        this.currentIndex = 0;
        if (goal) this.goal.copy(goal.position ?? goal);
    }

    move(delta) {
        if (!this.entity.active || this.path.length === 0) return;
        const movement = this.entity.getComponent("movement");
        if (!movement) return;

        const target = this.currentIndex < this.path.length
            ? this.path[this.currentIndex]
            : this.goal;

        const dir = new Vector3().subVectors(target, this.entity.position);
        const dist = dir.length();

        if (dist <= this.threshold) {
            if (this.currentIndex < this.path.length) {
                this.currentIndex++;
            } else {
                return;
            }
        } else {
            dir.normalize().multiplyScalar(movement.speed * delta);
            this.entity.position.add(dir);
            this.entity.lookAt(target);
        }
    }

}