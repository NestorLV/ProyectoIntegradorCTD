import Styles from "./styles.module.css"

export default function FormBooking({errorBooking, name, setName, surname, setSurname, email, setEmail, city, setCity}) {

    const handleChangeName = (event) => {
        setName(event.target.value)
    }

    const handleChangeSurname = (event) => {
        setSurname(event.target.value)
    }

    const handleChangeEmail = (event) => {
        setEmail(event.target.value)
    }

    const handleChangeCity = (event) => {
        setCity(event.target.value)
    }

    return (
        <div className={`${Styles.containerForm}`}>
            <form>
                <div className={Styles.block}>
                    <div className={Styles.labelInputBooking}>
                        <label htmlFor="name">Nombre</label>
                        <input type="text" name="name" id="name" value={name} onChange={handleChangeName} required></input>
                    </div>
                    <div className={Styles.labelInputBooking}>
                        <label htmlFor="surname">Apellido</label>
                        <input type="text" name="surname" id="surname" value={surname} onChange={handleChangeSurname} required></input>
                    </div>
                </div>
                <div className={Styles.block}>
                    <div className={Styles.labelInputBooking}>
                        <label htmlFor="email">Correo electrónico</label>
                        <input type="email" name="email" id="email" value={email} onChange={handleChangeEmail} required/>
                    </div>
                    <div className={Styles.labelInputBooking}>
                        <label htmlFor="city">Ciudad de origen</label>
                        <input type="text" name="city" id="city" value={city} onChange={handleChangeCity} required></input>
                    </div>
                </div>
                <div className={Styles.containerErrorBooking}>{errorBooking?errorBooking:null}</div>
            </form>

        </div>
    )
}