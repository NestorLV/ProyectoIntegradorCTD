import React, { useState } from 'react';
import Styles from './styles.module.css';
import iconWifi from "./img/iconWifi.svg";
import iconStar from "./img/starOrange.png";
import iconEight from "./img/iconEight.svg";
import iconRectangle from "./img/iconRectangle.svg";
import iconLocation from "./img/IconLocation.svg";
import iconSwimming from "./img/iconSwimming.svg";
import { Link } from "react-router-dom";

function Card({ image, cardCategory, name, city, country, description, id, reference, qualification }) {

    const [isLike, setLike] = useState("false");

    const handleToggle = (e) => {
        setLike(!isLike);
    }

    const handleDoubleClick = (e) => {
        e.preventDefault();
    }

    const scoreLetter = (valor) => {
        if (valor >= 8 && valor <= 10) return "Excelente";
        if (valor >= 6 && valor < 8) return "Muy Bueno";
        if (valor >= 4 && valor < 6) return "Bueno";
        if (valor >= 2 && valor < 4) return "Regular";
        if (valor >= 0 && valor < 2) return "Malo";
        else { return "Calificacion Invalida" }
    }

    let cantStar = Math.floor(qualification / 2);

    return (
        <div className={Styles.cardBox}>
            <div className={Styles.cardImage}>
                <svg className={Styles.iconHeart} onClick={handleToggle} onDblClick={handleDoubleClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path className={isLike ? Styles.heartColor : Styles.heartColor2} id="heart" d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" /></svg>
                <img className={Styles.image} src={image} alt="" />
            </div>

            <div className={Styles.cardInfo}>
                <div className={Styles.cardHeaderBox}>
                    <div className={Styles.cardHeadline}>
                        <div className={Styles.cardCategory}>
                            <p>{cardCategory}</p>
                            {cantStar >= 0 ? <img className={Styles.star} src={iconStar} alt="" /> : null}
                            {cantStar >= 2 ? <img className={Styles.star} src={iconStar} alt="" /> : null}
                            {cantStar >= 3 ? <img className={Styles.star} src={iconStar} alt="" /> : null}
                            {cantStar >= 4 ? <img className={Styles.star} src={iconStar} alt="" /> : null}
                            {cantStar >= 5 ? <img className={Styles.star} src={iconStar} alt="" /> : null}
                        </div>
                        <div className={Styles.cardName}>{name}</div>
                    </div>
                    <div className={Styles.cardScore}>
                        <div className={Styles.cardScoreNumber}>
                            <p>{Math.floor(qualification)}</p>
                        </div>
                        <div className={Styles.cardScoreWords}>{scoreLetter(qualification)}</div>
                    </div>
                </div>
                <div className={Styles.cardLocation}>
                    <img className={Styles.iconLocation} src={iconLocation} alt="" />
                    {city},&#160;{country},&#160;{reference}
                    <span>mostrar en el mapa</span>
                </div>
                <div className={Styles.cardIcons}>
                    <img src={iconWifi} alt="" />
                    <img className={Styles.iconSwimming} src={iconSwimming} alt="" />
                </div>
                <div className={Styles.cardDescription}>
                    <p>{description}</p>
                    <span>más...</span>
                </div>
                <Link to={`/product/${id}`} key={id} className={Styles.link}>
                    <button className={Styles.cardButton2}>Ver más</button>
                </Link>
            </div>
        </div>
    );
}

export default Card;