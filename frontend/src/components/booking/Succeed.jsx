import tildeOk from "./icons/tildeOk.svg"
import Styles from "./styles.module.css"
import { Link } from "react-router-dom"

export default function Succeed(){

    const handleClick = () =>{
        sessionStorage.removeItem("startDate");
        sessionStorage.removeItem("endDate")
    }

    return (
        <div className={Styles.containerSucceed}>
            <img src={tildeOk} alt="Tilde ok"/>
            <h3>¡Muchas gracias!</h3>
            <p>Su reserva se ha realizado con éxito</p>
            <Link to="/" onClick={handleClick} ><button>Ok</button></Link>
        </div>
    )
}