import Styles from "./styles.module.css"

export default function FormBooking() {
    return (
        <div className={`${Styles.containerForm}`}>
            <form>
                <div className={Styles.block}>
                    <div className={Styles.labelInputBooking}>
                        <label htmlFor="name">Nombre</label>
                        <input type="text" name="name" id="name" value={sessionStorage.getItem("name")} required></input>
                    </div>
                    <div className={Styles.labelInputBooking}>
                        <label htmlFor="surname">Apellido</label>
                        <input type="text" name="surname" id="surname" value={sessionStorage.getItem("surname")} required></input>
                    </div>
                </div>
                <div className={Styles.block}>
                    <div className={Styles.labelInputBooking}>
                        <label htmlFor="email">Correo electrónico</label>
                        <input type="email" name="email" id="email" value={sessionStorage.getItem("email")} required/>
                    </div>
                    <div className={Styles.labelInputBooking}>
                        <label htmlFor="city">Ciudad</label>
                        <input type="text" name="city" id="city" required></input>
                    </div>
                </div>
            </form>

        </div>
    )
}