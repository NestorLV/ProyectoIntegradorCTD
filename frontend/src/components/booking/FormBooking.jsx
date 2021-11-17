import Styles from "./styles.module.css"


export default function FormBooking(){
    return(
        <div className={Styles.formBooking}>
            <h2>Completá tus datos</h2>
            <form>
                <div>
                    <label>Nombre</label>
                    <input type="text" name="name" id="name" disabled></input>
                </div>
                <div>
                    <label>Apellido</label>
                    <input type="text" name="surname" id="surname" disabled></input>
                </div>
                <div>
                <label htmlFor="email">Correo electrónico</label>
                    <input type="email" name="email" id="email" disabled/>
                </div>
                <div>
                    <label>Ciudad</label>
                    <input type="text" name="surname" id="surname" required></input>
                </div>
            </form>
        </div>
    )
}