import fondo from "@assets/images/fondo_mex.png"

const ModalGameOver = ({ onClick, visible = false }) => {
  if (!visible) return null;

  return (
    <div className="absolute top-0 left-0 z-50 w-full h-full bg-[#00000087] flex items-center justify-center">
      <div
        className="relative w-[350px] h-[250px] bg-[#5e3925d2] rounded-[10px] overflow-hidden"
        style={{
          border: '15px solid transparent',
          borderImage: `url(${fondo}) 15 / 1 / 0 stretch`,
        }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <p
            className="text-[#BD8B35] uppercase font-montserrat font-bold text-[24px]"
            style={{ textShadow: '1px 1px 0 white, -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white' }}
          >
            Game Over
          </p>
          <div
            className="px-6 py-2 bg-[#5E3925] flex items-center justify-center text-white font-bold text-[16px] font-montserrat border-[2px] border-[#BD8B35] rounded-[30px] cursor-pointer"
            onClick={onClick}
          >
            <p>Retry</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalGameOver