import { WebGLRenderer } from 'three';

export default class RendererManager {
	constructor(container) {
		this.container = container;
		this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.container.appendChild(this.renderer.domElement);
	}

	setSize(width, height) {
		this.renderer.setSize(width, height);
	}

	dispose() {
		this.renderer.dispose();
		this.container.removeChild(this.renderer.domElement);
	}

	getRenderer() {
		return this.renderer;
	}
}
