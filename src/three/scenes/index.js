// scenesIndex.js
import TemplateScene from './Template';

const scenesIndex = {
    "testScene": TemplateScene,
};

export const getSceneClass = (sceneName) => {
    return scenesIndex[sceneName] || TemplateScene
}