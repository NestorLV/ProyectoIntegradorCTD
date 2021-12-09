import React from "react";
import StylesApp from "../../App.module.css";
import Styles from "./styles.module.css";
import iconLocation from "./icons/iconBack.svg"

function TitleBar(props) {   
           
    return (
        <div className={`${Styles.titleBar} ${StylesApp.delimiter}`}>
            <div className={`${Styles.titleBarChild} ${StylesApp.delimiterChild}`}>
                <div onClick={props.goBack}>
                   <img src={iconLocation} alt="IconLocation" className={Styles.iconLocation}/>
                </div>
                <div className={Styles.titleBarTitles}>
                    <p>{props.category}</p>
                    <h2>{props.name}</h2>
                </div>                             
            </div>
        </div>
    );
}

export default TitleBar;
