export default class BaseSystem {
    /** Se ejecuta al añadirse a la entidad */
    start(entity) {
        this.entity = entity;
    }

    /** Lógica por frame */
    update(delta) {}

    /** Limpieza de recursos */
    dispose() {
        this.entity = null;
    }
}