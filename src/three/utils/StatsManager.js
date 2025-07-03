import Stats from 'three/examples/jsm/libs/stats.module';

export default class StatsManager {
	constructor({ disabled = false }) {
		this.stats = new Stats();
		this.stats.showPanel(0);
		if (!disabled) this.addDoomStats()
	}

	addDoomStats() {
		document.body.appendChild(this.stats.dom);
	}

	update() {
		if (!this.disabled) this.stats.update();
	}

	dispose() {
		document.body.removeChild(this.stats.dom);
		this.stats = null;
	}
}
