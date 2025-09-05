import { Mesh, MeshBasicMaterial, SphereGeometry } from "three";
import BaseComponent from "@three/base/BaseComponent";


export default class ProjectileMeshComponent extends BaseComponent {
    constructor(material = null) {
        super();
        this.material = material;
    }

    start(entity) {
        const radius = entity.getComponent("projectile").getRadius();
        const geometry = new SphereGeometry(radius, 32, 16);
        if(this.material) {
            this.mesh = new Mesh(geometry, this.material);
        } else {
            this.mesh = new Mesh(geometry, new MeshBasicMaterial({ color: 0xff0000 }));
        }
        entity.add(this.mesh);
    }

    update(delta) {
        if(this.material && this.material.uniforms && this.material.uniforms.uTime){
            this.material.uniforms.uTime.value += delta;
        }
    }
}