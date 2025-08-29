import BaseComponent from "@three/base/BaseComponent";
import { dracoHelperLoader } from "@three/utils/DracoLoader";

export default class ModelComponent extends BaseComponent {
    /**
     * @param {Object} options
     * @param {Object} options.loadingManager
     * @param {string} options.path - Ruta al modelo (GLB/GLTF)
     * @param {boolean} [options.cache=true] - Usar instancia en cache
     */
    constructor({ loadingManager, path, cache = true }) {
        super();
        this.loadingManager = loadingManager;
        this.path = path;
        this.cache = cache;
        this.modelInstance = null;
    }

    start(entity) {
        super.start(entity);

        if (this.cache && ModelComponent.cache.has(this.path)) {
            // Clonar desde cache
            const cached = ModelComponent.cache.get(this.path);
            this.modelInstance = cached.clone(true);
            entity.add(this.modelInstance);
            return;
        }

        const loader = dracoHelperLoader(this.loadingManager);
        loader.load(this.path, gltf => {
            this.modelInstance = gltf.scene;
            entity.add(this.modelInstance);
            if (this.cache) ModelComponent.cache.set(this.path, this.modelInstance);
        });
    }

    dispose() {
        if (this.modelInstance) {
            this.entity.remove(this.modelInstance);
            this.modelInstance.traverse(child => {
                if (child.geometry) child.geometry.dispose();
                if (child.material) {
                    if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
                    else child.material.dispose();
                }
            });
        }
        super.dispose();
    }
}

// Cache estática compartida por todas las instancias
ModelComponent.cache = new Map();