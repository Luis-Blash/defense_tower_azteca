import banner from "@assets/images/banner.png"

const Header = () => {
    return (
        <div className="w-full h-[150px] flex justify-center items-center">
            <div className="w-[248px] h-[87px] relative">
                <img className="w-full h-full object-contain absolute z-10 top-0 left-0" src={banner} alt="banner" />
                <div className="absolute z-20 top-0 left-0 w-full h-full text-[#E7D5A1] flex flex-col justify-center items-center text-[14px] font-montserrat font-bold">
                    <p>Aztec Defenders</p>
                    <p>of the</p>
                    <p>Templo Mayor</p>
                </div>
            </div>
        </div>
    )
}

export default Header