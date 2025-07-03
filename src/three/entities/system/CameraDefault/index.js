import { PerspectiveCamera } from "three";
import CameraControls from "./CameraControls";
import CameraAnimator from "./CameraAnimator";

export default class CameraController extends PerspectiveCamera {
	constructor({ fov, aspect, near, far, container }) {
		super(fov, aspect, near, far);
		if (CameraController.instance) {
			return CameraController.instance;
		}
		CameraController.instance = this;

		this.orbit = new CameraControls(this, container);
		this.animator = new CameraAnimator(this, this.orbit);

		this.orbitsEnabled = true;

		this.position.set(0, 0, 5);

	}

	update() {
		if (this.orbitsEnabled) {
			this.orbit.update();
		}
	}

	dispose() {
		if (!this.orbit) return

		this.orbit.dispose();
		CameraController.instance = null;
	}

	disabledOrbitControls() {
		this.orbit.disabledOrbitControls();
		this.orbitsEnabled = false;
	}

	enabledOrbitControls() {
		this.orbit.enabledOrbitControls();
		this.orbitsEnabled = true;
	}

	moveCameraToPoint({ maxAzimuthAngle = Infinity, minAzimuthAngle = Infinity, point, duration, target, callBack }) {
		this.orbit.setAzimuthAngle({ maxAzimuthAngle, minAzimuthAngle })
		this.animator.moveCameraToPoint(point, duration, target, callBack);
	}
}
