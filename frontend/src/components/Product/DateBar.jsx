import { useState } from "react";
import Styles from "./styles.module.css"
import StylesApp from "../../App.module.css";
import * as React from 'react';
/* import addDays from 'date-fns/addDays'; */
import TextField from '@mui/material/TextField';
import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from "@mui/material/styles";
/* const { format } = require("date-fns"); */
import { Link } from "react-router-dom";


function DateBar(props) {    
    const { valueDate, setValueDate } = props;
    const startDate = new Date(valueDate[0]);
    const endDate = new Date(valueDate[1]);
    const [size, setSize] = useState(`${window.innerWidth > 700 ? "desktop" : "mobile"}`);
    const booksMadeDate = [new Date(2021, 10, 30).setHours(0, 0, 0, 0), new Date(2021, 10, 28).setHours(0, 0, 0, 0), new Date(2021, 11, 8).setHours(0, 0, 0, 0), new Date(2021, 11, 15).setHours(0, 0, 0, 0)]
    const booksMade = [new Date(2021, 10, 30).toDateString(), new Date(2021, 10, 28).toDateString(), new Date(2021, 11, 8).toDateString(), new Date(2021, 11, 15).toDateString()] // arreglo de fecha reservadas,  ojo con los mes son de 0 a 11
    const [maxDate, setMaxDate] = useState(null);
    const [dinamicValue, setDinamicValue] = useState([sessionStorage.getItem("startDate")!=null?startDate:null, sessionStorage.getItem("endDate")!=null?endDate:null]);

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

    const handleChange = () => {
        /*  String Date  - aaaa,mm,dd  */
        if (startDate.getTime() >= new Date().setHours(0, 0, 0, 0)) {
            sessionStorage.setItem("startDate", startDate.toDateString());
            sessionStorage.setItem("endDate", endDate.toDateString());           
        } 
    };

    function handleDateChange(newValue) {
        setValueDate(newValue);
        if (newValue[0] != null) {
            let sortBooksMadeDate = booksMadeDate.sort((a, b) => a - b);
            const validacion = sortBooksMadeDate.find(element => newValue[0].setHours(0, 0, 0, 0) < element)
            setMaxDate(validacion == undefined ? null : new Date(validacion))
        }
        setDinamicValue(newValue);
    }

    function disableDates(e) { return booksMade.includes(e.toDateString()) }

    function handleDayBoxClose(newValue) {
        setDinamicValue(newValue);
        setMaxDate(null);
        handleDateChange(newValue);
    }

    return (
        <div className={`${Styles.dateBar} ${StylesApp.delimiter}`}>
            <div className={`${Styles.dateBarChild} ${StylesApp.delimiterChild}`}>
                <div className={Styles.dateBarTitleBox}>
                    <h2>Fechas Disponibles</h2>
                    <div className={Styles.dateBarDayContainer}>
                        {dinamicValue[0] != null && dinamicValue[0] != ""?
                            <div className={Styles.dateBarDayBox}>
                                Desde: {dinamicValue[0].toLocaleDateString()}
                                <div className={Styles.dateBarTitleBoxClose} onClick={() => handleDayBoxClose([null, dinamicValue[1]])}>x</div>
                            </div>
                            : null}
                        {dinamicValue[1] != null && dinamicValue[0] != ""?
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
                                <Link to={`/product/${props.id}/reserva`} >
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