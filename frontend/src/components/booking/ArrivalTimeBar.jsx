import Styles from "./styles.module.css"

export default function ArrivalTimeBar(){
    return(
        <div className={Styles.containerArrival}>
            <h3>Tu horario de llegada</h3>
            <div>
                <h4>Tu habitación va a estar lista para el check-in entre las 10:00 AM y las 11:00 PM</h4>
                <form>
                    <label>Indicá tu horario estimado de llegada</label>
                    <select name="time" required>
                        <option value="Seleccionar hora" selected disabled hidden>Seleccionar hora</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="12:00 AM">12:00 AM</option>
                        <option value="01:00 PM">01:00 PM</option>
                        <option value="02:00 PM">02:00 PM</option>
                        <option value="03:00 PM">03:00 PM</option>
                        <option value="04:00 PM">04:00 PM</option>
                        <option value="05:00 PM">05:00 PM</option>
                        <option value="06:00 PM">06:00 PM</option>
                        <option value="07:00 PM">07:00 PM</option>
                        <option value="08:00 PM">08:00 PM</option>
                        <option value="09:00 PM">09:00 PM</option>
                        <option value="10:00 PM">10:00 PM</option>
                        <option value="11:00 PM">11:00 PM</option>
                    </select>
                </form>
            </div>
        </div>
    )
}