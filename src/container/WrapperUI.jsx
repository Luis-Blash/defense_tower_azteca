import Button from "@presentation/Button"
import Header from "@presentation/Header"
import Footer from "@presentation/Footer"
import ModalGameOver from "@presentation/ModalGameOver"
import ContainerInfo from "@presentation/ContainerInfo"
import CooldownBar from "./CooldownBar"

import useUi from "@hooks/useUi"

const WrapperUI = ({ children }) => {

  const {
    start,
    gameOver,
    enemies,
    resetCooldown,
    handleStart,
    handleTower,
    handleGameOver
  } = useUi()

  return (
    <div className='w-full h-full relative bg-[#E7D5A1]'>
      <ModalGameOver onClick={handleGameOver} visible={gameOver}/>
      <Header />
      <div className="w-full h-[calc(100%-250px)] relative">
        {children}
        {/* button start */}
        <div className={`${start && 'hidden'} absolute z-20 bottom-5 left-1/2 -translate-x-1/2`}>
          <Button onClick={handleStart} text="Start" />
        </div>
        {/* container info */}
        <div className={`${!start && 'hidden'} absolute z-20 bottom-5 left-1/2 -translate-x-1/2 w-full`}>
          <div className='w-full px-6 h-[80px] flex items-center justify-between xl:justify-center xl:gap-20'>
            <ContainerInfo>
              <CooldownBar startGame={start} resetCooldown={resetCooldown} handleTower={handleTower} />
            </ContainerInfo>
            <ContainerInfo>
              <div className="w-full h-full py-2 flex flex-col items-center justify-center gap-1 text-white font-semibold text-[12px]">
                <p>Enemies total</p>
                <p>{enemies} / 3</p>
              </div>
            </ContainerInfo>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default WrapperUI