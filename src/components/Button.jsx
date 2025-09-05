
const Button = ({ onClick, text }) => {
    return (
        <div
            className="w-[166px] h-[66px] bg-[#5E3925] flex items-center justify-center text-white font-bold text-[24px] border-[2px] border-[#BD8B35] rounded-[30px] cursor-pointer"
            onClick={onClick}
        >
            <p>{text}</p>
        </div>
    )
}

export default Button