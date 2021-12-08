import React, { useEffect, useState } from 'react';
import Styles from './styles.module.css';
import iconLocation from "./img/IconLocation.svg";
import { Link } from "react-router-dom";
import MapModal from './MapModal';
import { Modal } from 'react-responsive-modal';
import ScoreStar from '../Product/ScoreStar';
import ScoreDescription from '../Product/ScoreDescription';
import Icons from "../Product/icons/Icons";
import ConfirmProductModal from '../Administrator/Product/ConfirmProductModal';
import ModalProductAviso from "../Administrator/Product/ModalProductSucceed";
import tildeOk from "../Administrator/icons/tildeOk.svg"
import { AxiosCreateFavourite, AxiosDeletedMark } from '../../axiosCollection/Cards/AxiosCards';

function Card({ setLastLocation, image, cardCategory, name, city, country, description, id, reference, qualification, features, latitude, longitude, address, favorite}) {
    const role = sessionStorage.getItem("role");
    const [isLike, setIsLike] = useState(favorite);
    const [mapIsOpen, setMapIsOpen] = useState(false)
    const [modalFavouriteIsOpen, setModalFavouriteIsOpen] = useState(false)
    const [despliegue, setDespliegue] = useState(false)
    const [textoDespliegue, setTextoDespliegue] = useState("más...")
    const [errorMessage, setErrorMessage] = useState("");
    const [admin, setAdmin] = useState(true);
    const [modalConfirmDeletedIsOpen, setModalConfirmDeletedIsOpen] = useState(false)
    const [modalProductSucceedIsOpen, setModalProductSucceedIsOpen] = useState(false)
    const [modalErrorProductoConReservasIsOpen, setModalErrorProductoConReservasIsOpen] = useState(false) 

    useEffect(() => {
        if (sessionStorage.getItem("role") === "ADMIN") {
            setAdmin(true)
        } else {
            setAdmin(false)
        }
    }, [role])

    const handleToggleLike = () => {   
        AxiosCreateFavourite(id, setErrorMessage)  
        setIsLike(prevState => !prevState)                         
    }            

    const handleDespliegue = () => {
        setDespliegue(!despliegue);
        if (despliegue) {
            setTextoDespliegue("más...")
        } else {
            setTextoDespliegue("menos...");
        }
    }

    const openModalFavourite = (() => { setModalFavouriteIsOpen(true) })
    const closeModalFavourite = () => {
        setModalFavouriteIsOpen(false);
    };

    const openMapModal = (() => {
        setMapIsOpen(true)
    })

    const closeMapModal = () => {
        setMapIsOpen(false);
    };

    let loggued = sessionStorage.getItem("log");

    function handleLastLocation() {
        setLastLocation(`/product/${id}`)
    }

    const openModalSucceed = (() => {
        setModalProductSucceedIsOpen(true)
    })

    const closeModalSucceed = (() => {
        setModalProductSucceedIsOpen(false)
        window.location.href = "/"
    })

    function openModalConfirmDeleted() {
        setModalConfirmDeletedIsOpen(true)
    }

    function closeModalConfirmDeleted() {
        setModalConfirmDeletedIsOpen(false)
    }

    const openModalErrorProductoConReservas = (() => {
        setModalErrorProductoConReservasIsOpen(true)
    })

    const closeModalErrorProductoConReservas = (() => {
        setModalErrorProductoConReservasIsOpen(false)
    })

    function eliminarProducto() {
        closeModalConfirmDeleted()
        AxiosDeletedMark(id, openModalSucceed, openModalErrorProductoConReservas)
    }

    return (
        <div className={Styles.cardBox} >
            <div className={Styles.cardImage}>
                <svg className={Styles.iconHeart} onClick={loggued === "true" ? handleToggleLike : openModalFavourite} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 27 27"><path className={isLike ? Styles.heartColor2 : Styles.heartColor} id="heart" d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" /></svg>
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
                                <button id className={Styles.create}>
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
                            <ScoreStar qualification={qualification} starColor="#F0572D" />
                        </div>
                        <div className={Styles.cardName}>{name}</div>
                    </div>
                    <div className={Styles.cardScore}>
                        <div className={Styles.cardScoreNumber}>
                            <p>{Math.floor(qualification)}</p>
                        </div>
                        <div className={Styles.cardScoreWords}>
                            <ScoreDescription qualification={qualification} />
                        </div>
                    </div>
                </div>
                <div className={Styles.cardLocation}>
                    <img className={Styles.iconLocation} src={iconLocation} alt="" />
                    {city},&#160;{country},&#160;{reference}
                    <span onClick={openMapModal} >mostrar en el mapa</span>
                    <MapModal mapIsOpen={mapIsOpen} latitude={latitude} longitude={longitude} closeMapModal={closeMapModal} name={name} address={address} />
                </div>
                <div className={Styles.cardIcons}>
                    {features.map((feature, index) => <div className={Styles.cardFeatures} key={index}>{Icons(feature.id - 1, "#31363F")}</div>)}
                </div>
                <div className={Styles.cardDescription}>
                    <p className={despliegue ? Styles.desplegado : Styles.noDesplegado}>{description}</p>
                    <span onClick={handleDespliegue}>{textoDespliegue}</span>
                </div>
                <div className={Styles.buttonsBox}>
                    <Link to={`/product/${id}`} key={id} className={Styles.link} onClick={handleLastLocation}>
                        <button className={Styles.cardButton2}>Ver más</button>
                    </Link>

                    {admin &&
                        <div className={Styles.buttonsAdminBox}>
                            <Link to={`/product/update/${id}`} key={id} className={Styles.link} onClick={handleLastLocation}>
                                <button className={`${Styles.cardButton2} ${Styles.cardButtonModify}`} >Modificar</button>
                            </Link>
                            <div className={Styles.link} onClick={handleLastLocation}>
                                <button className={`${Styles.cardButton2} ${Styles.cardButtonModify}`} onClick={openModalConfirmDeleted}>Eliminar</button>
                            </div>
                            <Modal open={modalConfirmDeletedIsOpen} onClose={closeModalConfirmDeleted} center>
                                <ConfirmProductModal accion="eliminar" setModalConfirmIsOpen={setModalConfirmDeletedIsOpen} funcionProducto={eliminarProducto} closeModalConfirm={closeModalConfirmDeleted} />
                            </Modal>
                            <Modal open={modalProductSucceedIsOpen} onClose={closeModalSucceed} center>
                                <ModalProductAviso title="Operación confirmada." message="Se ha borrado el producto exitosamente." closeModal={closeModalSucceed} icon={tildeOk} />
                            </Modal>
                            <Modal open={modalErrorProductoConReservasIsOpen} onClose={closeModalErrorProductoConReservas} center>
                                <ModalProductAviso title="El producto no pudo borrarse." message="Tiene reservas asignadas." closeModal={closeModalErrorProductoConReservas} icon={"X"} />
                            </Modal>
                        </div>
                    }
                </div>

            </div>

        </div>
    );

}

export default Card;