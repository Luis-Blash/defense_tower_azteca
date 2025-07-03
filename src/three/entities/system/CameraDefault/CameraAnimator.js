import { gsap } from 'gsap';

export default class CameraAnimator {
	constructor(camera, orbitControls) {
		this.camera = camera;
		this.orbit = orbitControls;
	}

	moveCameraToPoint(point, duration = 1, target, callBack = () => { }) {
		const endPosition = point.clone();
		const timeline = gsap.timeline();

		timeline.to(this.camera.position, {
			duration,
			x: endPosition.x,
			y: endPosition.y,
			z: endPosition.z,
			onComplete: () => {
				callBack();
			}
		});
		timeline.to(this.orbit.controls.target, {
			duration,
			x: target.x,
			y: target.y,
			z: target.z
		}, `-=${duration}`);

		timeline.play();
	}
}
