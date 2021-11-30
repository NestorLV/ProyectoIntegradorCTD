import React, { useState } from 'react';
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
    const [admin, setAdmin] = useState(true);
    const [adminMenu, setAdminMenu] = useState(false);
    const showUserName = (isLogged) ? `${Styles.user} ${Styles.loggedIn}` : Styles.user;
    const hideButtons = (isLogged) ? `${Styles.buttons} ${Styles.user}` : Styles.buttons;
    const administration = isLogged ? Styles.optionsBox : Styles.hideButton;

    /* const baseUrl = "http://localhost:8080/" */

    function handleLogOut() {
        document.querySelectorAll("nav")[1].classList.remove(`${Styles.openNav}`)
        document.querySelectorAll("nav")[1].classList.add(`${Styles.closeNav}`)
        setLoading(true)

        sessionStorage.setItem("log", "false")
        sessionStorage.removeItem("id")
        sessionStorage.removeItem("email")
        sessionStorage.removeItem("token")
        setLastLocation(window.location.pathname)
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

        document.querySelectorAll("nav")[1].classList.remove(`${Styles.closeNav}`)
        document.querySelectorAll("nav")[1].classList.add(`${Styles.openNav}`)

    }
    function handleCloseNav() {

        document.querySelectorAll("nav")[1].classList.remove(`${Styles.openNav}`)
        document.querySelectorAll("nav")[1].classList.add(`${Styles.closeNav}`)

    }

    let handleAdminMenu = () => {
        setAdminMenu(prevState => !prevState);
    }

    return (
        <div className={Styles.containerHeader}>
            <header className={`${Styles.header} ${StylesApp.delimiter}`}>
                <div className={showBurger === true ? `${Styles.headerTop} ${StylesLayout.opacity} ${StylesApp.delimiterChild}` : `${Styles.headerTop} ${StylesApp.delimiterChild}`}>
                    <Link to="/" className={Styles.home} onClick={handleHide}>
                        <div className={Styles.logo} onClick={handleClean}>
                            <img src={logo} alt="logo" />
                            <h3>Un mundo por descubrir</h3>
                        </div>
                    </Link>
                    <div className={hideButtons}>
                        <Link to="/create" >
                            <button className={activeCreate ? Styles.hideButton : null} >
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
                            <div className={administration} onClick={handleAdminMenu}>
                                <>
                                    <h4 className={Styles.administracion}>Administración</h4>
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
                <MenuBurger show={showBurger} handleHide={handleHide} isLogged={isLogged} iniciales={sessionStorage.getItem("iniciales")} activeLogin={activeLogin} activeCreate={activeCreate} handleLogOut={handleLogOut} handleFavourite={handleFavourite} />
            </header>
            <nav className={Styles.closeNav} onMouseLeave={handleCloseNav}>
                <Link to="/">
                    <h4 className={Styles.seeMyAccount} onClick={handleFavouriteClick}>Ver favoritos</h4>
                </Link>
                <img src={lineOrange} alt="" />
                <Link to="/">
                    <h4 className={Styles.seeMyAccount}>Mis reservas</h4>
                </Link>
                <img src={lineOrange} alt="" />
                <h4 className={Styles.seeMyAccount}><a href="/" onClick={handleLogOut}>Cerrar sesión</a> </h4>
            </nav>
            <div className={adminMenu ? Styles.adminOptions : Styles.hideButton} >
                <Link to="/product/create">
                    <h4 className={Styles.seeMyAccount}>Crear Producto</h4>
                </Link>
                <img src={lineOrange} alt="" />
                <Link to="/product/update">
                    <h4 className={Styles.seeMyAccount}>Modificar Producto</h4>
                </Link>
            </div>
        </div >
    )
}