import BaseComponent from "@three/base/BaseComponent";


export default class ProjectileComponent  extends BaseComponent{
    constructor(config = {}) {
        super()
        const { 
            speed = 2,
            damage = 10,
            maxDistance = 100,
         } = config
        this.speed = speed
        this.damage = damage
        this.maxDistance = maxDistance
    }
}