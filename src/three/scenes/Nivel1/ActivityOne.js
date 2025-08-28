
export default class ActityOne {
    constructor(camera , scene) {
        this.camera = camera
        this.scene = scene

        this.cubeSelect = this.scene.cubeSelect

        this.init()
    }

    controlCamera(value = false) {
        this.camera.orbit.controls.enableRotate = value;
        this.camera.orbit.controls.enablePan = value;
        this.camera.orbit.controls.enableZoom = false
    }


    init() {
        this.controlCamera(false)
    }


    reActiveScene() {
    }

    dispose() {
    }

    renderAnimations() {
    }
}