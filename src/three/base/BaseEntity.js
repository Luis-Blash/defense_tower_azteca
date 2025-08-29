import { Object3D } from "three";

export default class BaseEntity extends Object3D {
    constructor({ name = "Entity" } = {}) {
        super();
        this.name = name;
        this.active = true;
        this.components = new Map(); 
        this.systems = new Map(); 
    }

    /** Añadir componente */
    addComponent(name, component) {
        this.components.set(name, component);        
        if (component.start) component.start(this);
        return this;
    }

    /** Añadir sistema */
    addSystem(name, system) {
        this.systems.set(name, system);
        if (system.start) system.start(this);
        return this;
    }

    /** Obtener componente */
    getComponent(name) {
        return this.components.get(name);
    }

    /** Obtener sistema */
    getSystem(name) {
        return this.systems.get(name);
    }

    /** Eliminar componente */
    removeComponent(name) {
        const comp = this.components.get(name);
        if (comp?.dispose) comp.dispose();
        this.components.delete(name);
    }

    /** Eliminar sistema */
    removeSystem(name) {
        const sys = this.systems.get(name);
        if (sys?.dispose) sys.dispose();
        this.systems.delete(name);
    }

    /** Actualizar todos los sistemas activos */
    update(delta) {
        for (const sys of this.systems.values()) {
            if (sys.update) sys.update(delta);
        }
    }

    /** Marcar como inactiva (muerte o desactivación) */
    deactivate() {
        this.active = false;
    }

    /** Limpieza de recursos */
    dispose() {
        [...this.components.values(), ...this.systems.values()].forEach(obj => {
            if (obj?.dispose) obj.dispose();
        });
        this.traverse(child => {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
                if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
                else child.material.dispose();
            }
        });
    }
}