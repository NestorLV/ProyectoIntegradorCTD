import React, { useEffect, useState } from 'react';
import Styles from './styles.module.css';
import iconLocation from "./img/IconLocation.svg";
import { Link } from "react-router-dom";
import ScoreStar from '../Product/ScoreStar';
import ScoreDescription from '../Product/ScoreDescription';
import { Modal } from 'react-responsive-modal';
import ConfirmProductModal from '../Administrator/Product/ConfirmProductModal';
import ModalProductAviso from "../Administrator/Product/ModalProductSucceed";
import tildeOk from "../Administrator/icons/tildeOk.svg";
import { AxiosDeleteReservation } from '../../axiosCollection/MyBookings/AxiosMyBookings';
import axios from 'axios';

export default function Book({ id, startDate, endDate, reservationId }) {
    const role = sessionStorage.getItem("role");
    const [data, setData] = useState({});
    const [admin, setAdmin] = useState(true);
    const [loading, setLoading] = useState(true);
    const [modalConfirmDeletedIsOpen, setModalConfirmDeletedIsOpen] = useState(false)
    const [modalProductSucceedIsOpen, setModalProductSucceedIsOpen] = useState(false)

    useEffect(() => {
        axios.get(`http://worldguestbooking.com.ar:8080/products/get/${id}`)
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
        closeModalConfirmDeleted()
        AxiosDeleteReservation(reservationId, id,openModalSucceed)        
    }

    let loggued = sessionStorage.getItem("log");

    const openModalSucceed = (() => {
        setModalProductSucceedIsOpen(true)
    })

    const closeModalSucceed = (() => {
        setModalProductSucceedIsOpen(false)
        window.location.href = "/"
    })

    function openModalConfirmDeleted() {
        setModalConfirmDeletedIsOpen(true)
    }

    function closeModalConfirmDeleted() {
        setModalConfirmDeletedIsOpen(false)
    }

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
                        {data.city.name},&#160;{data.city.country},&#160;{data.reference}
                    </div>

                    <div className={Styles.cardDescription}>
                        <p>Inicio de Reserva:{startDate} </p>
                        <p>Fin de Reserva:{endDate}</p>
                    </div>


                    <div className={Styles.buttonsBox}>
                        <Link to={`/product/${id}`} key={id} className={Styles.link}>
                            <button className={Styles.cardButton2}>Ver Locacion</button>
                        </Link>
                        <button className={Styles.cardButton2} onClick={openModalConfirmDeleted}>Eliminar</button>
                    </div>
                    <Modal open={modalConfirmDeletedIsOpen} onClose={closeModalConfirmDeleted} center>
                        <ConfirmProductModal accion="eliminar la reserva" setModalConfirmIsOpen={setModalConfirmDeletedIsOpen} funcionProducto={deleteReservation} closeModalConfirm={closeModalConfirmDeleted} />
                    </Modal>
                    <Modal open={modalProductSucceedIsOpen} onClose={closeModalSucceed} center>
                        <ModalProductAviso title="Operación confirmada." message="Se ha borrado la reserva exitosamente." closeModal={closeModalSucceed} icon={tildeOk} />
                    </Modal>
                </div>

            </div>
        }</>
    );
}