import React, { useState, useEffect } from 'react';
import Styles from './styles.module.css';
import StylesApp from "../../App.module.css"
import Card from './Card.jsx';
import axios from "axios";
import arrow from "./img/arrow.svg";

export default function Cards({ category, city, search, clickBusqueda, favourite }) {
    const baseUrl = "http://localhost:8080/"
    const baseUrlProductosRecomendados = `${baseUrl}products/get/recommended`;
    const baseUrlPorCategoria = `${baseUrl}products/get/category/${category}`;
    const baseUrlPorCiudad = `${baseUrl}products/get/city/${city}`;
    const baseUrlFavourite = `${baseUrl}users/getFavorites`;
    //const baseUrlPorFecha = `http://localhost:8080/products/date`;
    //const baseUrlPorCiudadYFecha = `http://localhost:8080/products/search/date/${search}`;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const limitCardPerPage = 8;
    const [numberPage, setNumberPage] = useState(1);
    const [titulo, setTitulo] = useState("Recomendaciones");

    useEffect(() => {
        if (category === "All" && search === false && favourite === false) {
            axios.get(baseUrlProductosRecomendados)
                .then(response => {
                    setData(response.data);
                    setLoading(false);
                    setTitulo("Recomendaciones");

                })
                .catch(error => {
                    setErrorMessage(error.message);
                    setLoading(false);
                });
        } else if (category !== "All" && search === false && city === "" && favourite === false) {
            axios.get(baseUrlPorCategoria)
                .then(response => {
                    setData(response.data);
                    setLoading(false);
                    setTitulo(`Resultados para ${category}`);
                })
                .catch(error => {
                    setErrorMessage(error.message);
                    setLoading(false);
                });
        } else if (search && city !== "") {
            axios.get(baseUrlPorCiudad)
                .then(response => {
                    setData(response.data);
                    setLoading(false);
                    setTitulo(`Resultados para ${response.data[0].city.name}`);
                })
                .catch(error => {
                    setErrorMessage(error.message);
                    setLoading(false);
                });
        } else if (favourite) {
            axios.post(baseUrlFavourite,{email: sessionStorage.getItem("email")})
                .then(response => {
                    setData(response.data);
                    setLoading(false);
                    setTitulo(`Favoritos`);
                })
                .catch(error => {
                    setErrorMessage(error.message);
                    setLoading(false);
                });
        } else {
            setErrorMessage("Error");
            setLoading(false);
        }
        

    }, [category, clickBusqueda, favourite]);

    const handleFavorite = (e) => {

    }

    const dataLimited = () => { return data.slice((numberPage - 1) * limitCardPerPage, numberPage * limitCardPerPage); };
    const indexPages = () => {
        let pages = [];
        let cant = data.length % limitCardPerPage === 0 ? data.length / limitCardPerPage : Math.floor(data.length / limitCardPerPage) + 1
        for (let i = 0; i < cant; i++) { pages.push(<button onClick={() => setNumberPage(i + 1)} disabled={numberPage-1===i}>{i + 1}</button>) };
        return pages
    };

    if (errorMessage && loading) {
        return (
            <div className={`${StylesApp.delimiter}`}>
                <div className={`${Styles.cardsBlock} ${StylesApp.delimiterChild}`}>
                    <h2>Resultados</h2>
                    Resultados no disponibles - Falta la conexión con el Back
                </div>
            </div>
        );
    }
    else {
        return (
            <div className={`${StylesApp.delimiter}`}>
                <div className={`${Styles.cardsBlock} ${StylesApp.delimiterChild}`}>
                    <h2>{titulo}</h2>
                    <div className={Styles.cardsBox}>
                    {console.log(data,"dataCARDS")}
                        {dataLimited().map((e, index) =>
                            <Card image={e.images.length > 0 ? e.images[0].url : ""}
                                cardCategory={e.category.title}
                                name={e.name}
                                city={e.city.name}
                                country={e.city.country}
                                description={e.description}
                                key={index}
                                id={e.id}
                                reference={e.reference}
                                qualification={e.qualification}
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
        );
    }

}

