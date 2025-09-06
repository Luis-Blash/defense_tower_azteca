import banner from "@assets/images/banner.png";

const ContainerInfo = ({ children }) => {
    return (
        <div className='w-[150px] h-[80px] relative'>
            <img className="w-full h-full object-fill absolute z-10 top-0 left-0" src={banner} alt="banner" />
            <div className="absolute z-20 top-0 left-0 w-full h-full px-4 font-montserrat font-bold">
                {children}
            </div>
        </div>
    );
};

export default ContainerInfo;
