import { BoxGeometry, Mesh, MeshBasicMaterial, Object3D } from "three";


export default class MapScene extends Object3D {
    /**
     * Crea una nueva Mapa.
     * @param {Object} config - Configuración inicial de la Mapa.
     * @param {string} [config.name='MapScene'] - Nombre de la Mapa.
     * @param {number} [config.width=10] - Ancho de la Mapa.
     * @param {number} [config.height=10] - Altura de la Mapa.
     * @param {number} [config.depth=10] - Profundidad de la Mapa.
     * @param {boolean} [config.debug=false] - Debug de la Mapa.
     */
    constructor(config = {}) {
        super();

        const {
            name = 'MapScene',
            width = 10,
            height = 10,
            depth = 10,
            debug = false,
        } = config

        this.name = name
        this.width = width;
        this.height = height;
        this.depth = depth;

       this.debugMesh(debug)

    }

    debugMesh(debug) {
        const geometry = new BoxGeometry(this.width, this.depth, this.height);
        const material = new MeshBasicMaterial({ 
            color: 0x00ff00,
            transparent: true, 
            opacity: debug ? 1 : 0,
            wireframe: true
        });
        const cube = new Mesh(geometry, material);
        cube.name = `${this.name}`;
        this.add(cube);
    }
}