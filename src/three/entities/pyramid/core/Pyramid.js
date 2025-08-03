import { Mesh, MeshBasicMaterial, Object3D, TetrahedronGeometry, Vector3 } from "three";



export default class Pyramid extends Object3D {

    constructor(config = {}) {
        super();

        const {
            position = new Vector3(0, 0, 0),
        } = config
        this.position.copy(position);

        this.createPyramid()
    }

    createPyramid() {
        const geometry = new TetrahedronGeometry(1, 1);
        const material = new MeshBasicMaterial({
            color: 0x00ff00,
            transparent: true,
            opacity: 0.2,
            wireframe: true
        });
        const pyramid = new Mesh(geometry, material);
        this.add(pyramid);
    }
}