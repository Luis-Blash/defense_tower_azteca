import BaseSystem from "@three/base/BaseSystem";

export default class ProjectileRespawSystem extends BaseSystem {
    constructor() {
        super();
        this.projectiles = new Map()
        this.projectileCount = 0;
        this.enemies = [];
    }

    setEnemies(enemies) {
        this.enemies = enemies
    }

    onRemoveScene(object) {
        this.entity.remove(object)
        this.projectiles.delete(object.name)
    }

    addProjectile({ ProjectileClass, entity, target }) {
        const nameProjectile = `projectile_${this.projectileCount}`
        const entityDamage = entity.getComponent("attackRange").getDamage()
        const projectile = new ProjectileClass({ name: nameProjectile, speed: 20, damage: entityDamage, onRemoveScene: this.onRemoveScene.bind(this) })
        projectile.getSystem("movement").setDirection(target.position.clone().sub(entity.position).normalize())
        projectile.position.set(entity.position.x, entity.position.y, entity.position.z)
        this.entity.add(projectile)

        this.projectiles.set(nameProjectile, { entity: projectile});
        this.projectileCount++;
    }

    update(delta) {
        for (const projectile of this.projectiles.values()) {
            projectile.entity.getSystem("collision").setObjects(this.enemies)
            projectile.entity.update(delta)
        }
    }
}