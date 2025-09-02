import { Mesh, MeshBasicMaterial, SphereGeometry } from "three";
import BaseComponent from "@three/base/BaseComponent";


export default class ProjectileMeshComponent extends BaseComponent {
    constructor() {
        super();
    }

    start(entity) {
        const radius = entity.getComponent("projectile").getRadius();
        const geometry = new SphereGeometry(radius, 32, 16);
        const material = new MeshBasicMaterial({ color: 0xff0000 });
        const mesh = new Mesh(geometry, material);
        entity.add(mesh);
    }
}