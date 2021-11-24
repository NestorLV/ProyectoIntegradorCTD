import { useState, useEffect } from "react";
import Styles from "./styles.module.css"
import StylesApp from "../../App.module.css";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import {AxiosGetReservasPorProducto} from "../../axiosCollection/Product/AxiosProduct"

function DateBar(props) {
    const { valueDate, setValueDate } = props;
    const startDate = new Date(valueDate[0]);
    const endDate = new Date(valueDate[1]);
    const [size, setSize] = useState(`${window.innerWidth > 700 ? "desktop" : "mobile"}`);
    const [maxDate, setMaxDate] = useState(null);
    const [dinamicValue, setDinamicValue] = useState([sessionStorage.getItem("startDate") != null ? startDate : null, sessionStorage.getItem("endDate") != null ? endDate : null]);
    const [reservas,setReservas] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [errorMessage,setErrorMessage] = useState(""); 
    let reservasEnMs = () => reservas.map(reserva => new Date(reserva).setHours(0,0,0,0));

    window.addEventListener('resize', () => { setSize(`${window.innerWidth > 700 ? "desktop" : "mobile"}`) });  // funcion para ajustar el tamaño del calendario de desktop a mobile

    const theme = createTheme({
        palette: {
            primary: {
                main: "#F0572D",
            },
            text: {
                disabled: "rgba(0,0,0,0.38)"
            }
        },
        typography: {
            fontWeightRegular: 700,
            fontWeightMedium: 700,
            fontWeightLight: 700,
        },
    });

    const useStyles = makeStyles({
        root: {
            borderRadius: 5,
            color: "black",
            boxShadow: '10px 5px 5px grey',
            fontSize: 20,
            background: "white",
            height: "360px",
            width: "100%",
        }
    });
    const classes = useStyles();

    const handlePath = () => {
        let path = ""
        if (sessionStorage.getItem("log") === "true") {
            path = `/product/${props.id}/reserva`
        } else {
            path = "/login"
        }
        return path
    }  

    const handleChange = () => {
        /*  String Date  - aaaa,mm,dd  */
        if (startDate.getTime() >= new Date().setHours(0, 0, 0, 0)) {
            sessionStorage.setItem("startDate", startDate.toDateString());
            sessionStorage.setItem("endDate", endDate.toDateString());
        }
        props.setLastLocation(window.location.pathname)
        props.setBookingWithoutLogin(true)
    };

    function handleDateChange(newValue) {
        setValueDate(newValue);
        if (newValue[0] != null) {
            let sortReservasEnMs = reservasEnMs().sort((a, b) => a - b);
            const validacion = sortReservasEnMs.find(element => newValue[0].setHours(0, 0, 0, 0) < element)
            setMaxDate(validacion === undefined ? null : new Date(validacion))
        }
        setDinamicValue(newValue);
    }

    function disableDates(e) { return reservas.includes(e.toDateString()) }

    function handleDayBoxClose(newValue) {
        setDinamicValue(newValue);
        setMaxDate(null);
        handleDateChange(newValue);
        if(!newValue[0]){
            window.sessionStorage.removeItem("startDate");
        }else if(!newValue[1]){
            window.sessionStorage.removeItem("endDate");
        }
    }

    useEffect(() => {       
        AxiosGetReservasPorProducto(props.id, setReservas, setErrorMessage)  
            
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    return (
        <div className={`${Styles.dateBar} ${StylesApp.delimiter}`}>
            <div className={`${Styles.dateBarChild} ${StylesApp.delimiterChild}`}>
                <div className={Styles.dateBarTitleBox}>
                    <h2>Fechas Disponibles</h2>
                    <div className={Styles.dateBarDayContainer}>
                        {dinamicValue[0] !== null ?
                            <div className={Styles.dateBarDayBox}>
                                Desde: {dinamicValue[0].toLocaleDateString()}
                                <div className={Styles.dateBarTitleBoxClose} onClick={() => handleDayBoxClose([null, dinamicValue[1]])}>x</div>
                            </div>
                            : null}
                        {dinamicValue[1] !== null ?
                            <div className={Styles.dateBarDayBox}>
                                Hasta: {dinamicValue[1].toLocaleDateString()}
                                <div className={Styles.dateBarTitleBoxClose} onClick={() => handleDayBoxClose([dinamicValue[0], null])}>x</div>
                            </div>
                            : null}
                    </div>

                </div>

                <div className={Styles.contenedorInterno}>
                    <div className={Styles.contenedorCalendario}>
                        <ThemeProvider theme={theme} >
                            <LocalizationProvider dateAdapter={AdapterDateFns} >
                                <StaticDateRangePicker
                                    className={classes.root}
                                    displayStaticWrapperAs={size}
                                    calendars={window.innerWidth > 414 ? 2 : 1}
                                    minDate={new Date()}
                                    maxDate={maxDate}                                   
                                    value={valueDate}
                                    onChange={(newValue) => handleDateChange(newValue)}
                                    showToolbar={false}
                                    hintText="Dates Disabled"
                                    shouldDisableDate={disableDates}
                                    renderInput={(startProps, endProps) => (
                                        <React.Fragment>
                                            <TextField {...startProps} />
                                            <Box sx={{ mx: 2 }}> to </Box>
                                            <TextField {...endProps} />
                                        </React.Fragment>
                                    )}
                                />
                            </LocalizationProvider>
                        </ThemeProvider>
                    </div>
                    <div className={Styles.contenedorReservaBox}>
                        <div className={Styles.contenedorReserva}>
                            <p className={Styles.negrita}>Agregá tus fechas de viaje para tener precios exactos</p>
                            <div className={Styles.buttonsDateBar}>
                                <Link to={handlePath}>
                                    <button className={Styles.selectedDatesButton} onClick={handleChange}> Iniciar reserva</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DateBar;