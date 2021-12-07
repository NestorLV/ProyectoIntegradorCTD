import React from 'react';
import SearchForm from './SearchForm';
import Styles from "./styles.module.css"
import StylesApp from "../../App.module.css"

function SearchBlock({borrarCity, setBorrarCity, borrarDate, setBorrarDate, handleSearch, handleCity, setStartDate, setEndDate, startDate, endDate}) {
    return (
        <div className={`${Styles.container} ${StylesApp.delimiter}`}>
            <div className={`${Styles.subContainer} ${StylesApp.delimiterChild}`}>
                <h1>Buscá ofertas en hoteles, casas y mucho más</h1>
                <SearchForm borrarCity={borrarCity} setBorrarCity={setBorrarCity} borrarDate={borrarDate} setBorrarDate={setBorrarDate} handleSearch={handleSearch} handleCity = {handleCity} setStartDate={setStartDate} setEndDate={setEndDate} startDate={startDate} endDate={endDate}/>
            </div>
        </div>
    )
}

export default SearchBlock;