/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import Select from 'react-select';
import CityOption from './CityOption';
import vector from './img/Vector.png'
import localizador from './img/localizador.png'
import { AxiosGetAllCities } from "../../axiosCollection/SearchBlock/AxiosSearchBlock";


function SelectCity({ handleCity, borrarCity, setBorrarCity }) {

  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    AxiosGetAllCities(setData, setErrorMessage)
  }, []);

  const selectInputRef = useRef();


  useEffect(() => {
    if (borrarCity) {
      console.log(selectInputRef.current.Select);
      selectInputRef.current.clearValue()
      setBorrarCity(false);
    }
  })


  console.log(borrarCity);



  /*
  setOnClear(handleClick)

  function handleClick(){
    selectInputRef.current.select.clearValue()
  }*/

  const customStyles = {
    option: () => ({
      borderBottom: 'solid 2px #F0572D',
      fontWeight: 500,
      padding: '0.5rem 2.5rem',
      position: 'relative',
      textAlign: 'left',
      width: '100%',
      zIndex: '10',
      ':after': {
        backgroundImage: `url(${vector})`,
        backgroundRepeat: 'no-repeat',
        borderRadius: '10px',
        content: '" "',
        display: 'block',
        height: '25px',
        marginRight: '8px',
        left: '12px',
        position: 'absolute',
        top: '16px',
        width: '25px',
      },
      ':hover': {
        backgroundColor: '#f0d7d1',
        cursor: 'pointer',
      },
      ':last-child': {
        borderBottom: 'none',
      }
    }),

    indicatorsContainer: () => ({
      display: 'none',
    }),

    valueContainer: () => ({
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      border: 'none',
      borderRadius: '5px',
      display: 'flex',
      height: '100%',
      margin: '0',
      overflow: 'hidden',
      padding: '0 0 0 0%',
      textAlign: 'left',
      width: '100%',
    }),

    control: (styles) => ({
      ...styles,
      backgroundColor: '#FFFFFF',
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.15)',
      cursor: "pointer",
      display: 'inline-block',
      fontWeight: 500,
      height: '40px',
      maxWidth: '100%',
      overflow: 'hidden',
      padding: '0.6rem 1rem 0.6rem 2.5rem',
      whiteSpace: 'nowrap',
      width: '100%',
      ':before': {
        backgroundImage: `url(${localizador})`,
        backgroundRepeat: 'no-repeat',
        borderRadius: '10px',
        content: '" "',
        display: 'block',
        height: '25px',
        marginRight: '8px',
        left: '10px',
        position: 'absolute',
        top: '5px',
        width: '25px',
      },
    }),

    container: () => ({
      boxShadow: '0px 1px 5px rgb(0 0 0 / 15%)',
    }),

    placeholder: () => ({
      color: '#31363F',
      fontSize: '12pt',
      fontWeight: 500,
      width: '100%',
    }),

    singleValue: () => ({
      display: 'flex',
    })
  }

  const options = data.map((city) => {
    return {
      value: `${city.name}, ${city.country}`,
      label: <CityOption city={city.name} id={city.id} handleCity={handleCity} country={city.country} />,
    };
  })


  /*<button onClick={onClear}>Clear Value</button>*/

  return (
    <>
      <Select
        ref={selectInputRef}
        placeholder='¿A dónde vamos?'
        styles={customStyles}
        options={options}
        isSearchable
        isClearable
        getOptionValue={(option) => `${option.value}:`
        }
      />

    </>
  );
}

export default SelectCity;
