import Styles from "./Styles.module.css"

export default function ConfirmProductModal ({accion, funcionProducto, closeModalConfirm}){    
    return (
        <div className={Styles.containerCreateModal}>
            <div className={Styles.question}>?</div>
            <p>¿Está seguro que desea {accion}?</p>
            <button className={Styles.ok} onClick={funcionProducto}>Ok</button>
            <button className={Styles.cancel} onClick={closeModalConfirm}>Cancelar</button>
        </div>
    )
}