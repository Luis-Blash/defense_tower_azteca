import { LinearToneMapping, LoadingManager, PMREMGenerator } from 'three';
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import hdri from "@assets/hdri/provence_studio_1k.hdr"


export default class ManagerHDRI {

    constructor({ renderer }) {
        this.loadingManager = new LoadingManager();
        this.renderer = renderer
    }

    onLoadingHDRI() {
        // console.log('-- init loading hdri --');
        const loderhdr = new RGBELoader(this.loadingManager);
        loderhdr.load(hdri, (texture) => {
            // console.log('-- loading hdri --');
            const pmremGenerator = new PMREMGenerator(this.renderer);
            var envMap = pmremGenerator.fromEquirectangular(texture).texture;

            this.environmentToScenes = envMap;

            texture.dispose();
            pmremGenerator.dispose();
        });
        this.renderer.toneMapping = LinearToneMapping;
        this.renderer.toneMappingExposure = 0.7;
    }

    getEnvironmentToScenes(){
        console.log('hola', this.environmentToScenes);
        
        return this.environmentToScenes
    }
}