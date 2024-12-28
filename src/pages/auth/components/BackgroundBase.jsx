import financial1 from "../../../assets/financial1.svg"
import imageRight from "../../../assets/right-financial.svg"
import logo from "../../../assets/logo.svg"

export function BackgroundBase() {
    return(
        <div >
            <img src={logo} alt="logo" className="w-[110px] h-[100px] object-contain" />
            <img src={financial1} alt="left-financial" className="w-[17px] h-[17px] object-contain"/>
            <img src={imageRight} alt="right-financial" className="w-[17px] h-[17px] object-contain"/>
        </div>

    )
}
