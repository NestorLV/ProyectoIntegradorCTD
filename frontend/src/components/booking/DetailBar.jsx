import Styles from "./styles.module.css"
import iconLocation from "../Cards/img/IconLocation.svg";
import ScoreStar from "../Product/ScoreStar";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import Succeed from "./Succeed"
import { useState } from "react";
import {AxiosCrearReserva} from "../../axiosCollection/Booking/AxiosBooking"

function DetailBar(props) {
    /* eslint-disable no-unused-vars */
    const {nameUser, surnameUser, emailUser, cityUser, setErrorBooking, errorBooking, id, image, category, name, city, country, reference, qualification, checkin, checkout, arrivalSchedule } = props;
    
    let cantStar = Math.floor(qualification / 2);
    const [modalSucceedIsOpen, setModalSucceedIsOpen] = useState(false)

    const formatDate=(date)=>{
        const arrayDate= date.split("/")
        let mes;
        switch (arrayDate[1]) {
            case "Jan":mes="01"
                break;
            case "Feb":mes="02"
                break;
            case "Mar":mes="03"
                break;
            case "Apr":mes="04"
                break;
            case "May":mes="05"
                break;
            case "Jun":mes="06"
                break;
            case "Jul":mes="07"
                break;
            case "Aug":mes="08"
                break;
            case "Sep":mes="09"
                break;
            case "Oct":mes="10"
                break;
            case "Nov":mes="11"
                break;
            case "Dec":mes="12"
                break;
            default:
                break;
        }

        return arrayDate[2] + "-" + mes + "-" + arrayDate[0]
    }

    const openModalSucceed = (() => { 
        setModalSucceedIsOpen(true) 
    })

    const closeModalSucceed = () => {
        setModalSucceedIsOpen(false);
    };

    const handleBooking = () => {
        if(checkin && checkout && arrivalSchedule && nameUser && surnameUser && emailUser && cityUser){
            AxiosCrearReserva(arrivalSchedule, formatDate, checkin, checkout, id, openModalSucceed, setErrorBooking)
            if (checkin >= new Date().setHours(0, 0, 0, 0)) {
                sessionStorage.setItem("startDate", checkin.toDateString());
                sessionStorage.setItem("endDate", checkout.toDateString());
            }
        }else {
            setErrorBooking("Por favor complete todos los campos.")
        }
    }

    return (
        <div className={Styles.detailBar}>
            <h2>Detalle de la Reserva</h2>
            <div>
                <img src={image} alt="imageHotel" />
                <div className={Styles.detail}>
                    <div className={Styles.detailProduct}>
                        <p>{category}</p>
                        <h3>{name}</h3>
                        <ScoreStar qualification={qualification} starColor="var(--primary-color)" />
                        <p>
                            <img className={Styles.iconLocation} src={iconLocation} alt="" />
                            {city},&#160;{country},&#160;{reference}
                        </p>
                    </div>
                    <div className={Styles.detailCheck}>
                        <div>
                            <p>Check-in*:</p>
                            <p>{checkin}</p>
                        </div>
                        <div>
                            <p>Check-out*:</p>
                            <p>{checkout}</p>
                        </div>

                    </div>
                    <button onClick={handleBooking}>Confirmar Reserva</button>
                    <div className={Styles.containerErrorBooking}>{errorBooking?errorBooking:null}</div>
                    <Modal open={modalSucceedIsOpen} onClose={closeModalSucceed} center>
                        <Succeed/>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default DetailBar;