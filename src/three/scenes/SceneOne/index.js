import { AmbientLight, Scene } from "three";

import ActityOne from "./ActivityOne";
const Activities = {
	1: ActityOne
}

// Entities
import MapScene from "@three/entities/map/core/MapScene";


export default class SceneOne extends Scene {
	// configApp { loadingManager, camera, hdri }, sceneParams lo que le pases
	constructor(configApp, sceneParams) {
		super();
		console.log('init scene paramsExtra', sceneParams);

		this.camera = configApp.camera;
		this.loadingManager = configApp.loadingManager;
		this.environment = configApp.hdri;
		this.render = configApp.render
		this.container = configApp.container
		this.transformControlsHelper = configApp.transformControlsHelper

		this.currentActivity = null
		this.mapScene = new Map()

		this.init();
		this.configScene()
		this.activitys(sceneParams.activity)

	}

	init() {

		this.camera.position.set(-28.0639, 15.7978, 18.1383)
		this.camera.rotation.set(-0.7165, -0.8622, -0.5843)
		this.camera.orbit.controls.minPolarAngle = Math.PI / 3;
		this.camera.orbit.controls.maxPolarAngle = Math.PI / 3;
		this.camera.orbit.controls.enableZoom = false
		this.camera.orbit.controls.enablePan = true
		this.camera.orbit.controls.enableRotate = true

		this.map = new MapScene({
			width: 40,
			height: 30,
			depth: 1,
			debug: true
		})
		this.map.position.set(0, -2, 0)
		this.add(this.map)

	}

	reActiveScene(sceneParams = { activity: 0 }) {
		this.currentActivity = this.mapScene.get(sceneParams.activity)
		this.currentActivity.reActiveScene()
	}

	configScene() {
		this.ambient = new AmbientLight();
		this.ambient.color.set(0xffffff);
		this.ambient.intensity = 1;
		this.add(this.ambient)
	}

	activitys(activity) {
		if (!Activities[activity]) return
		this.currentActivity = new Activities[activity](this.camera, this)
		this.mapScene.set(activity, this.currentActivity)
	}

	renderAnimations(delta) {
		if (this.currentActivity) {
			this.currentActivity.renderAnimations(delta)
		}
	}

	dispose() {
	}
}
