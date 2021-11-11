import React, { useState } from 'react';
import Styles from './styles.module.css';
import iconStar from "./img/starOrange.png";
import iconLocation from "./img/IconLocation.svg";
import { Link } from "react-router-dom";
import wifi from '../Product/icons/wifi.svg';
import pool from '../Product/icons/pool.svg';
import kitchen from '../Product/icons/kitchen.svg';
import tv from '../Product/icons/tv.svg';
import ac from '../Product/icons/ac.svg';
import pet from '../Product/icons/pet.svg';
import parking from '../Product/icons/parking.svg';
import creditCard from '../Product/icons/creditCard.svg';
import smoke from '../Product/icons/smoke.svg';
import party from '../Product/icons/party.svg';
import checkin from '../Product/icons/checkIn.svg';
import noSmoke from '../Product/icons/noSmoke.svg';
import MapModal from './MapModal';
import { Modal } from 'react-responsive-modal';


function Card({ image, cardCategory, name, city, country, description, id, reference, qualification, features, latitude, longitude, address,favourite }) {
    const [isLike, setLike] = useState(favourite);
    const [mapIsOpen, setMapIsOpen] = useState(false)
    const [modalFavouriteIsOpen, setModalFavouriteIsOpen] = useState(false)
    const [despliegue, setDespliegue] = useState(false)
    const [textoDespliegue, setTextoDespliegue] = useState("más...")
    let icons = [wifi, pool, kitchen, tv, ac, pet, parking, creditCard, smoke, party, checkin, noSmoke];

    const handleToggle = (e) => { setLike(!isLike); }

    const handleDespliegue = () => {
        setDespliegue(!despliegue);
        if (despliegue) {
            setTextoDespliegue("más...")
        } else {
            setTextoDespliegue("menos...");
        }
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

        const openModalFavourite = (() => { setModalFavouriteIsOpen(true) })
        const closeModalFavourite = () => {
            setModalFavouriteIsOpen(false);
        };


        const openMapModal = (() => {
            console.log("Entro en el modal", mapIsOpen);
            setMapIsOpen(true)
        })

        const closeMapModal = () => {
            setMapIsOpen(false);
        };

        let loggued = sessionStorage.getItem("log");

        return (
            <div className={Styles.cardBox}>

                <div className={Styles.cardImage}>
                    <svg className={Styles.iconHeart} onClick={loggued === "true" ? handleToggle : openModalFavourite} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path className={isLike ? Styles.heartColor : Styles.heartColor2} id="heart" d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" /></svg>
                    <Modal open={modalFavouriteIsOpen} onClose={closeModalFavourite} center>
                        <div className={Styles.modalFavourite}>
                            <p>Para agregar favoritos, ingresa a tu cuenta</p>
                            <div className={Styles.buttons}>
                                <Link to="/login" >
                                    <button className={Styles.login} >
                                        Iniciar Sesión
                                    </button>
                                </Link>
                                <Link to="/create" >
                                    <button className={Styles.create}>
                                        Crear Cuenta
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </Modal>
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
                        <span onClick={openMapModal} >mostrar en el mapa</span>
                        <MapModal mapIsOpen={mapIsOpen} latitude={latitude} longitude={longitude} closeMapModal={closeMapModal} name={name} address={address} />
                    </div>
                    <div className={Styles.cardIcons}>
                        {features.map((feature, index) => <img className={Styles.cardFeatures} key={index} src={icons[index]} alt={feature.title} />)}
                    </div>
                    <div className={Styles.cardDescription}>
                        <p className={despliegue ? Styles.desplegado : Styles.noDesplegado}>{description}</p>
                        <span onClick={handleDespliegue}>{textoDespliegue}</span>
                    </div>
                    <Link to={`/product/${id}`} key={id} className={Styles.link}>
                        <button className={Styles.cardButton2}>Ver más</button>
                    </Link>
                </div>

            </div>
        );

    }

    export default Card;