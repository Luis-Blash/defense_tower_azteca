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
	voiceAudio: {
		initScene: "initScene",
		voicePlay: "voicePlay",
		voiceStop: "voiceStop"
	},
	ambientSound: {
		play: "playAmbientSound"
	},
	stepsDialog: {
		nextStep: "nextStep",
		hiddenUIStep: "hiddenUIStep"
	},
	momento1_activity: {
		action_activity: "action_activity"
	},
	momento2_activity: {
		action_activity: "action_activity"
	},
	momento3_activity: {
		action_activity: "action_activity"
	},
	momento4_activity: {
		action_activity: "action_activity"
	},
};

const ObserverEmitter = new EventEmitter();
export default ObserverEmitter;
