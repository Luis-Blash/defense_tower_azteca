export default class BaseActivityScene {
    constructor(scene, config = {}) {
        this.scene = scene
        this.config = config
    }
    
    update(delta) {}
    dispose() {}
}