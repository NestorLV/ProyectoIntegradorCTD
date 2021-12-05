import tildeOk from "../icons/tildeOk.svg"
import Styles from "./Styles.module.css"
import { Link } from "react-router-dom"

export default function ConfirmProductModal ({accion, crearProducto, closeModalConfirm}){
    
    return (
        <div className={Styles.containerCreateModal}>
            <div className={Styles.question}>?</div>
            <p>¿Está seguro que desea {accion} el producto?</p>
            <button className={Styles.ok} onClick={crearProducto}>Ok</button>
            <button className={Styles.cancel} onClick={closeModalConfirm}>Cancelar</button>
        </div>
    )
}