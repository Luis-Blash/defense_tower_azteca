import { useCallback, useEffect, useState } from "react"
import ObserverEmitter, { EVENTS } from "@services/Observer"

const useUi = () => {

    const [start, setStart] = useState(false)
    const [resetCooldown, setResetCooldown] = useState(false)
    const [enemies, setEnemies] = useState(0)

    const handleStart = useCallback(
        () => {
            ObserverEmitter.emit(EVENTS.nivelOne.actionEmitter, { "action": "start", params: {} })
            setStart(true)
        },
        [],
    )

    const handleTower = useCallback(
        () => {
            ObserverEmitter.emit(EVENTS.nivelOne.actionEmitter, { "action": "tower", params: {} })
            setResetCooldown(false)
        },
        [],
    )

    useEffect(() => {
        
        ObserverEmitter.on(EVENTS.listen.resetCooldown, () => {
            setResetCooldown(true)
        })

        ObserverEmitter.on(EVENTS.listen.getEnemies, (value = 0) => {
            setEnemies(prev => prev + value)
        })

        return () => {
            ObserverEmitter.off(EVENTS.listen.resetCooldown)
            ObserverEmitter.off(EVENTS.listen.getEnemies)
        }
    }, [])


    return {
        start,
        resetCooldown,
        enemies,
        handleStart,
        handleTower
    }
}

export default useUi