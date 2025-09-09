import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";
import BaseSystem from "@three/base/BaseSystem";
import SelectiveObserverSystem from "./EvenEmitterSystem";
import HealthBarComponent from "@three/components/HealthBarComponent";

export default class WaveSpawnerSystem extends BaseSystem {
  constructor({ scene, prototypes = {}, waves = [], pathWaypoints = [], goal = null }) {
    super();
    this.isActive = false;
    this.scene = scene;
    this.prototypes = prototypes;
    this.waves = waves;

    this.pathWaypoints = pathWaypoints;
    this.goal = goal;

    this.pool = {};
    this.timers = {};

    this.activeEntities = new Set();

    this.eliminatedEntities = 0;
  }

  start() {
    if (this.waves.length === 0) return;
    this.isActive = true;
    this.waves.forEach(w => (this.timers[w.name] = { elapsed: 0, spawned: 0 }));
  }

  gameover() {
    this.isActive = false;
    this.eliminatedEntities = 0;
    this.scene.getSystem("gameObserver").emit("listen.gameOver")
  }

  resetGame() {
    this.eliminatedEntities = 0;
    this.activeEntities.clear();
  }

  update(delta) {
    if (!this.isActive) return;

    this.waves.forEach((w, index) => {
      const t = this.timers[w.name];
      t.elapsed += delta * 1000;
      if (t.spawned < w.maxEnemies && t.elapsed >= w.spawnInterval) {
        t.elapsed = 0; t.spawned++;
        this._spawnEnemy(w, index);
      }
    });

    const entitiesToRemove = [];

    this.activeEntities.forEach((entityWrapper) => {
      const entity = entityWrapper.entity;
      if (entity.active) {
        entity.update(delta);
      } else {
        entitiesToRemove.push(entityWrapper);
      }
    });

    entitiesToRemove.forEach((entityWrapper) => {
      const entity = entityWrapper.entity;      
      this.scene.remove(entity);
      this.activeEntities.delete(entityWrapper);
      this.eliminatedEntities++;
    });

    if(this.eliminatedEntities === 3){
      this.gameover();
    }

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

    cloneEntity.addSystem("gameObserver", new SelectiveObserverSystem())
    cloneEntity.getSystem("gameObserver")
      .setEmitEvents([
        "listen.getEnemies",
      ])
      .start()

    cloneEntity
      .getSystem("gameObserver")
      .emit("listen.getEnemies", 1)

    cloneEntity.getComponent("healthBar").setCameraAndRenderer(this.scene.camera, this.scene.render)
    cloneEntity.getComponent("healthBar").createHealthBar()

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

  getActiveEntities() {
    const entities = [];
    this.activeEntities.forEach((entity) => {
      entities.push(entity.entity);
    });
    return entities;
  }
}
