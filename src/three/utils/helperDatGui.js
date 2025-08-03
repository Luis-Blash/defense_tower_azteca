import { GUI } from "dat.gui";

const gui = new GUI();

export const cameraDataGui = (cameraController) => {
	if (!cameraController) return;

	const camera = cameraController.orbit.camera
	const control = cameraController.orbit.controls

	const cameraControls = gui.addFolder("camera");
	cameraControls.add(camera.position, "x", -300, 300).step(0.0001).listen();
	cameraControls.add(camera.position, "y", -1000, 1000).step(0.0001).listen();
	cameraControls.add(camera.position, "z", -900, 100).step(0.0001).listen();
	cameraControls.add(camera.rotation, "x", -5.0, 5.0).step(0.0001).listen();
	cameraControls.add(camera.rotation, "y", -5.0, 5.0).step(0.0001).listen();
	cameraControls.add(camera.rotation, "z", -5.0, 5.0).step(0.0001).listen();

	const controls = gui.addFolder("controls");
	controls.add(control.target, "x", -300, 300).step(0.001).listen();
	controls.add(control.target, "y", -700, 700).step(0.001).listen();
	controls.add(control.target, "z", -300, 300).step(0.001).listen();
	controls.add(control, "maxAzimuthAngle", -4, 4).step(0.001).listen();
	controls.add(control, "minAzimuthAngle", -4, 4).step(0.001).listen();
	controls.add(control, "minDistance", -10, 10).step(0.1).name("Min Distance").listen();
	controls.add(control, "maxDistance", -10, 10).step(0.1).name("Max Distance").listen();
}


export const textureMaterialGui = (name = "", model) => {
	if (!model) return;

	const mat = model.material;
	console.log(mat);

	const folder = gui.addFolder(`Material ${name}`);

	// Color base (reacciona a la iluminación)
	folder
		.addColor({ color: `#${mat.color.getHexString()}` }, 'color')
		.name('Color Base')
		.onChange(v => mat.color.set(v));

	// Emissive (color que emite luz)
	folder
		.addColor({ emissive: `#${mat.emissive.getHexString()}` }, 'emissive')
		.name('Emissive')
		.onChange(v => mat.emissive.set(v));

	// Roughness y metalness (PBR)
	folder
		.add(mat, 'roughness', 0, 1, 0.01)
		.name('Roughness');
	folder
		.add(mat, 'metalness', 0, 1, 0.01)
		.name('Metalness');

	// Intensidad de los mapas ligeros
	folder
		.add(mat, 'lightMapIntensity', 0, 1, 0.01)
		.name('Intensidad LightMap');
	folder
		.add(mat, 'aoMapIntensity', 0, 1, 0.01)
		.name('Intensidad AOMap');

	// Mapas de textura y sus repeticiones
	if (mat.map) {
		const tex = mat.map;
		const texFolder = folder.addFolder('Map');
		texFolder
			.add(tex.repeat, 'x', -10, 10, 0.1)
			.name('Repeat X');
		texFolder
			.add(tex.repeat, 'y', -10, 10, 0.1)
			.name('Repeat Y');
		texFolder
			.add(tex.offset, 'x', -1, 1, 0.0001)
			.name('Offset X');
		texFolder
			.add(tex.offset, 'y', -1, 1, 0.0001)
			.name('Offset Y');
		texFolder
			.add(tex, 'rotation', 0, Math.PI * 2, 0.01)
			.name('Rotación');
	}

	// Bump map / normal map scales
	if (mat.bumpMap) {
		folder
			.add(mat, 'bumpScale', -2, 2, 0.01)
			.name('Bump Scale');
	}
	if (mat.normalMap) {
		folder
			.add(mat.normalScale, 'x', -2, 2, 0.01)
			.name('Normal Scale X');
		folder
			.add(mat.normalScale, 'y', -2, 2, 0.01)
			.name('Normal Scale Y');
	}

	// Displacement map scale
	if (mat.displacementMap) {
		folder
			.add(mat, 'displacementScale', -1, 1, 0.001)
			.name('Disp. Scale');
	}

	// Transparencia y opacidad
	folder
		.add(mat, 'transparent')
		.name('Transparent');
	folder
		.add(mat, 'opacity', 0, 1, 0.01)
		.name('Opacity');

	// Wireframe
	folder
		.add(mat, 'wireframe')
		.name('Wireframe');
	folder
		.add(mat, 'wireframeLinewidth', 0, 10, 0.1)
		.name('Wireframe Width');

	// Tone mapping
	folder
		.add(mat, 'toneMapped')
		.name('Tone Mapped');

}


const methodCopy = (data = {}) => {
	const stringData = JSON.stringify(data, null, 2);
	navigator.clipboard
		.writeText(stringData)
		.then(() => {
			console.log("Copiado", stringData);
		})
		.catch((error) => {
			console.error("Error al copiar las variables:", error);
		});
};

export const meshListGui = (meshes) => {
	if (!meshes) return;

	const folderMesh = gui.addFolder(meshes.name || "Mesh");
	folderMesh.open()
	folderMesh.add(meshes.position, "x").step(0.0001).name("P: X").listen();
	folderMesh.add(meshes.position, "y").step(0.0001).name("P: Y").listen();
	folderMesh.add(meshes.position, "z").step(0.0001).name("P: Z").listen();
	// Rotation
	folderMesh.add(meshes.rotation, "x").step(0.0001).name("R: X").listen();
	folderMesh.add(meshes.rotation, "y").step(0.0001).name("R: Y").listen();
	folderMesh.add(meshes.rotation, "z").step(0.0001).name("R: Z").listen();
	// Scale
	folderMesh.add(meshes.scale, "x").step(0.0001).name("S: X").listen();
	folderMesh.add(meshes.scale, "y").step(0.0001).name("S: Y").listen();
	folderMesh.add(meshes.scale, "z").step(0.0001).name("S: Z").listen();
	// Copy
	folderMesh.add({
		copy: () => methodCopy({
			name: meshes.name,
			position: meshes.position,
			rotation: meshes.rotation,
			scale: meshes.scale,
		})
	}, "copy").name("Copy");
}