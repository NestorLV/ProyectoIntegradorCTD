
import Styles from "./Styles.module.css"
import { Link } from "react-router-dom"

export default function ProductModalSucceed ({title, message, closeModal, icon}){
    console.log(icon, "icon");
    return (
        <div className={Styles.containerCreateModal}>
            <div className={icon === "X" ? Styles.cruz : null}> {icon === "X"? icon : <img src={icon} alt="icon"/>}</div>
            <h3 >{title}</h3>
            <p>{message}</p>
            <Link to="/" onClick={closeModal}><button>Ok</button></Link>
        </div>
    )
}