import { Mesh, MeshBasicMaterial, Object3D, TetrahedronGeometry, Vector3 } from "three";



export default class Pyramid extends Object3D {

    /**
     * Crea una nueva Pirámide.
     * @param {Object} config - Configuración inicial de la Pirámide.
     * @param {string} [config.name='Pyramid'] - Nombre de la Pirámide.
     * @param {Vector3} [config.position=new Vector3(0, 0, 0)] - Posición de la Pirámide.
     */
    constructor(config = {}) {
        super();

        const {
            position = new Vector3(0, 0, 0),
            name = 'Pyramid',
            debug = false,
        } = config
        this.position.copy(position);
        this.name = name

        this.createPyramid(debug)
    }

    createPyramid(debug) {
        const geometry = new TetrahedronGeometry(1, 1);
        const material = new MeshBasicMaterial({
            color: 0x00ff00,
            transparent: true,
            opacity: debug ? 1 : 0,
            wireframe: true
        });
        const pyramid = new Mesh(geometry, material);
        this.add(pyramid);
    }
}