import BaseComponent from "@three/base/BaseComponent";

export default class MovementComponent extends BaseComponent {
    constructor(config = {}) {
        super();
        const {
            speed = 1,
        } = config
        this.speed = speed;
    }
}