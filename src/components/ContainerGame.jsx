import ContainerInfo from "./ContainerInfo"
import CooldownBar from "./CooldownBar"

const ContainerGame = ({startGame = false, resetCooldown = false, handleTower = () => {}}) => {
    return (
        <div className='w-full xl:w-[166px] px-6 h-[80px] flex items-center justify-between'>
            <ContainerInfo>
               <CooldownBar startGame={startGame} resetCooldown={resetCooldown} handleTower={handleTower} />
            </ContainerInfo>
            <ContainerInfo>
                <div className="w-full h-full py-2 flex flex-col items-center justify-center gap-1 text-white font-semibold text-[14px]">
                    <p>Enemies total</p>
                    <p>3</p>
                </div>
            </ContainerInfo>
        </div>
    )
}

export default ContainerGame