
// src/three/entities/enemy/managers/PathManager.js
import { Vector3 } from 'three';

export default class PathManager {
    constructor() {
        this.spawnPoint = new Vector3(0, 0, 0);
        this.waypoints = [];
        this.goal = null;
    }

    setPath(waypoints = [], goal) {
        this.waypoints = waypoints.map(wp => wp.position.clone());
        this.goal = goal;

        if (waypoints.length > 0) {
            this.spawnPoint.copy(waypoints[0].position);
        }
    }

    getCurrentPath() {
        return {
            spawnPoint: this.spawnPoint.clone(),
            waypoints: [...this.waypoints],
            goal: this.goal
        };
    }

    getSpawnPoint() {
        return this.spawnPoint.clone();
    }

    getWaypoints() {
        return [...this.waypoints];
    }

    getGoal() {
        return this.goal;
    }

    dispose() {
        this.waypoints = [];
        this.goal = null;
    }
}