import ObserverEmitter, { EVENTS } from '@services/Observer';

export default class SceneChangueManager {
	constructor({ container, renderer, camera, sceneLoader }) {
		this.container = container;
		this.renderer = renderer;
		this.camera = camera;

		this.sceneLoader = sceneLoader

		this.scenes = new Map();
		this.currentScene = null;

		this.setupEventListeners();
	}

	setupEventListeners() {
		ObserverEmitter.on(EVENTS.scenes.changeScene, ({ sceneName = "", sceneParams = {} }) => {
			this.changeScene({
				sceneName,
				sceneParams,
				callback: () => { }
			});
		});
	}

	changeScene({ sceneName, sceneParams = {}, callback }) {
		if (this.currentScene) {
			this.currentScene.dispose();
		}

		if (this.scenes.has(sceneName)) {
			console.log(' -- Scene already loaded ---');
			this.currentScene = this.scenes.get(sceneName);
			this.currentScene.reActiveScene();
			return
		}


		this.sceneLoader.loadScene({
			sceneName,
			sceneParams,
			callback: (scene) => {
				this.scenes.set(sceneName, scene);
				this.currentScene = scene;
				callback()
			}
		})
	}

	renderAnimations(delta) {
		if (this.currentScene) {
			this.currentScene.renderAnimations(delta);
		}
	}

	renderScene(delta) {
		this.renderer.render(this.currentScene, this.camera);
		this.renderAnimations(delta);
	}

	getCurrentScene() {
		return this.currentScene;
	}
}
