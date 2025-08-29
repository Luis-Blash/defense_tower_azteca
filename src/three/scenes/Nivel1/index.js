import { AmbientLight, Scene, Vector3 } from "three";

import ActityOne from "./ActivityOne";

import MouseEvents from "@three/systems/MouseEvents";
import DebugMeshSystem from "@three/systems/DebugMeshSystem";

import Golem from "@three/entities/enemy/Golem";
import Waypoint from "@three/entities/Waypoint/Waypoint";
import Pyramid from "@three/entities/pyramid/Pyramid";

import EnemyTest from "@assets/models/Golem6.glb";

const Activities = {
	1: ActityOne
}

export default class TemplateScene extends Scene {
	// configApp { loadingManager, camera, hdri }, sceneParams lo que le pases
	constructor(configApp, sceneParams) {
		super();

		this.camera = configApp.camera;
		this.loadingManager = configApp.loadingManager;
		this.environment = configApp.hdri;
		this.render = configApp.renderer
		this.container = configApp.container
		this.transformControlsHelper = configApp.transformControlsHelper
		this.mouseEvents = new MouseEvents(this.camera, this.container, this.render, this);


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

		this.golem = new Golem({ name: "Golem", speed: 10, loadingManager: this.loadingManager, modelPath: EnemyTest })
		this.golem.addSystem("debug", new DebugMeshSystem({ visible: true, size: 1.5 }));
		this.add(this.golem)

		this.pyramid = new Pyramid({ name: "Pyramid", position: new Vector3(-20, 0, 0) })
		this.pyramid.addSystem("debug", new DebugMeshSystem({ color: 0xcc0000, visible: true, size: 1.5 }));
		this.add(this.pyramid)

		const pathWaypoints = []
		const waypoints = [
			{ position: new Vector3(8, 0, -3) },
			{ position: new Vector3(5, 0, 2) },
			{ position: new Vector3(0, 0, 5) },
			{ position: new Vector3(-5, 0, 5) },
			{ position: new Vector3(-10, 0, 0) },
		];
		waypoints.forEach((wp, index) => {
			const waypoint = new Waypoint({
				name: "Waypoint",
				id: index,
				position: wp.position
			})
			waypoint.addSystem("debug", new DebugMeshSystem({ color: 0x00ff00, visible: true, size: 1 }));
			this.add(waypoint)
			pathWaypoints.push(waypoint)
		})

		this.golem.getSystem("waypoint").setPath(pathWaypoints, this.pyramid)
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
		if(this.golem){
			this.golem.update(delta)
		}
	}

	dispose() {
	}
}
