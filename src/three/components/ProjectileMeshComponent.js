import { Mesh, SphereGeometry } from "three";
import BaseComponent from "@three/base/BaseComponent";
import FireballMaterialShader from "@three/shaders/FireBall/FireballMaterial";


export default class ProjectileMeshComponent extends BaseComponent {
    constructor() {
        super();
    }

    start(entity) {
        const radius = entity.getComponent("projectile").getRadius();
        const geometry = new SphereGeometry(radius, 32, 16);
        const material = new FireballMaterialShader({ 
            radius: 1.0, 
            intensity: 1.5,
            noiseScale: 1.5,
            speed: 1.0,
            glow: 0.6,
        });
        this.material = material;
        const mesh = new Mesh(geometry, material);
        entity.add(mesh);
    }

    update(delta) {
        this.material.update(delta);
    }
}