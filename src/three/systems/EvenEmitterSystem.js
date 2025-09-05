import BaseSystem from "@three/base/BaseSystem";
import ObserverEmitter from "@services/Observer";

export default class EvenEmitterSystem extends BaseSystem {
    constructor(actionEmitter) {
        super()
        this.actionEmitter = actionEmitter
        this.acitionRegister = () => {}
    }

    callActionEmitter(data) {
        const { action = "", params = {} } = data
        this.acitionRegister({ action, params })
    }

    setActionRegister(callback) {
       this.acitionRegister = callback
    }

    start() {
       ObserverEmitter.on(this.actionEmitter, this.callActionEmitter.bind(this))
    }

    dispose() {
        ObserverEmitter.off(this.actionEmitter, this.callActionEmitter.bind(this))
    }
}
