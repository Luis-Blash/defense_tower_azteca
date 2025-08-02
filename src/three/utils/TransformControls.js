import { TransformControls } from "three/examples/jsm/controls/TransformControls";


const buttons = {
    translate: '1',
    rotate: '2',
    scale: '3',
    space: 'Alt',
    enable: ' ',
    reset: '0'
}


const domInstruction = ({ isActive = false, space = "world" }) => {
    const instructions = document.createElement("div");
    instructions.id = "instructions_transformControls";
    instructions.style.cssText = `
        padding: 16px;
        position: fixed;
        z-index: 50;
        bottom: 0;
        right: 0;
        background-color: #000000;
        opacity: 0.5;
        display: flex;
        gap: 4px;
        color: #ffffff;
        font-size: 10px;
        `;

    instructions.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 4px;">
        <p>Transform Controls</p>
        <p>Translate: ${buttons.translate}</p>
        <p>Rotate: ${buttons.rotate}</p>
        <p>Scale: ${buttons.scale}</p>
        <p id="space_transform">Space: ${buttons.space} ${space === "local" ? "Local" : "World"} </p>
        <p id="enable_transform">Enable: Espacio ${isActive ? 'ON' : 'OFF'}  </p>
        <p>Reset: ${buttons.reset}</p>
    </div>
    `;

    document.body.appendChild(instructions);
}

export default class TransformControlsHelper {
    constructor({ hidden = false, camera, domElement }) {
        this.transformControls = new TransformControls(camera, domElement);
        this.currentMesh = null;

        this.transformControls.enabled = false;
        if (!hidden) {
            domInstruction({ isActive: this.transformControls.enabled })
            this.keyboardControls();
        }
    }

    keyboardControls() {
        window.addEventListener('keydown', (event) => {

            switch (event.key) {
                // translate
                case buttons.translate:
                    this.transformControls.setMode('translate');
                    break;
                // rotate
                case buttons.rotate:
                    this.transformControls.setMode('rotate');
                    break;
                // scale
                case buttons.scale:
                    this.transformControls.setMode('scale');
                    break;
                // space
                case buttons.space:
                    this.transformControls.setSpace(
                        this.transformControls.space === 'local' ? 'world' : 'local'
                    );
                    document.getElementById('space_transform').textContent = `Space: ${buttons.space} ${this.transformControls.space === 'local' ? 'Local' : 'World'}`;
                    break;
                case buttons.enable:
                    this.transformControls.enabled = !this.transformControls.enabled;
                    document.getElementById('enable_transform').textContent = `Enable: Espacio ${this.transformControls.enabled ? 'ON' : 'OFF'}`;
                    break;
                // reset
                case buttons.reset:
                    this.transformControls.reset();
                    break;
            }
        });
    }

    setup(render, orbitControls) {

        this.transformControls.addEventListener('change', () => {
            render()
            if (!this.currentMesh || !this.currentMesh.body) return;

            const { position, quaternion } = this.currentMesh;
            this.currentMesh.body.setTranslation({ x: position.x, y: position.y, z: position.z }, true);
            this.currentMesh.collider.setTranslation({ x: position.x, y: position.y, z: position.z });
            this.currentMesh.collider.setRotation({ x: quaternion.x, y: quaternion.y, z: quaternion.z, w: quaternion.w });
            // scale si se tiene que re hacer
        });
        this.transformControls.addEventListener('dragging-changed', (event) => {
            if (event.value) {
                orbitControls.disabledOrbitControls();
            } else {
                orbitControls.enabledOrbitControls();
            }
        });
    }

    addMesh(mesh, scene) {
        this.transformControls.attach(mesh);
        const gizmo = this.transformControls.getHelper();
        scene.add(gizmo);
        this.currentMesh = mesh;
    }
}
