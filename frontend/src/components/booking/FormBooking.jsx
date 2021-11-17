import Styles from "./styles.module.css"

import StylesApp from "../../App.module.css"

export default function FormBooking() {
    return (
        <div className={`${Styles.containerForm}`}>
            <h3>Completá tus datos</h3>
            <form>
                <div className={Styles.block}>
                    <div className={Styles.labelInput}>
                        <label>Nombre</label>
                        <input type="text" name="name" id="name" disabled></input>
                    </div>
                    <div className={Styles.labelInput}>
                        <label>Apellido</label>
                        <input type="text" name="surname" id="surname" disabled></input>
                    </div>
                </div>
                <div className={Styles.block}>
                    <div className={Styles.labelInput}>
                        <label for="email">Correo electrónico</label>
                        <input type="email" name="email" id="email" disabled />
                    </div>
                    <div className={Styles.labelInput}>
                        <label>Ciudad</label>
                        <input type="text" name="surname" id="surname" required></input>
                    </div>
                </div>
            </form>

        </div>
    )
}