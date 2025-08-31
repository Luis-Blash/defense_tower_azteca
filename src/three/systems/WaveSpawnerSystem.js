import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";
import BaseSystem from "@three/base/BaseSystem";

export default class WaveSpawnerSystem extends BaseSystem {
  constructor({ scene, prototypes = {}, waves = [], pathWaypoints = [], goal = null }) {
    super();
    this.scene = scene;
    this.prototypes = prototypes;
    this.waves = waves;

    this.pathWaypoints = pathWaypoints;
    this.goal = goal;

    this.pool = {};
    this.timers = {};

    this.activeEntities = new Set();
  }
  start() {
    this.waves.forEach(w => (this.timers[w.name] = { elapsed: 0, spawned: 0 }));
  }

  update(delta) {

    this.waves.forEach((w, index) => {
      const t = this.timers[w.name];
      t.elapsed += delta * 1000;
      if (t.spawned < w.maxEnemies && t.elapsed >= w.spawnInterval) {
        t.elapsed = 0; t.spawned++;
        this._spawnEnemy(w, index);
      }
    });

    this.activeEntities.forEach((entity) => {
      entity.entity.update(delta);
    });
  }

  _spawnEnemy(wave, index) {
    const randomIndex = Math.floor(Math.random() * wave.enemiesTypes.length);
    const type = wave.enemiesTypes[randomIndex];
    const protoKey = type.EnemyClass.name;
    const proto = this.prototypes[protoKey];
    if (!proto) return;

    const protoModel = proto.getComponent("model").getModelInstance();
    const protoGLTF = proto.getComponent("model").getGLTF();

    const cloneEntity = new type.EnemyClass({ ...type.config });

    // Asignar modelo clonado
    cloneEntity.getComponent("model").modelInstance = SkeletonUtils.clone(protoModel);
    cloneEntity.getComponent("model").gltf = protoGLTF;
    cloneEntity.add(cloneEntity.getComponent("model").getModelInstance());

    // Reinicializar mixer con modelo clonado
    const animComp = cloneEntity.getComponent("animation");
    animComp.initMixer(
      cloneEntity.getComponent("model").getModelInstance(),
      protoGLTF?.animations
    );

    if (this.pathWaypoints.length > 0 && this.goal) {
      cloneEntity.getSystem("waypoint").setPath(this.pathWaypoints, this.goal);
    }

    animComp.play("walk");

    cloneEntity.getComponent("model").getModelInstance().position.set(0, -1, 0);
    cloneEntity.getComponent("model").getModelInstance().scale.set(2, 2, 2);

    this.scene.add(cloneEntity);
    this.activeEntities.add({ waveIndex: index, entity: cloneEntity });
  }


  setWaves(waves) {
    this.waves = waves;
  }

  setPathWaypoints(pathWaypoints) {
    this.pathWaypoints = pathWaypoints;
  }

  setPrototypes(prototypes) {
    this.prototypes = prototypes;
  }
}
