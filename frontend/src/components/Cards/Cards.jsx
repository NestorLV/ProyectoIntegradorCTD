import React, { useState, useEffect } from "react";
import Styles from "./styles.module.css";
import StylesApp from "../../App.module.css";
import Card from "./Card.jsx";
import ClearFilters from "./ClearFilters";
import arrow from "./img/arrow.svg";
import {
  AxiosGetProductosRecomendados,
  AxiosGetProductosFavoritos,
  AxiosGetProductosPorCiudadFechaYCategoria,
} from "../../axiosCollection/Cards/AxiosCards";

export default function Cards({
  setLastLocation,
  handleClean,
  category,
  city,
  search,
  clickBusqueda,
  favourite,
  clickSeeFavourites,
  setCategory,
  setCity,
  setStartDate,
  setEndDate,
  setFavourite,
  setSearch,
  propStartDate,
  propEndDate,
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const limitCardPerPage = 8;
  const [numberPage, setNumberPage] = useState(1);
  const [titulo, setTitulo] = useState("Recomendaciones");
  const startDate =
    new Date(propStartDate).setHours(0, 0, 0, 0) >=
    new Date().setHours(0, 0, 0, 0)
      ? new Date(propStartDate)
      : null;
  const endDate =
    new Date(propEndDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0)
      ? new Date(propEndDate)
      : null;
  const [listadoFavoritos, setListadoFavoritos] = useState([]);

  useEffect(() => {
    AxiosGetProductosFavoritos(setListadoFavoritos, setErrorMessage);
    if (category === "All" && search === false && favourite === false) {
      AxiosGetProductosRecomendados(
        setData,
        setLoading,
        setTitulo,
        setErrorMessage
      );
      console.log("Ingreso al primer if");
    } else if (favourite === false) {
      AxiosGetProductosPorCiudadFechaYCategoria(
        setData,
        setLoading,
        setTitulo,
        setErrorMessage,
        city,
        startDate,
        endDate,
        category
      );
      console.log(category, "category");
      console.log(startDate);
      console.log(endDate);
      console.log("Ingreso al segundo if");
    } else if (favourite) {
      AxiosGetProductosFavoritos(setData, setErrorMessage);
      setListadoFavoritos(data);
      setTitulo(`Favoritos`);
      console.log("Ingreso al 3 if");
    } else {
      setErrorMessage("Error");
      setLoading(false);
      console.log("Ingreso al 4 if");
    }
  }, [category, clickBusqueda, favourite, clickSeeFavourites]);

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
        <h2>Resultados</h2>
        Resultados no disponibles - Falta la conexión con el Back
      </div>
    </div>
  ) : (
    <div className={`${StylesApp.delimiter}`}>
      <div className={`${Styles.cardsBlock} ${StylesApp.delimiterChild}`}>
        <h2>
          {titulo}
          <ClearFilters
            handleClean={handleClean}
            setCategory={setCategory}
            setCity={setCity}
            setTitulo={setTitulo}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setSearch={setSearch}
            setFavourite={setFavourite}
          />
        </h2>
        <div className={Styles.cardsBox}>
          {dataLimited().map((e) => (
            <Card
              setLastLocation={setLastLocation}
              image={e.images.length > 0 ? e.images[0].url : ""}
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
              favorite={
                listadoFavoritos.find((pf) => pf.id === e.id) ? true : false
              }
            />
          ))}
        </div>
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
  );
}
