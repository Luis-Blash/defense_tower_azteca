import { Mesh, MeshBasicMaterial, Object3D, SphereGeometry } from "three";

export default class Enemy extends Object3D {
    /**
     * Crea una nueva Enemigo.
     * @param {Object} config - Configuración inicial de la Enemigo.
     * @param {boolean} [config.debug=false] - Debug de la Enemigo.
     */
    constructor(config = {}) {
        super()

        this.debugMesh(config.debug)
    }

    debugMesh(debug = false) {
        const geometry = new SphereGeometry(1, 10, 6);
        const material = new MeshBasicMaterial({
            color: 0xffff00,
            transparent: true,
            opacity: 0.2,
            wireframe: true
        });
        const sphere = new Mesh(geometry, material);
        if (debug) this.add(sphere);
    }

    takeDamage(damage) {
       console.log(this.name,'takeDamage', damage);
       
    }

    update(delta) {
        
    }
}