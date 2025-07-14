import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const dracoHelperLoader = (loadingManager) => {
    let loader = new GLTFLoader(loadingManager);
    let dracoloader = new DRACOLoader();
    dracoloader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.5/");
    loader.setDRACOLoader(dracoloader);
    return loader
}