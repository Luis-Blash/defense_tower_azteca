import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";

export default class CubeSelect extends Mesh {
	constructor(name = "", color = 0x99ff33, size = 1) {
		super();
		this.geometry = new BoxGeometry(size, size, size);
		const uploadMaterial = new MeshStandardMaterial({
			color: color,
		});
		uploadMaterial.transparent = true
		this.name = `cube${name}`;
		this.material = uploadMaterial;
		this.renderOrder = 1;
	}

}
