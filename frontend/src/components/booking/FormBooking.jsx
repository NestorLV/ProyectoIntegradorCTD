import Styles from "./styles.module.css"

export default function FormBooking() {
    return (
        <div className={`${Styles.containerForm}`}>
            <form>
                <div className={Styles.block}>
                    <div className={Styles.labelInput}>
                        <label htmlFor="name">Nombre</label>
                        <input type="text" name="name" id="name"></input>
                    </div>
                    <div className={Styles.labelInput}>
                        <label htmlFor="surname">Apellido</label>
                        <input type="text" name="surname" id="surname" ></input>
                    </div>
                </div>
                <div className={Styles.block}>
                    <div className={Styles.labelInput}>
                        <label htmlFor="email">Correo electrónico</label>
                        <input type="email" name="email" id="email"/>
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