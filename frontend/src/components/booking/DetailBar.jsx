import Styles from "./styles.module.css"
import iconLocation from "../Cards/img/IconLocation.svg";
import iconStar from "../Cards/img/starOrange.png";

function DetailBar(props) {
    const { image, category, name, city, country, reference, qualification, checkin, checkout} = props;

    let cantStar = Math.floor(qualification / 2);
  
    return (
        <div className={Styles.detailBar}>
            <h2>Detalle de la Reserva</h2>
            <div>
                <img src={image} alt="imageHotel" />
                <div className={Styles.detail}>
                    <div className={Styles.detailProduct}>
                        <p>{category}</p>
                        <h3>{name}</h3>
                        <div className={Styles.startContainer}>
                            {cantStar >= 0 ? <img className={Styles.star} src={iconStar} alt="" /> : null}
                            {cantStar >= 2 ? <img className={Styles.star} src={iconStar} alt="" /> : null}
                            {cantStar >= 3 ? <img className={Styles.star} src={iconStar} alt="" /> : null}
                            {cantStar >= 4 ? <img className={Styles.star} src={iconStar} alt="" /> : null}
                            {cantStar >= 5 ? <img className={Styles.star} src={iconStar} alt="" /> : null}
                        </div>
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
                    <button>Confirmar Reserva</button>
                </div>
            </div>




        </div>
    )
}

export default DetailBar;