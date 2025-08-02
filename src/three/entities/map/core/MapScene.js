import { BoxGeometry, Mesh, MeshBasicMaterial, Object3D } from "three";


export default class MapScene extends Object3D {
    /**
     * Crea una nueva Mapa.
     * @param {Object} config - Configuración inicial de la Mapa.
     * @param {number} [config.width=10] - Ancho de la Mapa.
     * @param {number} [config.height=10] - Altura de la Mapa.
     * @param {number} [config.depth=10] - Profundidad de la Mapa.
     * @param {boolean} [config.debug=false] - Debug de la Mapa.
     */
    constructor(config = {}) {
        super();

        this.width = config.width || 10;
        this.height = config.height || 10;
        this.depth = config.depth || 10;

       this.debugMesh(config.debug)

    }

    debugMesh(debug) {
        const geometry = new BoxGeometry(this.width, this.depth, this.height);
        const material = new MeshBasicMaterial({ 
            color: 0x00ff00,
            transparent: true, 
            opacity: 0.2,
            wireframe: true
        });
        const cube = new Mesh(geometry, material);
        if(debug) this.add(cube);
    }
}