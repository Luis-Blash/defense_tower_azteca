import BaseEntity from "@three/base/BaseEntity";

export default class Pyramid extends BaseEntity {
    constructor(config = {}) {
        const {
            name = "Pyramid",
            position = new Vector3(0, 0, 0),
        } = config

        super({ name });
        this.position.copy(position);

    }
 
}