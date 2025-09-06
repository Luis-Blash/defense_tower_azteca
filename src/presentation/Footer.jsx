
import redGithub from "@assets/images/redGithub.png"
import redX from "@assets/images/redX.png"
import redLinkedin from "@assets/images/redLinkedin.png"


const IconRed = ({link, icon}) => {
    return (
        <div className="w-[30px] h-[30px]">
            <a href={link} target="_blank" rel="noopener noreferrer">
                <img className="w-full h-full object-contain" src={icon} alt="icon" />
            </a>
        </div>
    )
}

const Footer = () => {
    return (
        <div className="w-full h-[100px] bg-[#000000] text-white text-[14px] flex justify-between px-6 items-center font-montserrat font-bold">
            <div>
                <a href="https://blashnest.xyz" target="_blank" rel="noopener noreferrer">blashnest.xyz</a>
            </div>
            <div className="flex gap-2">
            <IconRed link="https://github.com/Luis-Blash" icon={redGithub}/>
            <IconRed link="https://x.com/blashdev" icon={redX}/>
            <IconRed link="https://www.linkedin.com/in/luis-enrique-ocampo-gonzalez/" icon={redLinkedin}/>
            </div>
        </div>
    )
}


export default Footer