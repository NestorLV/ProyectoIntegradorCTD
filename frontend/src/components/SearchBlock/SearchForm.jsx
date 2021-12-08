import React from "react";
import SelectCity from "./SelectCity";
import SelectDate from "./SelectDate";
import Styles from "./styles.module.css"

function SearchForm({ borrarCity, setBorrarCity, borrarDate, setBorrarDate, handleSearch, handleCity, setStartDate, setEndDate, startDate, endDate }) {

  return (
    <form className={Styles.gridContainer} action="">
      <div className={`${Styles.iconSelectBox} grid-item`}>
        <SelectCity handleCity={handleCity} borrarCity={borrarCity} setBorrarCity={setBorrarCity}/>
      </div>
      <div className={`${Styles.iconSelectBox} grid-item`}>
        <SelectDate setStartDate={setStartDate} setEndDate={setEndDate} startDate={startDate} endDate={endDate} borrarDate={borrarDate} setBorrarDate={setBorrarDate}/>
      </div>
      {/*       <button onClick={(e) => {handleSearch(e)}} handleCity = {handleCity} className={`${Styles.buttonSearch} limitation`}>Buscar</button>*/}
      <button onClick={(e) => { handleSearch(e) }} className={`${Styles.buttonSearch} limitation`}>Buscar</button>
    </form>
  );
}

export default SearchForm;