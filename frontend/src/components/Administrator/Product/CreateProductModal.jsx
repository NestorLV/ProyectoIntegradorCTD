import tildeOk from "../icons/tildeOk.svg"
import Styles from "./Styles.module.css"
import { Link } from "react-router-dom"

export default function CreateProductModal (){

    
    return (
        <div className={Styles.containerCreateModal}>
            <img src={tildeOk} alt="Tilde ok"/>
            <h3>¡Creación exitosa!</h3>
            <p>Se ha creado el producto con exito</p>
            <Link to="/"><button>Ok</button></Link>
        </div>
    )
}