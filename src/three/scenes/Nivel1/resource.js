import { AmbientLight, Vector3 } from "three";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";


import GolemModel from "@assets/models/Golem6.glb";
import WarriorModel from "@assets/models/Guerrero5.glb";
import MapSceneModel from "@assets/models/Escenario1.glb";
import PyramidModel from "@assets/models/Piramide4.glb";
import QuetzalcoatlModel from "@assets/models/Quetzalcoatl12.glb";

import Pyramid from "@three/entities/pyramid/Pyramid";
import Golem from "@three/entities/enemy/Golem";
import Warrior from "@three/entities/enemy/Warrior";
import Waypoint from "@three/entities/waypoint/Waypoint";
import MapScene from "@three/entities/maps/MapScene";
import Quetzalcoatl from "@three/entities/towers/Quetzalcoatl";
import Projectile from "@three/entities/projectile/Projectile";
// import DebugMeshComponent from "@three/components/DebugMeshComponent";


export const createResourcesEntities = ({ loadingManager }) => {
    const pyramid = new Pyramid({ name: "Pyramid", loadingManager, modelPath: PyramidModel })
    pyramid.position.set(-20, 0, 0)
    pyramid.getComponent("model").addOnModelReadyCallback(() => {
        const mesh = pyramid.getComponent("model").getModelInstance();
        mesh.scale.set(6, 6, 6);
        mesh.rotation.set(0, Math.PI / 2, 0);
        mesh.position.set(-5, -2, 0);
    });

    const prototypeGolem = new Golem({ name: "GolemProto", speed: 10, modelPath: GolemModel, loadingManager });
    prototypeGolem.visible = false;

    const prototypeWarrior = new Warrior({ name: "WarriorProto", speed: 10, modelPath: WarriorModel, loadingManager });
    prototypeWarrior.position.set(2, 0, 0)
    prototypeWarrior.visible = false;

    const mapScene = new MapScene({ name: "MapScene", loadingManager, modelPath: MapSceneModel });
    mapScene.visible = true;
    mapScene.getComponent("model").addOnModelReadyCallback(() => {
        const mesh = mapScene.getComponent("model").getModelInstance();
        mesh.position.set(0, -2, 0);
    });

    const prototypeQuetzalcoatl = new Quetzalcoatl({ name: "Quetzalcoatl", loadingManager, modelPath: QuetzalcoatlModel });
    prototypeQuetzalcoatl.visible = false;

    return {
        pyramid,
        mapScene,
        prototypeGolem,
        prototypeWarrior,
        prototypeQuetzalcoatl
    }
}

export const createLight = () => {
    const ambient = new AmbientLight();
    ambient.color.set(0xffffff);
    ambient.intensity = 1;
    return ambient
}


export const configLevel1 = () => {
    const pathWaypoints = []
    const waypoints = [
        { position: new Vector3(21.387181533518756, 0, -3) },
        { position: new Vector3(10.513843791318756, 0, -6.018776605171061) },
        { position: new Vector3(4.8242464675604175, 0, 0.7550528217102155) },
        { position: new Vector3(-2.299838995023798, 0, 5) },
        { position: new Vector3(-10, 0, 0) },
    ];

    waypoints.forEach((wp, index) => {
        const waypoint = new Waypoint({
            name: "Waypoint",
            id: index,
            position: wp.position
        })
        // waypoint.addComponent("debug", new DebugMeshComponent({ color: 0xff0000, size: 1, segments: [10, 6], visible: true }))
        pathWaypoints.push(waypoint)
    })

    const waves = [
        {
            name: "wave_1",
            spawnInterval: 3000,
            maxEnemies: 3,
            enemiesTypes: [
                { EnemyClass: Golem, config: { speed: 1.5, life: 120 } },
                { EnemyClass: Warrior, config: { speed: 3, life: 100 } },
            ]
        }
    ]

    return {
        pathWaypoints,
        waves
    }
}

export const createClickTower = (prototypeQuetzalcoatl, position, projectileRespawnSystem) => {

    const protoModel = prototypeQuetzalcoatl.getComponent("model").getModelInstance();
    const protoGLTF = prototypeQuetzalcoatl.getComponent("model").getGLTF()
    

    const tower = new Quetzalcoatl({ name: "Quetzalcoatl", radius: 8,damage: 20, debugRange: false });
    tower.position.set(position.x, 0, position.z);
    tower.getComponent("model").modelInstance = SkeletonUtils.clone(protoModel);
    tower.getComponent("model").gltf = protoGLTF;
    tower.add(tower.getComponent("model").getModelInstance());
    const animComp = tower.getComponent("animation");
    animComp.initMixer(
      tower.getComponent("model").getModelInstance(),
      protoGLTF?.animations
    );
    tower.getComponent("model").getModelInstance().position.set(0, -1, 0);
    tower.getComponent("model").getModelInstance().scale.set(2, 2, 2);
    tower.getSystem("attack").setActionProjectiles(({entity, target}) => {
        projectileRespawnSystem.addProjectile({ProjectileClass: Projectile, entity, target})
    })
    return tower
}


