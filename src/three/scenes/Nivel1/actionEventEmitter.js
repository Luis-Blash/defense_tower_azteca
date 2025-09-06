const resetCooldown = ({ scene = null }) => {
    scene.getSystem("gameObserver").emit("listen.resetCooldown", { action: "start" })
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
            resetCooldown({ scene })
            break;
        default:
            break;
    }
}
