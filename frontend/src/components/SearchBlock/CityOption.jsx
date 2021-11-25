import React from "react";
import Styles from "./styles.module.css"

function CityOption({handleCity, id, city, country}) {
  return (
    <React.Fragment>
      <h3 className={Styles.titleCity} onClick = {() => {handleCity(id)}} >{city},&#160;</h3>
      <h3 className={Styles.titleCountry} onClick = {() => {handleCity(id)}} >{country}</h3>
    </React.Fragment>
  );
}

export default CityOption;
