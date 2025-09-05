import banner from "@assets/images/banner.png"
import Button from "./Button"
import { useState } from "react"
import ObserverEmitter, { EVENTS } from "@services/Observer"

const WrapperUI = ({ children }) => {

  const [start, setStart] = useState(false)
  const handleStart = () => {
    ObserverEmitter.emit(EVENTS.nivelOne.actionEmitter, {"action": "start", params: {}})
    setStart(true)
  }

  return (
    <div className='w-dvw h-dvh relative bg-[#E7D5A1]'>
      <header className="w-dvw h-[150px] flex justify-center items-center">
        <div className="w-[248px] h-[87px] relative">
          <img className="w-full h-full object-contain absolute z-10 top-0 left-0" src={banner} alt="banner" />
          <div className="absolute z-20 top-0 left-0 w-full h-full text-white flex flex-col justify-center items-center text-[14px]">
            <p>Aztec Defenders</p>
            <p>of the</p>
            <p>Templo Mayor</p>
          </div>
        </div>
      </header>

      <main className="w-dvw h-[calc(100%-250px)] relative">
        {children}
        <div className={`${start && 'hidden'} absolute z-20 bottom-5 left-1/2 -translate-x-1/2`}>
          <Button onClick={handleStart} text="Start" />
        </div>
      </main>


      <footer className="w-dvw h-[100px] bg-[#000000] text-white text-[14px] flex justify-center items-center">
        <p>blasshnest</p>
      </footer>
    </div>
  )
}

export default WrapperUI