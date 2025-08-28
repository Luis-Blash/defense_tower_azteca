// scenesIndex.js
import TemplateScene from './Template';
import Nivel1 from './Nivel1';

const scenesIndex = {
    "testScene": TemplateScene,
    "nivel1": Nivel1,
};

export const getSceneClass = (sceneName) => {
    return scenesIndex[sceneName] || TemplateScene
}