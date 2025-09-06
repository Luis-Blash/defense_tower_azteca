import { useState } from "react"
import ObserverEmitter, { EVENTS } from "@services/Observer"
import Button from "./Button"
import Header from "./Header"
import ContainerGame from "./ContainerGame"

const WrapperUI = ({ children }) => {

  const [start, setStart] = useState(false)
  const [resetCooldown, setResetCooldown] = useState(false)

  const handleStart = () => {
    ObserverEmitter.emit(EVENTS.nivelOne.actionEmitter, { "action": "start", params: {} })
    setStart(true)
  }

  ObserverEmitter.on(EVENTS.listen.resetCooldown, () => {
    setResetCooldown(true)
  })

  const handleTower = () => {    
    ObserverEmitter.emit(EVENTS.nivelOne.actionEmitter, { "action": "tower", params: {} })
    setResetCooldown(false)
  }

  return (
    <div className='w-dvw h-dvh relative bg-[#E7D5A1]'>
      <Header />

      <main className="w-dvw h-[calc(100%-250px)] relative">
        {children}
        <div className={`${start && 'hidden'} absolute z-20 bottom-5 left-1/2 -translate-x-1/2`}>
          <Button onClick={handleStart} text="Start" />
        </div>
        <div className={`${!start && 'hidden'} absolute z-20 bottom-5 left-1/2 -translate-x-1/2 w-full`}>
          <ContainerGame
            startGame={start}
            resetCooldown={resetCooldown}
            handleTower={handleTower}
          />
        </div>
      </main>


      <footer className="w-dvw h-[100px] bg-[#000000] text-white text-[14px] flex justify-center items-center">
        <p>blasshnest</p>
      </footer>
    </div>
  )
}

export default WrapperUI