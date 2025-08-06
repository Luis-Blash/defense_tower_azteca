import { Mesh } from "three";
import { dracoHelperLoader } from "@three/utils/DracoLoader";
import model from "@assets/models/Enemy.glb";

export default class EnemyTest extends Mesh {
    constructor({ loadingManager, name = "EnemyTest" }) {
        super()
        this.name = name
        this.loadingManager = loadingManager // Guarda la referencia
        const loader = dracoHelperLoader(loadingManager)
        this.loading = loader;
        this.onLoadModel(loader);
    }

    // Sobrescribe el método clone
    clone(recursive = true) {
        const cloned = new EnemyTest({
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