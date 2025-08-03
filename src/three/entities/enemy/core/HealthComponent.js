

export default class HealthComponent {
    constructor({ life = 100, maxLife = 100 }) {
        this.life = life;
        this.maxLife = maxLife;
    }


    takeDamage(damage, die) {
        console.log('takeDamage', damage);
        this.life -= damage;
        if (this.life <= 0) { 
            die()
         }
    }

}