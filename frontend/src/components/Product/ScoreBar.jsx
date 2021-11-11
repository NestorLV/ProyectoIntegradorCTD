import React from "react";
import StylesApp from "../../App.module.css";
import Styles from "./styles.module.css";
import iconLocation from "./icons/iconLocation.svg";

function ScoreBar(props) {

    /* console.log(props, "scoreBar"); */

    const scoreLetter = (valor) => {
        if (valor >= 8 && valor <= 10) return "Excelente";
        if (valor >= 6 && valor < 8) return "Muy Bueno";
        if (valor >= 4 && valor < 6) return "Bueno";
        if (valor >= 2 && valor < 4) return "Regular";
        if (valor >= 0 && valor < 2) return "Malo";
        else { return "Calificacion Invalida" }
    }

    let cantStar = Math.floor(props.qualification / 2);
    let star = <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.27778 0L8.91174 4.83688H14.1994L9.92159 7.82624L11.5555 12.6631L7.27778 9.67376L3.00001 12.6631L4.63397 7.82624L0.3562 4.83688H5.64382L7.27778 0Z" fill="#1DBEB4" /></svg>;

    return (
        <div className={`${Styles.scoreBar} ${StylesApp.delimiter}`}>
            <div className={`${Styles.scoreBarChild} ${StylesApp.delimiterChild}`}>
                <div className={Styles.barraIzq}>
                    <p> <img src={iconLocation} alt="iconLocation" className={Styles.iconLocation}/>  {" " + props.city.name + ", " + props.city.country}</p>
                    <p className={Styles.scoreBarReference}>{props.reference}</p>
                </div>
                <div className={Styles.barraDer}>
                    <div className={Styles.calificacionLetra}>
                        <p>{scoreLetter(props.qualification)}</p>
                        <div className={Styles.calificacionEstrellas}>
                            {cantStar >= 0 ? star : null}
                            {cantStar >= 1 ? star : null}
                            {cantStar >= 2 ? star : null}
                            {cantStar >= 3 ? star : null}
                            {cantStar >= 4 ? star : null}
                        </div>
                    </div>
                    <p className={Styles.calificacionEntero}>
                        {Math.floor(props.qualification)}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ScoreBar;
