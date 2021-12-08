import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoFb from "./img/IconFb.png";
import logoLinkedIn from "./img/IconLinkedIn.png";
import logoTwitter from "./img/IconTw.png";
import logoIg from "./img/IconIg.png";
import line from "./img/Line.png";
import { MenuBurgerWrapper } from "./MenuBurgerWrapped.jsx";
import Share from '../../components/Product/Share';
import iconSocial from "./img/icon-share.svg"

export default function MenuMobile({ admin, handleFavouriteClick, show, handleHide, isLogged, iniciales, activeLogin, activeCreate, handleLogOut }) {

    const hideObject = (isLogged) ? "hide" : null; //Para esconder los botones cuando esta logueado
    const showObject = (isLogged) ? null : "hide"; //Para que se vea el avatar cuando se loguea

    const [shareIsOpenFooter, setShareIsOpenFooter] = useState(false);
    const openShareModal = (() => { setShareIsOpenFooter(true) });
    let placeShareCall = "footer"

    return (
        <MenuBurgerWrapper show={show} className="containerMobile">
            <div className="mobileHeader">
                <div className="close" onClick={handleHide}>X</div>
                <div className={`avatar ${showObject}`}>
                    <div className="logoMobile">
                        <p>{iniciales}</p>
                    </div>
                    <div className="text">
                        <h3 className="great">Hola,</h3>
                        <h3 className="name">{sessionStorage.getItem("name")} {sessionStorage.getItem("surname")}</h3>
                    </div>
                </div>
                <p className={`textMenu ${hideObject}`}>MENÚ</p>
            </div>
            <div className="mobileBody">
                <div onClick={handleHide} className={`menuFavoritos ${!isLogged ? "hide" : null} `}>
                    <Link to="/">
                        <p onClick={handleFavouriteClick}>Favoritos</p>
                    </Link>
                    <img src={line} alt="" />
                    <Link to="/mybookings">
                        <p>Mis reservas</p>
                    </Link>
                    {admin &&
                        <div>
                            <img src={line} alt="" />
                            <Link to="/product/create">
                                <p>Crear Producto</p>
                            </Link>
                            <img src={line} alt="" />
                            <Link to="/product/update">
                                <p>Modificar Producto</p>
                            </Link>
                        </div>
                    }
                </div>
                <div className={`botones ${hideObject} ${(!activeLogin && activeCreate) ? "subir" : null}`}>

                    <Link to="/create" id="createC" onClick={handleHide}><p className={(!activeLogin && activeCreate) ? "hide" : null} >Crear cuenta</p></Link>
                    <img className={`${activeCreate || activeLogin ? "hide" : null}`} src={line} alt="" />
                    <Link to="/login" onClick={handleHide}><p className={(!activeCreate && activeLogin) ? "hide" : null} >Iniciar sesión</p></Link>
                </div>
            </div>
            <div className="mobileFooter">
                <div className={`logOut ${showObject}`}>
                    <div>¿Deseas <a href="/" onClick={handleLogOut}>cerrar sesión?</a></div>
                    <img className="iconsImgMobile" src={line} alt="" />
                </div>
                <div className="iconsMobile">

                    <a href="https://www.facebook.com/profile.php?id=100074545225635" target="_blank" rel="noreferrer" ><img src={logoFb} alt="" /></a>
                    <a href="https://www.linkedin.com/in/world-guest-2b195b225/" target="_blank" rel="noreferrer" ><img src={logoLinkedIn} alt="" /></a>
                    <a href="https://twitter.com/WorldGuest2" target="_blank" rel="noreferrer" > <img src={logoTwitter} alt="" /></a>
                    <a href="https://www.instagram.com/world_guest_booking/" target="_blank" rel="noreferrer"> <img src={logoIg} alt="" /></a>
                    <img src={iconSocial} alt="iconSocial" onClick={openShareModal} className="iconSocial" />
                    <Share shareIsOpen={shareIsOpenFooter} placeShareCall={placeShareCall} setShareIsOpen={setShareIsOpenFooter} />
                </div>
            </div>
        </MenuBurgerWrapper>
    )
}

