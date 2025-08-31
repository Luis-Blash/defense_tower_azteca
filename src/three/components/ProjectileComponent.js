import BaseComponent from "@three/base/BaseComponent";


export default class ProjectileComponent  extends BaseComponent{
    constructor(config = {}) {
        super()
        const { speed = 2 } = config
        this.speed = speed
    }
}