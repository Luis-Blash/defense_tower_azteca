import { Mesh } from "three";
import { dracoHelperLoader } from "@three/utils/DracoLoader";
import model from "@assets/models/Base.glb";

export default class BaseTest extends Mesh {
    constructor({ loadingManager, name = "BaseTest" }) {
        super()
        this.name = name
        this.loadingManager = loadingManager
        const loader = dracoHelperLoader(loadingManager)
        this.loading = loader;
        this.onLoadModel(loader);
    }

    // Sobrescribe el método clone
    clone(recursive = true) {
        const cloned = new BaseTest({
            loadingManager: this.loadingManager,
            name: this.name
        });

        // Copia los children si ya están cargados
        if (recursive && this.children.length > 0) {
            this.children.forEach(child => {
                cloned.add(child.clone());
            });
        }

        return cloned;
    }

    onLoadModel(loader) {
        loader.load(model, (gltf) => {
            this.add(gltf.scene);
        });
    }

    renderAnimations() { }

    dispose() { }
}