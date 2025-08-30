import BaseComponent from "@three/base/BaseComponent";
import { dracoHelperLoader } from "@three/utils/DracoLoader";

export default class ModelComponent extends BaseComponent {
    /**
     * @param {Object} options
     * @param {Object} options.loadingManager
     * @param {string} options.path
     */
    constructor({ loadingManager = null, path }) {
        super();
        this.loadingManager = loadingManager;
        this.path = path;
        this.modelInstance = null;
        this.gltf = null;
        this.onModelReadyCallbacks = [];

    }

    start(entity) {
        super.start(entity);

        if(!this.loadingManager)  return;

        const loader = dracoHelperLoader(this.loadingManager);
        loader.load(this.path, gltf => {            
            this.modelInstance = gltf.scene;
            this.gltf = gltf;
            entity.add(this.modelInstance);
            this.onModelReadyCallbacks.forEach(fn => fn());
        });
    }

    addOnModelReadyCallback(fn) {
        this.onModelReadyCallbacks.push(fn);
    }

    getModelInstance() {
        return this.modelInstance;
    }

    getGLTF() {
        return this.gltf;
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