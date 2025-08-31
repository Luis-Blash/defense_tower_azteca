import BaseEntity from "@three/base/BaseEntity";
import ModelComponent from "@three/components/ModelComponent";

export default class Pyramid extends BaseEntity {
    constructor(config = {}) {
        const {
            name = "Pyramid",
            loadingManager,
            modelPath,
        } = config

        super({ name });

        this
            .addComponent("model", new ModelComponent({ loadingManager, path: modelPath }))

    }

}