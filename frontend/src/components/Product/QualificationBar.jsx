import React, { useState } from "react";
import StylesApp from "../../App.module.css";
import Styles from "./styles.module.css";
import { AxiosCalificarProducto } from "../../axiosCollection/Product/AxiosProduct";

export default function QualificationBar({ id }) {
    /* eslint-disable no-unused-vars */

    const [starIndex, setStarIndex] = useState(sessionStorage.getItem('calificacion') == null ? 0 : sessionStorage.getItem('calificacion'));
    const [submit, setSubmit] = useState(false);
    const [calificacion_text, setCalificacion_text] = useState(`Puntuación: ${starIndex === 0 ? "" : starIndex}`);
    const [errorMessage, setErrorMessage] = useState("");

    let stars = [];

    let star = (i) => <svg key={i} index={i} viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.27778 0L8.91174 4.83688H14.1994L9.92159 7.82624L11.5555 12.6631L7.27778 9.67376L3.00001 12.6631L4.63397 7.82624L0.3562 4.83688H5.64382L7.27778 0Z" className={i >= starIndex ? Styles.star : Styles.starActive} /></svg>;

    console.log(sessionStorage.getItem('email'))

    const renderStar = () => {
        for (let i = 0; i < 5; i++) {
            stars.push(star(i));
        }
        return stars;
    }

    renderStar();

    const handleStarIndex = (i) => {
        setStarIndex(i);
        setSubmit(false);
        setCalificacion_text(`Puntuación: ${i}`);
    }

    const handleSubmit = () => {
        setSubmit(true);
        setCalificacion_text(`Enviando puntuación...`);
        AxiosCalificarProducto(starIndex, id, setCalificacion_text, setErrorMessage)
    }

    const handleReset = () => {
        setStarIndex(0);
        setSubmit(false);
        setCalificacion_text(`Seleccione puntuación`);
    }

    return (
        <div className={`${Styles.qualificationBar} ${StylesApp.delimiter}`}>
            <div className={`${Styles.qualificationBarChild} ${StylesApp.delimiterChild}`}>
                <div className={Styles.qualificationBarTitle}>
                    <h2>Califica este alojamiento: </h2>
                    <div className={Styles.starsMap}>
                        {stars.map((star, i) => {
                            return <div key={i} className={Styles.starBox} onClick={() => handleStarIndex(i + 1)} >{star}</div>;
                        })}
                    </div>
                </div>
                <div className={Styles.qualificationButtons}>
                    <div className={Styles.containerButtons}>
                        <button className={Styles.qualificationReset} onClick={handleReset} > Resetear </button>
                        <button className={Styles.qualificationSubmit} onClick={starIndex > 0 ? handleSubmit : null} > Enviar </button>
                    </div>
                    <div className={Styles.qualificationConfirm} >{calificacion_text}</div>
                </div>

            </div>
        </div>
    )
}