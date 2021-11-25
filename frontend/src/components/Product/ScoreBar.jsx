import React from "react";
import StylesApp from "../../App.module.css";
import Styles from "./styles.module.css";
import iconLocation from "./icons/iconLocation.svg";
import ScoreStar from "./ScoreStar"
import ScoreDescription from "./ScoreDescription";

function ScoreBar(props) {    

    return (
        <div className={`${Styles.scoreBar} ${StylesApp.delimiter}`}>
            <div className={`${Styles.scoreBarChild} ${StylesApp.delimiterChild}`}>
                <div className={Styles.barraIzq}>
                    <p> <img src={iconLocation} alt="iconLocation" className={Styles.iconLocation}/>  {" " + props.city.name + ", " + props.city.country}</p>
                    <p className={Styles.scoreBarReference}>{props.reference}</p>
                </div>
                <div className={Styles.barraDer}>
                    <div className={Styles.calificacionLetra}>
                        <ScoreDescription qualification={props.qualification} />
                        <ScoreStar qualification={props.qualification} starColor="#1DBEB4" />                        
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
