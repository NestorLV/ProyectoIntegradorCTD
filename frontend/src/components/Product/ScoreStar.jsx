import React from "react";
import Styles from "./styles.module.css";

export default function ScoreStar({ qualification, starColor }) {
    let star = <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">   <path d="M7.27778 0L8.91174 4.83688H14.1994L9.92159 7.82624L11.5555 12.6631L7.27778 9.67376L3.00001 12.6631L4.63397 7.82624L0.3562 4.83688H5.64382L7.27778 0Z" fill={starColor} /></svg>;
    let halfStar = <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="m 7.27778,0 v 9.67376 0 0 0 0 L 3.00001,12.6631 4.63397,7.82624 0.3562,4.83688 h 5.28762 z" fill={starColor} /> </svg>
    return (
        <div className={Styles.calificacionEstrellas}>
            {qualification >= 2 ? star : (qualification % 2 >= 1 && qualification > 0) && halfStar}
            {qualification >= 4 ? star : (qualification % 2 >= 1 && qualification > 2) && halfStar}
            {qualification >= 6 ? star : (qualification % 2 >= 1 && qualification > 4) && halfStar}
            {qualification >= 8 ? star : (qualification % 2 >= 1 && qualification > 6) && halfStar}
            {qualification >= 10 ? star : (qualification % 2 >= 1 && qualification > 8) && halfStar}
        </div>
    )

}