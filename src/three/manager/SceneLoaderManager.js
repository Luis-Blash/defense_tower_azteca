// SceneLoaderManager.js
import { LoadingManager } from 'three';
import ObserverEmitter, { EVENTS } from '@services/Observer';
import { getSceneClass } from '@three/scenes';

export default class SceneLoaderManager {
	constructor({ camera = null, hdri, transformControlsHelper }) {
		this.loadingManager = new LoadingManager();

		this.configApp = {
			loadingManager: this.loadingManager,
			camera: camera,
			hdri: hdri,
			transformControlsHelper: transformControlsHelper
		}
	}

	loadScene({ sceneName, sceneParams, callback }) {
		console.log(' --- Loading new scene ---');

		//? Aqui le pasas los props a cada scena que se carga
		const SceneClass = getSceneClass(sceneName);
		const sceneInstance = new SceneClass(
			this.configApp,
			sceneParams,
		);

		this.loadingManager.onProgress = () => {
			ObserverEmitter.emit(EVENTS.loader3D.onProgress);
		};

		this.loadingManager.onLoad = () => {
			console.log('-- loading complete ---');
			ObserverEmitter.emit(EVENTS.loader3D.onLoad);
			callback(sceneInstance)
		};

		//! SI DESDE UN INICIO NECESITA EL LOADER AGREGA ESTA PARTE A ONLOAD DEL LOADER
		callback(sceneInstance)
		ObserverEmitter.emit(EVENTS.loader3D.onLoad);
	}
}
