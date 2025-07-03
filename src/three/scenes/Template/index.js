import { AmbientLight, Scene } from "three";

import CubeSelect from "@three/entities/object/CubeSelect";

import ActityOne from "./ActivityOne";
const Activities = {
	1: ActityOne
}

export default class TemplateScene extends Scene {
	// configApp { loadingManager, camera, hdri }, sceneParams lo que le pases
	constructor(configApp, sceneParams) {
		super();
		console.log('init scene paramsExtra', sceneParams);

		this.camera = configApp.camera;
		this.loadingManager = configApp.loadingManager;
		this.environment = configApp.hdri;
		this.render = configApp.render
		this.container = configApp.container

		this.currentActivity = null
		this.mapScene = new Map()

		this.init();
		this.configScene()
		this.activitys(sceneParams.activity)

	}

	init() {
		this.cubeSelect = new CubeSelect()
		this.add(this.cubeSelect)
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
