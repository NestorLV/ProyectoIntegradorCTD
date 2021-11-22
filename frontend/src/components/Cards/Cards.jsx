import React, { useState, useEffect } from 'react';
import Styles from './styles.module.css';
import StylesApp from "../../App.module.css"
import Card from './Card.jsx';
import arrow from "./img/arrow.svg";
import { AxiosGetProductosRecomendados, AxiosGetProductosPorCategoria, AxiosGetProductosPorCiudad, AxiosGetProductosFavoritos, AxiosGetProductosPorCiudadFechaYCategoria } from '../../axiosCollection/Cards/AxiosCards';

export default function Cards({ setLastLocation, category, city, search, clickBusqueda, favourite }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const limitCardPerPage = 8;
    const [numberPage, setNumberPage] = useState(1);
    const [titulo, setTitulo] = useState("Recomendaciones");
    const startDate = sessionStorage.getItem("startDate") && new Date(sessionStorage.getItem("startDate"));
    const endDate = sessionStorage.getItem("endDate") && new Date(sessionStorage.getItem("endDate"));

    useEffect(() => {
        if (category === "All" && search === false && favourite === false) {
            AxiosGetProductosRecomendados(setData, setLoading, setTitulo, setErrorMessage)

            /*  } else if (category !== "All" && search === false && city === "" && favourite === false) {
                  AxiosGetProductosPorCategoria(setData, setLoading, setTitulo, setErrorMessage, category)
      
              } else if (search && city !== "") {
                  AxiosGetProductosPorCiudad(setData, setLoading, setTitulo, setErrorMessage, city)
      
              } else if (favourite) {
                  AxiosGetProductosFavoritos(setData, setLoading, setTitulo, setErrorMessage)
              } else {
                  setErrorMessage("Error");
                  setLoading(false);
              }*/
        } else {
            AxiosGetProductosPorCiudadFechaYCategoria(setData, setLoading, setTitulo, setErrorMessage, city, startDate, endDate, category)
        }
    }, [category, clickBusqueda, favourite]);

    const dataLimited = () => data.slice((numberPage - 1) * limitCardPerPage, numberPage * limitCardPerPage);
    const indexPages = () => {
        let pages = [];
        let cant = data.length % limitCardPerPage === 0 ? data.length / limitCardPerPage : Math.floor(data.length / limitCardPerPage) + 1
        for (let i = 0; i < cant; i++) { pages.push(<button onClick={() => setNumberPage(i + 1)} disabled={numberPage - 1 === i}>{i + 1}</button>) };
        return pages
    };

    return (
        (errorMessage && loading) ?
            <div className={`${StylesApp.delimiter}`}>
                <div className={`${Styles.cardsBlock} ${StylesApp.delimiterChild}`}>
                    <h2>Resultados</h2>
                    Resultados no disponibles - Falta la conexión con el Back
                </div>
            </div>
            :
            <div className={`${StylesApp.delimiter}`}>
                <div className={`${Styles.cardsBlock} ${StylesApp.delimiterChild}`}>
                    <h2>{titulo}</h2>
                    <div className={Styles.cardsBox}>
                        {console.log(data, "dataCARDS")}
                        {dataLimited().map((e) =>
                            <Card setLastLocation={setLastLocation} image={e.images.length > 0 ? e.images[0].url : ""}
                                cardCategory={e.category.title}
                                name={e.name}
                                city={e.city.name}
                                country={e.city.country}
                                description={e.description}
                                key={e.id}
                                id={e.id}
                                reference={e.reference}
                                qualification={e.qualification * 2}
                                features={e.features}
                                latitude={e.latitude}
                                longitude={e.longitude}
                                address={e.address}
                                favorite={e.favourite}
                            />
                        )}
                    </div>
                    <div className={Styles.pages}>
                        {numberPage > 1 && <img className={Styles.left} onClick={() => setNumberPage(numberPage - 1)} src={arrow} alt="arrowLeft" />}
                        {indexPages()}
                        {numberPage < indexPages().length && <img className={Styles.right} onClick={() => setNumberPage(numberPage + 1)} src={arrow} alt="arrowRight" />}
                    </div>
                </div>
            </div>
    )
}

