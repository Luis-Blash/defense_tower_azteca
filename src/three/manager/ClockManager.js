import { Clock } from "three";

export default class ClockManager {
    constructor() {
        this.clock = new Clock();
        this.delta = 0;
        this.deltasum = 0;
        this.interval = 1 / 60;
    }

    update() {
        this.delta = this.clock.getDelta();
        this.deltasum += this.delta;
    }

    isUpdate() {
        return this.deltasum >= this.interval;
    }

    updateDelta() {
        this.deltasum -= this.interval;
    }

    getDelta() {
        return this.delta;
    }
}
