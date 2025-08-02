
const getClosestTarget = (towerPosition, targets) => {
    return targets.reduce((closest, enemy) => {
        const distanceToEnemy = enemy.position.distanceTo(towerPosition);
        return distanceToEnemy < closest.position.distanceTo(towerPosition)
            ? enemy
            : closest;
    });
}

export default class TowerAttack {
    constructor(tower, config = {}) {
        this.tower = tower;
        this.fireRate = config.fireRate || 1;
        this.damage = config.damage || 10;
        this.targets = [];
        this.currentTarget = null;
        this.timeSinceLastFire = 0;
    }

    update(delta, targets = [], animation) {
        this.targets = targets;
        this.selectTarget();
        this.attack(delta, animation);
    }

    selectTarget() {
        if (this.targets.length === 0) {
            this.currentTarget = null;
            return;
        }
        this.currentTarget = getClosestTarget(this.tower.position, this.targets);
    }

    attack(delta, animation) {
        if (!this.currentTarget) return;

        this.timeSinceLastFire += delta;
        const fireInterval = 1 / this.fireRate;

        if (this.timeSinceLastFire >= fireInterval) {
            this.fire(animation);
            this.timeSinceLastFire = 0;
        }
    }

    fire(animation = null) {
        if (!this.currentTarget) return;
        this.currentTarget.takeDamage(this.damage);
        this.tower.lookAt(this.currentTarget.position);
        animation && animation()
    }
}