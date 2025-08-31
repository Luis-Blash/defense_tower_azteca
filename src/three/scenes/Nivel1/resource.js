import { AmbientLight, Vector3 } from "three";

import GolemModel from "@assets/models/Golem6.glb";
import WarriorModel from "@assets/models/Guerrero5.glb";

import DebugMeshSystem from "@three/systems/DebugMeshSystem";

import Pyramid from "@three/entities/pyramid/Pyramid";
import Golem from "@three/entities/enemy/Golem";
import Warrior from "@three/entities/enemy/Warrior";
import Waypoint from "@three/entities/Waypoint/Waypoint";


export const createResourcesEntities = ({ loadingManager }) => {
    const pyramid = new Pyramid({ name: "Pyramid", position: new Vector3(-20, 0, 0) })
    pyramid.addSystem("debug", new DebugMeshSystem({ color: 0xcc0000, visible: true, size: 1.5 }));

    const prototypeGolem = new Golem({ name: "GolemProto", speed: 10, modelPath: GolemModel, loadingManager });
    prototypeGolem.visible = false;

    const prototypeWarrior = new Warrior({ name: "WarriorProto", speed: 10, modelPath: WarriorModel, loadingManager });
    prototypeWarrior.position.set(2, 0, 0)
    prototypeWarrior.visible = false;

    return {
        pyramid,
        prototypeGolem,
        prototypeWarrior
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
        { position: new Vector3(8, 0, -3) },
        { position: new Vector3(5, 0, 2) },
        { position: new Vector3(0, 0, 5) },
        { position: new Vector3(-5, 0, 5) },
        { position: new Vector3(-10, 0, 0) },
    ];

    waypoints.forEach((wp, index) => {
        const waypoint = new Waypoint({
            name: "Waypoint",
            id: index,
            position: wp.position
        })
        waypoint.addSystem("debug", new DebugMeshSystem({ color: 0x00ff00, visible: true, size: 1 }));
        pathWaypoints.push(waypoint)
    })

    const waves = [
        {
            name: "wave_1",
            spawnInterval: 3000,
            maxEnemies: 3,
            enemiesTypes: [
                { EnemyClass: Golem, config: { speed: 3, life: 200 } },
                { EnemyClass: Warrior, config: { speed: 5, life: 100 } },
            ]
        }
    ]

    return {
        pathWaypoints,
        waves
    }
}