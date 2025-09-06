import ObserverEmitter, { EVENTS } from "@services/Observer"

const resetCooldown = () => {
    ObserverEmitter.emit(EVENTS.listen.resetCooldown)
}

const pushTower = ({ scene = null }) => {
    scene.getSystem("clickRespawn").setCanActivateTower(true)
}

const startGame = ({ scene = null }) => {
    scene.getSystem("waveSpawner").start()
}


export const actionsEventEmitter = ({ action = "", params = {}, scene = null }) => {    
    switch (action) {
        case "start":
            startGame({ scene })
            break;
        case "tower":
            pushTower({ scene })
            break;
        case "resetCooldown":
            resetCooldown()
            break;
        default:
            break;
    }
}
