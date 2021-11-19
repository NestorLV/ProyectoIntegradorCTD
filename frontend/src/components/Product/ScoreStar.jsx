import React from "react";
import Styles from "./styles.module.css";

export default function ScoreStar({qualification, starColor}) {
    let cantStar = Math.floor(qualification / 2);
    let star = <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.27778 0L8.91174 4.83688H14.1994L9.92159 7.82624L11.5555 12.6631L7.27778 9.67376L3.00001 12.6631L4.63397 7.82624L0.3562 4.83688H5.64382L7.27778 0Z" fill={starColor} /></svg>;

    return (
        <div className={Styles.calificacionEstrellas}>
            {cantStar >= 0 && star}
            {cantStar >= 1 && star}
            {cantStar >= 2 && star}
            {cantStar >= 3 && star}
            {cantStar >= 4 && star}
        </div>
    )

}