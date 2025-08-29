export default class BaseComponent {
    /** Se ejecuta al añadirse a la entidad */
    start(entity) {        
        this.entity = entity;
    }

    /** Se ejecuta cada frame, si es necesario */
    update(delta) {}

    /** Limpieza de recursos */
    dispose() {
        this.entity = null;
    }
}