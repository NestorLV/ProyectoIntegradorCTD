import React from "react";
import Styles from "./Styles.module.css";
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <section className={Styles.delimiter}>
            <div className={Styles.box}>
                <div className={Styles.titleBox}>
                    <p className={Styles.title}>Error 404</p>
                    <h2>No se ha encontrado la página solicitada</h2>
                </div>
                <Link to={`/`}>
                    <button className={Styles.button}>Página Principal</button>
                </Link>
            </div>
        </section>
    )
}

export default NotFound;
