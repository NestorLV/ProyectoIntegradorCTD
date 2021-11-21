import React from 'react';

import ValidCredentials from '../../credentials/ValidCredentials';
import logo from "./img/logoWguest.jpg";
import Styles from "./styles.module.css"
import StylesApp from "../../App.module.css"
import StylesLayout from "../styles.module.css"
import MenuBurger from '../../components/MenuBurger/MenuBurger';
import MenuButton from '../../components/MenuBurger/MenuButton';
import { Link } from "react-router-dom";
import axios from 'axios';

export default function Header({ activeCreate, activeLogin, isLogged, showBurger, setShowBurger, handleClean, handleFavourite }) {

    const showUserName = (isLogged) ? `${Styles.user} ${Styles.loggedIn}` : Styles.user;
    const hideButtons = (isLogged) ? `${Styles.buttons} ${Styles.user}` : Styles.buttons;
    const baseUrl = "http://localhost:8080/"

    function handleLogOut() {
        sessionStorage.setItem("log", "false")
        sessionStorage.removeItem("email")
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("name")
        sessionStorage.removeItem("surname")
        sessionStorage.removeItem("iniciales")
    }

    function handleShow() {
        setShowBurger(true)
    }
    function handleHide() {
        setShowBurger(false)
    }

    
    
        if(sessionStorage.getItem("log")){
            axios.get(baseUrl + `users/getByEmail/${sessionStorage.getItem("email")}`, {
            headers:{
                Authorization:`Bearer ${sessionStorage.getItem("token")}`
            },
            }).then(response => {
                console.log(response);
              
            })
            .catch(error => {
                console.log(error.response);
            })
        
        }
   

    return (
        <header className={`${Styles.header} ${StylesApp.delimiter}`} >
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
                        <button className={activeLogin ? Styles.hideButton : null} >
                            Iniciar Sesión
                        </button>
                    </Link>



                </div>
                <div className={showUserName}>
                    <div className={Styles.logoName}>
                        <p>{sessionStorage.getItem("iniciales")}</p>
                    </div>
                    <div className={Styles.text}>
                        <h3 className={Styles.great}>Hola,</h3>
                        <h3 className={Styles.name}>{sessionStorage.getItem("name")} {sessionStorage.getItem("surname")}</h3>
                        <h4 className={Styles.seeFavourite}onClick={handleFavourite}>Ver favoritos</h4>
                    </div>
                    <div>
                        <div className={Styles.close}><a href="/" onClick={handleLogOut}>X</a> </div>
                    </div>

                </div>
                <MenuButton show={showBurger} handleShow={handleShow} />
            </div>
            <MenuBurger show={showBurger} handleHide={handleHide} isLogged={isLogged} iniciales={sessionStorage.getItem("iniciales")} activeLogin={activeLogin} activeCreate={activeCreate} handleLogOut={handleLogOut} handleFavourite={handleFavourite} />
        </header>
    )
}