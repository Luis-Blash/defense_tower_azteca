import BaseEntity from "@three/base/BaseEntity";
import ModelComponent from "@three/components/ModelComponent";



export default class MapScene extends BaseEntity {
    constructor(config = {}) {
        const {
            name = "MapScene",
            loadingManager,
            modelPath,
        } = config

        super({ name });
        
        this
            .addComponent("model", new ModelComponent({ loadingManager, path: modelPath }))

    }

}