import React, { useEffect, useState } from 'react';
import logo from "./img/logoWguest.jpg";
import Styles from "./styles.module.css"
import StylesApp from "../../App.module.css"
import StylesLayout from "../styles.module.css"
import MenuBurger from '../../components/MenuBurger/MenuBurger';
import MenuButton from '../../components/MenuBurger/MenuButton';
import { Link } from "react-router-dom";
import lineOrange from "./img/LineOrange.png"
import verticalLine from "./img/VerticalLine.png"

export default function Header({ setLastLocation, setBookingWithoutLogin, setLoading, activeCreate, activeLogin, isLogged, showBurger, setShowBurger, handleClean, handleFavourite }) {
    const role = sessionStorage.getItem("role");
    const [admin, setAdmin] = useState(false);
    const [adminMenu, setAdminMenu] = useState(false);
    const [userMenu, setUserMenu] = useState(false);
    const showUserName = (isLogged) ? `${Styles.user} ${Styles.loggedIn}` : Styles.user;
    const hideButtons = (isLogged) ? `${Styles.buttons} ${Styles.user}` : Styles.buttons;
    const administration = isLogged ? Styles.optionsBox : Styles.hideButton;

    /* const baseUrl = "http://localhost:8080/" */

    function handleLogOut() {
        setLoading(true)
        sessionStorage.removeItem("id")
        sessionStorage.removeItem("email")
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("role")
        sessionStorage.removeItem("startDate")
        sessionStorage.removeItem("endDate")
        sessionStorage.setItem("log", "false")
        setLastLocation(window.location.pathname)
        document.querySelectorAll("nav")[1].classList.remove(`${Styles.openNav}`)
        document.querySelectorAll("nav")[1].classList.add(`${Styles.closeNav}`)
    }

    function handleFavouriteClick() {
        handleFavourite()
        handleShowNav()
    }

    function handleShow() {
        setShowBurger(true)
    }
    function handleHide() {
        setShowBurger(false)
        setBookingWithoutLogin(false)
    }

    function handleErrorLogin() {
        setBookingWithoutLogin(false)
    }

    function handleShowNav() {
        setUserMenu(true);
        setAdminMenu(false);
    }

    function handleCloseNav() {
        setUserMenu(false);
        setAdminMenu(false);
    }

    let handleAdminMenu = () => {
        setAdminMenu(true);
        setUserMenu(false);
    }

    useEffect(() => {
        if (sessionStorage.getItem("role") === "ADMIN") {
            setAdmin(true)
        } else {
            setAdmin(false)
        }
    }, [role])


    return (
        <div className={Styles.containerHeader}>
            <header className={`${Styles.header} ${StylesApp.delimiter}`} onMouseLeave={handleCloseNav}>
                <div className={showBurger === true ? `${Styles.headerTop} ${StylesLayout.opacity} ${StylesApp.delimiterChild}` : `${Styles.headerTop} ${StylesApp.delimiterChild}`}>
                    <Link to="/" className={Styles.home} onClick={handleHide}>
                        <div className={Styles.logo} onClick={handleClean}>
                            <img src={logo} alt="logo" />
                            <h3>Un mundo por descubrir</h3>
                        </div>
                    </Link>
                    <div className={hideButtons}>
                        <Link to="/create" >
                            <button id="createC" className={activeCreate ? Styles.hideButton : null} >
                                Crear Cuenta
                            </button>
                        </Link>
                        <Link to="/login">
                            <button className={activeLogin ? Styles.hideButton : null} onClick={handleErrorLogin} >
                                Iniciar Sesión
                            </button>
                        </Link>
                    </div>

                    <div className={administration}>
                        {admin &&
                            <div className={administration} onMouseMove={handleAdminMenu}>
                                <>
                                    <div className={Styles.boxAdminArrow}>
                                        <h4 className={Styles.administracion}>Administración</h4>
                                        <span className={Styles.arrowAdmin}></span>
                                    </div>
                                    <img className={Styles.verticalLine} src={verticalLine} alt="line" />
                                </>
                            </div>
                        }

                        <div className={showUserName} onMouseMove={handleShowNav} >
                            <div>
                                <div className={Styles.logoName}>
                                    <p>{sessionStorage.getItem("iniciales")}</p>
                                </div>
                                <div className={Styles.text}>
                                    <h3 className={Styles.great}>Hola,</h3>
                                    <h3 className={Styles.name}>{sessionStorage.getItem("name")} {sessionStorage.getItem("surname")}</h3>
                                </div>
                                <span className={Styles.arrow}></span>
                            </div>
                        </div>
                    </div>
                    <MenuButton show={showBurger} handleShow={handleShow} />
                </div>
                <MenuBurger admin={admin} handleFavouriteClick={handleFavouriteClick} show={showBurger} handleHide={handleHide} isLogged={isLogged} iniciales={sessionStorage.getItem("iniciales")} activeLogin={activeLogin} activeCreate={activeCreate} handleLogOut={handleLogOut} handleFavourite={handleFavourite} />
                <div className={userMenu ? `${Styles.headerOptions} ${Styles.userOptions}` : Styles.hideButton}/* className={Styles.closeNav} */ /* onMouseLeave={handleCloseNav} */>
                    <Link to="/">
                        <h4 className={Styles.seeMyAccount} onClick={handleFavouriteClick}>Ver favoritos</h4>
                    </Link>
                    <img src={lineOrange} alt="" />
                    <Link to="/mybookings">
                        <h4 className={Styles.seeMyAccount}>Mis reservas</h4>
                    </Link>
                    <img src={lineOrange} alt="" />
                    <h4 className={Styles.seeMyAccount}><a href="/" onClick={handleLogOut}>Cerrar sesión</a> </h4>
                </div>
                <div className={adminMenu ? `${Styles.headerOptions} ${Styles.adminOptions}` : Styles.hideButton} >
                    <Link to="/product/create">
                        <h4 className={Styles.seeMyAccount}>Crear Producto</h4>
                    </Link>
                    <img src={lineOrange} alt="" />
                    <Link to="/product/update">
                        <h4 className={Styles.seeMyAccount}>Modificar Producto</h4>
                    </Link>
                </div>
            </header>

        </div >
    )
}