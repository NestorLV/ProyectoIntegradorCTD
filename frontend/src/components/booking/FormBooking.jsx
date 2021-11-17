import Styles from "./styles.module.css"

import StylesApp from "../../App.module.css"

export default function FormBooking() {
    return (
        <div className={`${Styles.containerForm}`}>
            <h3>Completá tus datos</h3>
            <form>
                <div className={Styles.block}>
                    <div className={Styles.labelInput}>
                        <label htmlFor="name">Nombre</label>
                        <input type="text" name="name" id="name" disabled></input>
                    </div>
                    <div className={Styles.labelInput}>
                        <label htmlFor="surname">Apellido</label>
                        <input type="text" name="surname" id="surname" disabled></input>
                    </div>
                </div>
                <div className={Styles.block}>
                    <div className={Styles.labelInput}>
                        <label htmlFor="email">Correo electrónico</label>
                        <input type="email" name="email" id="email" disabled />
                    </div>
                    <div className={Styles.labelInput}>
                        <label htmlFor="city">Ciudad</label>
                        <input type="text" name="city" id="city" required></input>
                    </div>
                </div>
            </form>

        </div>
    )
}