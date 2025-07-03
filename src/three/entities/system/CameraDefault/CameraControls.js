import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class CameraControls {
	constructor(camera, container) {
		this.camera = camera;
		this.controls = new OrbitControls(camera, container);
	}

	setEnableOrbit(value = false) {
		this.controls.enabled = value
	}

	update() {
		this.controls.update();
	}

	dispose() {
		this.controls.dispose();
	}

	disabledOrbitControls() {
		this.controls.enabled = false;
	}

	enabledOrbitControls() {
		this.controls.enabled = true;
	}

	setAzimuthAngle({ maxAzimuthAngle = Infinity, minAzimuthAngle = Infinity }) {
		this.controls.maxAzimuthAngle = maxAzimuthAngle;
		this.controls.minAzimuthAngle = minAzimuthAngle;
	}
}
