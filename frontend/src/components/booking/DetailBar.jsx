import Styles from "./styles.module.css"
import iconLocation from "../Cards/img/IconLocation.svg";
import ScoreStar from "../Product/ScoreStar";
import axios from "axios";

function DetailBar(props) {
    const { image, category, name, city, country, reference, qualification, checkin, checkout, arrivalSchedule } = props;
    const baseUrl="http://localhost:8080/";
    let cantStar = Math.floor(qualification / 2);

    const handleBooking = () => {
        /*axios
        .post(baseUrl + "products/scores/create", {
            "arrivalSchedule": arrivalSchedule,
            
        })
        .then((response) => {
            if (response.status === 200) {
                setCalificacion_text(`Se envió correctamente la puntuación de: ${starIndex}`);
            }
    
        })
        .catch((error) => {
            setErrorMessage(error);
        });*/
        console.log(arrivalSchedule);
    }

    return (
        <div className={Styles.detailBar}>
            <h2>Detalle de la Reserva</h2>
            <div>
                <img src={image} alt="imageHotel" />
                <div className={Styles.detail}>
                    <div className={Styles.detailProduct}>
                        <p>{category}</p>
                        <h3>{name}</h3>
                        <ScoreStar qualification={qualification} starColor="var(--primary-color)" />
                        <p>
                            <img className={Styles.iconLocation} src={iconLocation} alt="" />
                            {city},&#160;{country},&#160;{reference}
                        </p>
                    </div>
                    <div className={Styles.detailCheck}>
                        <div>
                            <p>Check-in:</p>
                            <p>{checkin}</p>
                        </div>
                        <div>
                            <p>Check-out:</p>
                            <p>{checkout}</p>
                        </div>

                    </div>
                    <button onClick={handleBooking} >Confirmar Reserva</button>
                </div>
            </div>




        </div>
    )
}

export default DetailBar;