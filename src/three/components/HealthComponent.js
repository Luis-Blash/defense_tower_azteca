import BaseComponent from "@three/base/BaseComponent";

export default class HealthComponent extends BaseComponent {
    constructor({ life = 100, maxLife = 100 } = {}) {
        super();
        this.life = life;
        this.maxLife = maxLife;
    }

    takeDamage(damage) {
        this.life -= damage;
        if (this.life <= 0) {
            this.life = 0;
            if (this.entity?.die) this.entity.die();
        }
    }

    heal(amount) {
        this.life = Math.min(this.life + amount, this.maxLife);
    }
}