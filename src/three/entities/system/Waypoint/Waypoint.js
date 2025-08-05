// src/three/entities/object/Waypoint.js
import { Object3D, SphereGeometry, MeshBasicMaterial, Mesh } from 'three';

export default class Waypoint extends Object3D {
    /**
     * Crea una nueva Waypoint.
     * @param {Object} config - Configuración inicial de la Waypoint.
     * @param {number} [config.id] - ID de la Waypoint.
     * @param {boolean} [config.debug=false] - Debug de la Waypoint.
     */
    constructor(position, config = {}) {
        super();
        
        const {
            id = Math.random().toString(36).substr(2, 9),
            name = 'Waypoint',
            debug = false,
        } = config
        
        this.name = name;
        this.waypointId = id;
        this.nextWaypoint = null;
        
        this.position.copy(position);
        
        this.createVisualRepresentation(debug);
    }
    
    createVisualRepresentation(debug) {
        const geometry = new SphereGeometry(0.5, 6, 4);
        const material = new MeshBasicMaterial({ 
            color: 0x00fff0,
            transparent: true,
            opacity: debug ? 1 : 0,
            wireframe: true
        });        
        this.mesh = new Mesh(geometry, material);
        this.mesh.name = `${this.name}`;
        this.add(this.mesh);
    }
    
    dispose() {
        if (this.mesh) {
            this.mesh.geometry.dispose();
            this.mesh.material.dispose();
        }
    }
}