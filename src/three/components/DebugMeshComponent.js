import { Mesh, MeshBasicMaterial, SphereGeometry } from "three";
import BaseSystem from "@three/base/BaseSystem";

export default class DebugMeshComponent extends BaseSystem {
    constructor({ color = 0xffff00, size = 1, segments = [10, 6], visible = false } = {}) {
        super();
        this.color = color;
        this.size = size;
        this.segments = segments;
        this.visible = visible;
        this.mesh = null;
    }

    start(entity) {
        this.entity = entity;

        const geometry = new SphereGeometry(this.size, this.segments[0], this.segments[1]);
        const material = new MeshBasicMaterial({
            color: this.color,
            transparent: true,
            opacity: this.visible ? 1 : 0,
            wireframe: true
        });

        this.mesh = new Mesh(geometry, material);
        this.mesh.name = `${entity.name}_Debug`;
        entity.add(this.mesh);
    }

    setVisible(state) {
        this.visible = state;
        if (this.mesh) this.mesh.material.opacity = state ? 1 : 0;
    }

    dispose() {
        if (this.mesh) {
            this.mesh.geometry.dispose();
            this.mesh.material.dispose();
            this.entity.remove(this.mesh);
            this.mesh = null;
        }
        this.entity = null;
    }
}