import EventEmitter from "eventemitter3";

export const EVENTS = {
	examples: {
		moveCamare: "examplemoveCamare",
		loadCharacter: "exapleloadCharacter",
	},
	scenes: {
		changeScene: "changeScene",
	},
	loader3D: {
		onProgress: "loader3DOnPress",
		onLoad: "loader3DOnLoad",
		onLoadHdri: "onLoadHdri",
		onLoadReadyScene: "onLoadReadyScene",
	},
	nivelOne: {
		actionEmitter: "nivelOneActionEmitter"
	},
	listen:{
		getEnemies: "getEnemies",
		resetCooldown: "resetCooldown",
		gameOver: "gameOver"
	}
};

const ObserverEmitter = new EventEmitter();
export default ObserverEmitter;
