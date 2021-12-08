import React, { useState, useEffect } from "react";
import Styles from "./styles.module.css";
import StylesApp from "../../App.module.css";
import Book from "./Book.jsx";
import arrow from "./img/arrow.svg";
import TitleBar from "../Product/TitleBar";
import { AxiosGetProductosFavoritos } from "../../axiosCollection/Cards/AxiosCards";
import { AxiosGetReservationsByUserId } from "../../axiosCollection/MyBookings/AxiosMyBookings";


export default function MyBookings(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const limitCardPerPage = 8;
  const [numberPage, setNumberPage] = useState(1);

  const [listadoFavoritos, setListadoFavoritos] = useState([]);

  useEffect(() => {
    AxiosGetProductosFavoritos(setListadoFavoritos, setErrorMessage);
    AxiosGetReservationsByUserId(setData, setLoading, setErrorMessage);
    /*axios.get(`http://localhost:8080/reservations/get/user/${sessionStorage.getItem("id")}`)
      .then(response => {
        setData(response.data);
        setLoading(false);
        console.log(response.data, "data mybookings");
      })
      .catch(error => {
        setErrorMessage(error.message);
        setLoading(false);
      })*/
    setNumberPage(1);
  }, []);


  const dataLimited = () =>
    data.slice(
      (numberPage - 1) * limitCardPerPage,
      numberPage * limitCardPerPage
    );

  const indexPages = () => {
    let pages = [];
    let cant =
      data.length % limitCardPerPage === 0
        ? data.length / limitCardPerPage
        : Math.floor(data.length / limitCardPerPage) + 1;
    for (let i = 0; i < cant; i++) {
      pages.push(
        <button
          onClick={() => setNumberPage(i + 1)}
          disabled={numberPage - 1 === i}
          key={i + 1}
        >
          {i + 1}
        </button>
      );
    }
    return pages;
  };


  return errorMessage && loading ? (
    <div className={`${StylesApp.delimiter}`}>
      <div className={`${Styles.cardsBlock} ${StylesApp.delimiterChild}`}>
        <h2>Reservas</h2>
        Resultados no disponibles - Falta la conexión con el Back
      </div>
    </div>
  ) : (
    <>
      <TitleBar name="Mis reservas" goBack={props.goBack} />
      <div className={`${StylesApp.delimiter}`}>
        <div className={`${Styles.cardsBlock} ${StylesApp.delimiterChild}`}>
          {data.length != 0 ?
            <div className={Styles.cardsBox}>{
             dataLimited().map((e) => (
              <Book
                key={e.id}
                id={e.productId}
                reservationId={e.id}
                startDate={e.startDate}
                endDate={e.endDate}
              />
              ))}
            </div>
            : <div className={Styles.sinReservas}>No hay reservas disponibles</div>}
          <div className={Styles.pages}>
            {numberPage > 1 && (
              <img
                className={Styles.left}
                onClick={() => setNumberPage(numberPage - 1)}
                src={arrow}
                alt="arrowLeft"
              />
            )}
            {indexPages()}
            {numberPage < indexPages().length && (
              <img
                className={Styles.right}
                onClick={() => setNumberPage(numberPage + 1)}
                src={arrow}
                alt="arrowRight"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
