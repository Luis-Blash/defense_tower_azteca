


const startGame = ({ scene = null }) => {
    scene.getSystem("waveSpawner").start()
}


export const actionsEventEmitter = ({ action = "", params = {}, scene = null }) => {
    switch (action) {
        case "start":
            startGame({ scene })
            break;
        default:
            break;
    }
}
