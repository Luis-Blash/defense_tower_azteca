import BaseComponent from "@three/base/BaseComponent";


export default class ProjectileComponent  extends BaseComponent{
    constructor(config = {}) {
        super()
        const { 
            speed = 2,
            damage = 10,
            radius = 0.75,
         } = config
        this.speed = speed
        this.damage = damage
        this.radius = radius;
    }

    getRadius() {
        return this.radius;
    }

    getDamage() {
        return this.damage;
    }

    getSpeed() {
        return this.speed;
    }
}