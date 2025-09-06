
import BaseSystem from "@three/base/BaseSystem";
import ObserverEmitter, { EVENTS } from "@services/Observer";

export default class SelectiveObserverSystem extends BaseSystem {
    constructor() {
        super()
        this.Events = EVENTS
        this.actionRegister = () => { }
        this.listenEvents = []
        this.emitEvents = []
        this.boundCallEvent = this.callEvent.bind(this)
    }

    setListenEvents(events = []) {
        this.listenEvents = events
        return this
    }

    setEmitEvents(events = []) {
        this.emitEvents = events
        return this
    }

    setActionRegister(callback) {
        this.actionRegister = callback
        return this
    }

    callEvent(data) {
        const { action = "", params = {} } = data
        this.actionRegister({ action, params })
    }

    start() {
        this.listenEvents.forEach(eventPath => {
            const eventName = this.getEventByPath(eventPath)
            if (eventName) {
                ObserverEmitter.on(eventName, this.boundCallEvent)
            } else {
                console.warn(`Evento no encontrado: ${eventPath}`)
            }
        })
        return this
    }

    emit(eventPath, data = {}) {
        if (!this.canEmit(eventPath)) {
            console.warn(`No tienes permisos para emitir: ${eventPath}`)
            return false
        }

        const eventName = this.getEventByPath(eventPath)
        if (eventName) {
            ObserverEmitter.emit(eventName, data)
            return true
        } else {
            console.warn(`Evento no encontrado para emitir: ${eventPath}`)
            return false
        }
    }

    canEmit(eventPath) {
        return this.emitEvents.includes(eventPath) || this.emitEvents.includes('*')
    }

    canListen(eventPath) {
        return this.listenEvents.includes(eventPath) || this.listenEvents.includes('*')
    }

    getEventByPath(eventPath) {
        const pathParts = eventPath.split('.')
        let current = this.Events

        for (const part of pathParts) {
            if (current[part]) {
                current = current[part]
            } else {
                return null
            }
        }

        return typeof current === 'string' ? current : null
    }

    // Lista todos los eventos disponibles
    getAvailableEvents() {
        const events = []
        this.extractEvents(this.Events, '', events)
        return events
    }

    // Método auxiliar para extraer eventos recursivamente
    extractEvents(obj, prefix, result) {
        for (const key in obj) {
            const currentPath = prefix ? `${prefix}.${key}` : key
            if (typeof obj[key] === 'string') {
                result.push(currentPath)
            } else if (typeof obj[key] === 'object') {
                this.extractEvents(obj[key], currentPath, result)
            }
        }
    }

    dispose() {
        this.listenEvents.forEach(eventPath => {
            const eventName = this.getEventByPath(eventPath)
            if (eventName) {
                ObserverEmitter.off(eventName, this.boundCallEvent)
            }
        })
    }
}