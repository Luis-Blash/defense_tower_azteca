import BaseActivityScene from "@three/base/BaseActivityScene"
import { configLevel1 } from "./resource";

export default class Level1Activity extends BaseActivityScene {
    constructor(scene, config = {}) {
        super(scene, config)
        this.isActive = false
    }
    
    start() {
        this.isActive = true
        
        const {
            pathWaypoints,
            waves
        } = configLevel1()

        pathWaypoints.forEach((waypoint) => {
            this.scene.add(waypoint)
        })

        this.scene.getSystem("waveSpawner").setPathWaypoints(pathWaypoints)
        this.scene.getSystem("waveSpawner").setWaves(waves)
        this.scene.getSystem("waveSpawner").start()

        this.scene.getSystem("mouseEvents").setClickObject("Escenario1")
        this.scene.getSystem("mouseEvents").setCallBackIntersect(({ intersects, objectClickByName }) => {
            const intersection = intersects[0];
            const clickedObject = intersection.object;

            if (objectClickByName.includes(clickedObject.name)) {
                const clickPoint = intersection.point;
               console.log(clickPoint);
            }
        })
        
    }
    
    update(delta) {
        if (!this.isActive) return
        this.scene.getSystem("waveSpawner").update(delta)        
    }
    
    dispose() {
        console.log('dispose level 1');
        this.isActive = false
    }
}