import { useCallback, useEffect, useState } from "react"
import ObserverEmitter, { EVENTS } from "@services/Observer"

const useUi = () => {

    const [start, setStart] = useState(false)
    const [resetCooldown, setResetCooldown] = useState(false)

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

        return () => {
            ObserverEmitter.off(EVENTS.listen.resetCooldown)
        }
    }, [])


    return {
        start,
        resetCooldown,
        handleStart,
        handleTower
    }
}

export default useUi