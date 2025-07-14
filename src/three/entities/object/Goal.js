
import { Mesh } from "three";
import { dracoHelperLoader } from "@three/utils/DracoLoader";
import model from "@assets/models/Goal.glb";

export default class Goal extends Mesh {
	constructor({ loadingManager, name = "Goal" }) {
		super();
		this.name = name
		const loader = dracoHelperLoader(loadingManager)
		this.loading = loader;
        this.onLoadModel(loader);
    }

    onLoadModel(loader) {
        loader.load(model, (gltf) => {
			this.add(gltf.scene);

        });
    }

    renderAnimations() { }

    dispose() { }
}