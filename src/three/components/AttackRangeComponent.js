import { RingGeometry, MeshBasicMaterial, DoubleSide, Mesh } from "three";
import BaseComponent from "@three/base/BaseComponent";

export default class AttackRangeComponent extends BaseComponent {
    constructor(config = {}) {
        super();

        const {
            damage = 10,
            radius = 5,
            debug = false,
            color = 0x00ff00
        } = config;

        this.radius = radius;
        this.damage = damage;

        this.debug = debug;
        this.color = color;
        this.mesh = null;
    }

    start(entity) {
        super.start(entity);
        if (this.debug) {
            const geom = new RingGeometry(this.radius - 0.05, this.radius + 0.05, 32);
            const mat = new MeshBasicMaterial({ color: this.color, transparent: true, opacity: 0.3, side: DoubleSide });
            this.mesh = new Mesh(geom, mat);
            this.mesh.rotation.x = -Math.PI / 2;
            entity.add(this.mesh);
        }
    }

    getRadius() {
        return this.radius;
    }

    getDamage() {
        return this.damage;
    }

    dispose() {
        if (this.mesh) {
            this.mesh.geometry.dispose();
            this.mesh.material.dispose();
            this.entity.remove(this.mesh);
            this.mesh = null;
        }
        super.dispose();
    }
}