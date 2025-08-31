import { Mesh, MeshBasicMaterial, SphereGeometry } from "three";
import BaseComponent from "@three/base/BaseComponent";


export default class ProjectileMeshComponent extends BaseComponent {
    constructor() {
        super();
    }

    start(entity) {
        const geometry = new SphereGeometry(15, 32, 16);
        const material = new MeshBasicMaterial({ color: 0xff0000 });
        const mesh = new Mesh(geometry, material);
        mesh.scale.set(0.05, 0.05, 0.05);
        entity.add(mesh);
    }
}