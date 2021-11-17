import FormBooking from "./FormBooking"
import Styles from "./styles.module.css"
import StylesApp from "../../App.module.css"

export default function Booking() {
    return (
        <section className={`${Styles.containerPrincipal} ${StylesApp.delimiter}`}>
            <div className={`${StylesApp.delimiterChild}`}>
                <div className={`${Styles.barraIzq}`}>
                    <FormBooking />
                </div>
                <div className={Styles.barraDer}>

                </div>
            </div>
        </section>
    )
}