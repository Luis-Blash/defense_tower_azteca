
import RendererManager from "@three/core/manager/RendererManager";
import CameraManager from "@three/core/manager/CameraManager";
import ManagerHDRI from "@three/core/manager/ManagerHRI";
import SceneLoaderManager from "@three/core/manager/SceneLoaderManager";
import SceneChangueManager from "@three/core/manager/SceneChangueManager";
import ClockManager from "@three/core/manager/ClockManager";

import CameraController from "@three/entities/CameraDefault";

import StatsManager from "@three/utils/StatsManager";
import TransformControlsHelper from "@three/utils/TransformControls";

export default class APPThree {
    constructor(container) {
        this.container = container;

        const cameraController = new CameraController({
            fov: 60,
            relation: container.clientWidth / container.clientHeight,
            near: 0.1,
            far: 500,
            container,
        })

        //? Managers
        this.clockManager = new ClockManager();
        this.rendererManager = new RendererManager(container);
        this.cameraManager = new CameraManager({
            cameraController: cameraController
        });
        this.hdri = new ManagerHDRI({
            renderer: this.rendererManager.getRenderer()
        })

        //? Utils
        this.statsManager = new StatsManager({ disabled: true });
        this.transformControlsHelper = new TransformControlsHelper({
            camera: this.cameraManager.getCamera(),
            hidden: false,
            domElement: container
        });
        this.transformControlsHelper.setup(this.render.bind(this), this.cameraManager.getCamera());

        this.setup()
    }

    setup() {
        this.hdri.onLoadingHDRI()

        this.hdri.loadingManager.onLoad = () => {

            //? SceneLoader de la scene general y quien le pasa los props a las sceneas
            this.sceneLoaderManager = new SceneLoaderManager({
                camera: this.cameraManager.getCamera(),
                hdri: this.hdri.environmentToScenes,
                renderer: this.rendererManager.getRenderer(),
                container: this.container,
                transformControlsHelper: this.transformControlsHelper,
            })

            //? maneja el cambio de scena nada mas
            this.sceneChangueManager = new SceneChangueManager({
                camera: this.cameraManager.getCamera(),
                renderer: this.rendererManager.getRenderer(),
                container: this.container,
                sceneLoader: this.sceneLoaderManager
            });

            //? eventos
            this.onResized();
            window.addEventListener("resize", this.onResized.bind(this), { passive: true });
            window.addEventListener("orientationchange", this.onResized.bind(this), { passive: true });

            //? Cambia la escena inicial
            this.sceneChangueManager.changeScene({
                sceneName: "nivel1",
                sceneParams: { activity: 1 },
                callback: () => {
                    this.render();
                }
            });
        }
    }

    onResized() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        this.rendererManager.setSize(width, height);
        this.cameraManager.updateAspect(width, height);
    }

    render() {
        this.clockManager.update();
        if (this.clockManager.isUpdate()) {
            this.sceneChangueManager.renderScene(this.clockManager.getDelta());
            this.statsManager.update();
            this.cameraManager.update(this.clockManager.getDelta());
            this.clockManager.updateDelta();
        }

        this.rendererManager.getRenderer().setAnimationLoop(() => this.render());

    }

    cleanup() { }
}