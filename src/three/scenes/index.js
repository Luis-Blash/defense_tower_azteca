// scenesIndex.js
import TemplateScene from './Template';
import SceneOne from './SceneOne';

const scenesIndex = {
    "testScene": TemplateScene,
    "sceneOne": SceneOne,
};

export const getSceneClass = (sceneName) => {
    return scenesIndex[sceneName] || TemplateScene
}