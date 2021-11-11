import StylesApp from "../../App.module.css";
import Styles from "./styles.module.css";
import iconSocial from "./icons/iconSocial.svg";
import React, { useState } from "react";
import white from "./icons/NoImage.png";
import CarouselModal from "./CarouselModal";
import Share from "./Share";
import { Link } from "react-router-dom";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';


function ImageBar(props) {
    const [countSlider, setCountSlider] = useState(0); // se separa las imagenes a mostrar para la galeria de vista tablet y mobile
    const { images } = props;
    /*  console.log(props, "imageBar"); */
    const changeSlider = () => countSlider === images.length - 1 ? setCountSlider(0) : setCountSlider(countSlider + 1);
    /*setTimeout(changeSlider,3000);*/
    const openLightBox = (() => { props.setViewerIsOpen(true) });
    const openShareModal = (() => { props.setShareIsOpen(true) })
    const openModalFavourite = (() => { setModalFavouriteIsOpen(true) })
    const [isLike, setLike] = useState("false");
    const [modalFavouriteIsOpen, setModalFavouriteIsOpen] = useState(false)

    const closeModalFavourite = () => {
        setModalFavouriteIsOpen(false);
    };

    const handleToggle = (e) => {
        setLike(!isLike);
    }
    let placeShareCall = "producto"

    let loggued = sessionStorage.getItem("log");

    return (
        <div className={`${Styles.imageBar} ${StylesApp.delimiter}`}>
            <div className={`${Styles.imageBarChild} ${StylesApp.delimiterChild}`}>
                <div className={Styles.barraSup}>
                    <img src={iconSocial} alt="iconSocial" className={Styles.iconImage} onClick={openShareModal} />
                    <Share id={props.id} shareIsOpen={props.shareIsOpen} setShareIsOpen={props.setShareIsOpen} placeShareCall={placeShareCall}/>
                    <svg className={Styles.iconHeart} onClick={loggued === "true" ? handleToggle : openModalFavourite} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 25 25"><path className={isLike ? Styles.heartColor : Styles.heartColor2} d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" /></svg>
                    <Modal open={modalFavouriteIsOpen} onClose={closeModalFavourite} center>
                        <div className={Styles.modalFavourite}>
                            <p>Para agregar favoritos, ingresa a tu cuenta</p>
                            <div className={Styles.buttons}>
                                <Link to="/login">
                                    <button  className={Styles.login}>
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
                </div>
                <div className={Styles.barraInf}>
                    <div className={Styles.barraIzq}>
                        <img src={images[0].url} alt={images[0].title} />
                    </div>
                    <div className={Styles.barraDer}>
                        {images[1].url !== null ? <img src={images[1].url} alt={images[1].title} /> : <img src={white} alt="white" />}
                        {images[2].url !== null ? <img src={images[2].url} alt={images[2].title} /> : <img src={white} alt="white" />}
                        {images[3].url !== null ? <img src={images[3].url} alt={images[3].title} /> : <img src={white} alt="white" />}
                        {images[4].url !== null ? <img src={images[4].url} alt={images[4].title} /> : <img src={white} alt="white" />}
                        <div className={Styles.verMas} onClick={openLightBox}>Ver Más</div>
                    </div>
                    <CarouselModal viewerIsOpen={props.viewerIsOpen} images={images} setCurrentImage={props.setCurrentImage} setViewerIsOpen={props.setViewerIsOpen} />

                    <div className={Styles.slider} onClick={changeSlider} >
                        <img src={images[countSlider].url} alt={images[countSlider].title} />
                        <p>{(countSlider + 1) + "/" + (images.length)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageBar;