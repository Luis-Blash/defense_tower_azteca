import { Scene } from "three";


export default class BaseScene extends Scene {
    constructor(configApp) {
        super();
        const {
            camera,
            loadingManager,
            hdri,
            renderer,
            container,
            transformControlsHelper,
        } = configApp

        this.camera = camera;
        this.loadingManager = loadingManager;
        this.environment = hdri;
        this.render = renderer
        this.container = container
        this.transformControlsHelper = transformControlsHelper

        this.components = new Map(); 
        this.systems = new Map(); 
        this.entities = new Map();
    }

    /** Añadir entidad */
    addEntity(name, entity) {
        this.entities.set(name, entity);
        this.add(entity);
        return this;
    }

    /** Obtener entidad */
    getEntity(name) {
        return this.entities.get(name);
    }

    /** Eliminar entidad */
    removeEntity(name) {
        const entity = this.entities.get(name);
        if (entity?.dispose) entity.dispose();
        this.entities.delete(name);
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

    /** Limpieza de recursos */
    dispose() {
        this.systems.forEach(system => system.dispose?.());
        this.components.forEach(component => component.dispose?.());
    }

    // por changue scene
    reLoad(props) {
    }
}