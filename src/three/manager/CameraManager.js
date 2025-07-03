export default class CameraManager {
	constructor({ cameraController }) {
		this.camera = cameraController
		this.camera.position.set(0, 0, 5);
	}

	updateAspect(width, height) {
		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();
	}

	getCamera() {
		return this.camera;
	}

	update(delta) {
		this.camera.update(delta)
	}

	dispose() {
		this.camera.dispose();
	}
}
