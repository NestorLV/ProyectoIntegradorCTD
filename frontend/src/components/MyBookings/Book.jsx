import React, { useEffect, useState } from 'react';
import Styles from './styles.module.css';
import iconLocation from "./img/IconLocation.svg";
import { Link } from "react-router-dom";
import { Modal } from 'react-responsive-modal';
import ScoreStar from '../Product/ScoreStar';
import ScoreDescription from '../Product/ScoreDescription';
import Icons from "../Product/icons/Icons";
import ConfirmProductModal from '../Administrator/Product/ConfirmProductModal';
import ModalProductSucceed from "../Administrator/Product/ModalProductSucceed";
import tildeOk from "../Administrator/icons/tildeOk.svg"
import { AxiosCreateFavourite, AxiosDeletedMark } from '../../axiosCollection/Cards/AxiosCards';
import axios from 'axios';

export default function Book({ id, startDate, endDate, reservationId }) {
    const role = sessionStorage.getItem("role");
    const [data, setData] = useState({});
    const [admin, setAdmin] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8080/products/get/${id}`)
            .then(response => {
                setData(() => response.data);
                console.log(response.data, "data Book");
                return response.data;
            })
            .then(() => setLoading(false))
    }, [])

    useEffect(() => {
        if (sessionStorage.getItem("role") === "ADMIN") {
            setAdmin(true)
        } else {
            setAdmin(false)
        }
    }, [role])

     const deleteReservation = (id) => {
    axios.delete(`http://localhost:8080/reservations/delete/${reservationId}`)
      .then(response => {
        console.log(response.data, `delete reservation ${id}`);
        window.location.href = "/mybookings";
      })
      .catch(error => {
        console.log(error.message);
      })
  }


    let loggued = sessionStorage.getItem("log");

    return (
        <>{!loading &&
            <div className={Styles.cardBox} >
                <div className={Styles.cardImage}>
                    <img className={Styles.image} src={data.images.length > 0 ? data.images[0].url : ""} alt="" />
                </div>
                <div className={Styles.cardInfo}>
                    <div className={Styles.cardHeaderBox}>
                        <div className={Styles.cardHeadline}>
                            <div className={Styles.cardCategory}>
                                <p>{data.category.title}</p>
                                <ScoreStar qualification={data.qualification * 2} starColor="#F0572D" />
                            </div>
                            <div className={Styles.cardName}>{data.name}</div>
                        </div>
                        <div className={Styles.cardScore}>
                            <div className={Styles.cardScoreNumber}>
                                <p>{Math.floor(data.qualification * 2)}</p>
                            </div>
                            <div className={Styles.cardScoreWords}>
                                <ScoreDescription qualification={data.qualification * 2} />
                            </div>
                        </div>
                    </div>
                    <div className={Styles.cardLocation}>
                        <img className={Styles.iconLocation} src={iconLocation} alt="" />
                        {data.city.name},&#160;{data.country},&#160;{data.reference}
                    </div>

                    <div className={Styles.cardDescription}>
                        <p>Inicio de Reserva:{startDate} </p>
                        <p>Fin de Reserva:{endDate}</p>
                    </div>


                    <div className={Styles.buttonsBox}>
                        <Link to={`/product/${id}`} key={id} className={Styles.link}>
                            <button className={Styles.cardButton2}>Ver más</button>
                        </Link>
                        <button className={Styles.cardButton2} onClick={deleteReservation}>Eliminar</button>
                    </div>
                </div>

            </div>
        }</>
    );

}
