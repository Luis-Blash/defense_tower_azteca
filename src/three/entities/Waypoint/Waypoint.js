import { Vector3 } from 'three';
import BaseEntity from '@three/base/BaseEntity';

export default class Waypoint extends BaseEntity {

    constructor(config = {}) {
        const {
            name = 'Waypoint',
            id = Math.random().toString(36).substr(2, 9),
            position = new Vector3(0, 0, 0),
        } = config

        super({ name });
        this.waypointId = id;
        this.position.copy(position);
    }


}