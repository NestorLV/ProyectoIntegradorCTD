import tildeOk from "../icons/tildeOk.svg"
import Styles from "./Styles.module.css"
import { Link } from "react-router-dom"

export default function CreateProductModal ({title, message}){

    
    
    return (
        <div className={Styles.containerCreateModal}>
            <img src={tildeOk} alt="Tilde ok"/>
            <h3 >{title}</h3>
            <p>{message}</p>
            <Link to="/"><button>Ok</button></Link>
        </div>
    )
}