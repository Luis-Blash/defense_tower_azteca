import BaseScene from "@three/base/BaseScene";
import { actionsEventEmitter } from "./actionEventEmitter";
import { createLight, createResourcesEntities } from "./resource";
import Level1Activity from "./Level1Activity";

import SceneActivitySystem from "@three/systems/SceneActivitySystem";
import WaveSpawnerSystem from "@three/systems/WaveSpawnerSystem";
import MouseEventsSystem from "@three/systems/MouseEventsSystem";
import ClickRespawnSystem from "@three/systems/ClickRespawnSystem";
import ProjectileRespawSystem from "@three/systems/ProjectileRespawSystem";
import EvenEmitterSystem from "@three/systems/EvenEmitterSystem";
import SelectiveObserverSystem from "@three/systems/EvenEmitterSystem";


export default class NivelOne extends BaseScene {
	constructor(configApp, props) {
		super(configApp);

		this.createEntities()
		this.createECS(props)
	}

	createEntities() {
		this.camera.position.set(-28.0639, 15.7978, 18.1383)
		this.camera.rotation.set(-0.7165, -0.8622, -0.5843)
		this.camera.orbit.controls.minPolarAngle = Math.PI / 3;
		this.camera.orbit.controls.maxPolarAngle = Math.PI / 3;
		this.camera.orbit.controls.minDistance = 10;
		this.camera.orbit.controls.maxDistance = 80;
		this.camera.orbit.controls.enableZoom = true
		this.camera.orbit.controls.enablePan = true
		this.camera.orbit.controls.enableRotate = true

		const entites = createResourcesEntities({ loadingManager: this.loadingManager })
		for (const key in entites) {
			this.addEntity(key, entites[key])
		}

		const lightConfig = createLight()
		this.addEntity("light", lightConfig)
	}

	createECS(props) {
		const { activity = 1 } = props

		this
			.addSystem("sceneActivity", new SceneActivitySystem())
			.addSystem("waveSpawner", new WaveSpawnerSystem({
				scene: this,
				prototypes: {
					Golem: this.getEntity("prototypeGolem"),
					Warrior: this.getEntity("prototypeWarrior")
				},
				waves: [],
				pathWaypoints: [],
				goal: this.getEntity("pyramid"),
			}))
			.addSystem("mouseEvents", new MouseEventsSystem())
			.addSystem("clickRespawn", new ClickRespawnSystem())
			.addSystem("projectileRespawn", new ProjectileRespawSystem())
			.addSystem("gameObserver", new SelectiveObserverSystem())

		this
			.getSystem("sceneActivity")
			.registerActivity(1, Level1Activity)
			.switchTo(activity)

		this.getSystem("gameObserver")
			.setListenEvents([
				"nivelOne.actionEmitter",
			])
			.setEmitEvents([
				"listen.resetCooldown",
				"listen.gameOver"
			])
			.setActionRegister((data) => actionsEventEmitter({ ...data, scene: this }))

		this.getSystem("gameObserver").start()
	}

	update(delta) {
		this.systems.get("sceneActivity").update(delta)
	}
}