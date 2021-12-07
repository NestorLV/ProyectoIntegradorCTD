import { useState, useEffect } from "react";
import StylesCalendar from "./stylesCalendar.module.css";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {AxiosGetReservasPorProducto} from "../../axiosCollection/Product/AxiosProduct"

function CalendarBar(props) {
    /* eslint-disable no-unused-vars */

    const { valueDate, setValueDate } = props;
    const startDate = new Date(valueDate[0]);
    const endDate = new Date(valueDate[1]);    
    const [maxDate, setMaxDate] = useState(null);
    const [dinamicValue, setDinamicValue] = useState([sessionStorage.getItem("startDate") != null ? startDate : null, sessionStorage.getItem("endDate") != null ? endDate : null]);
    const [info, setInfo] = useState(false);
    const [reservas,setReservas] = useState([]);
    const [errorMessage,setErrorMessage] = useState(""); 
    let reservasEnMs = () => reservas.map(reserva => new Date(reserva).setHours(0,0,0,0));

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
            fontSize: 16,
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

    function handleDateChange(newValue) {
        setValueDate(newValue);
        if (newValue[0] != null) {
            let sortReservasEnMs = reservasEnMs().sort((a, b) => a - b);
            const validacion = sortReservasEnMs.find(element => newValue[0].setHours(0, 0, 0, 0) < element)
            setMaxDate(validacion === undefined ? null : new Date(validacion))
            sessionStorage.setItem("startDate", newValue[0].toDateString());
        }

        if(newValue[1] != null){
            sessionStorage.setItem("endDate", newValue[1].toDateString());
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
 
    }, []); 

    return (
        <div className={`${StylesCalendar.dateBar}`}>
            <div className={StylesCalendar.dateBarTitleBox}>
                <div className={StylesCalendar.dateBarTitle}>
                    <h2>Seleccioná tu fecha de reserva 
                        <div className={StylesCalendar.infoBox}>
                            <svg onMouseOver={() => setInfo(true)}
                                onMouseOut={() => setInfo(false)}
                                aria-hidden="true" focusable="false" data-prefix="fas" data-icon="info-circle" className="svg-inline--fa fa-info-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z">
                                </path>
                            </svg>
                            {info ? <p className={StylesCalendar.calendarInfo}>Seleccione las fechas de la reserva.  Para modificar o borrar la selección, elimine la etiqueta con la cruz.</p> : null}
                        </div>
                    </h2>
                </div>
                <div className={StylesCalendar.dateBarDayContainer}>
                    {dinamicValue[0] !== null?
                        <div className={StylesCalendar.dateBarDayBox}>
                            Desde: {dinamicValue[0].toLocaleDateString()}
                            <div className={StylesCalendar.dateBarTitleBoxClose} onClick={() => handleDayBoxClose([null, dinamicValue[1]])}>x</div>
                        </div>
                        : null}
                    {dinamicValue[1] !== null ?
                        <div className={StylesCalendar.dateBarDayBox}>
                            Hasta: {dinamicValue[1].toLocaleDateString()}
                            <div className={StylesCalendar.dateBarTitleBoxClose} onClick={() => handleDayBoxClose([dinamicValue[0], null])}>x</div>
                        </div>
                        : null}
                </div>
            </div>

            <div className={StylesCalendar.contenedorInterno}>
                <div className={StylesCalendar.contenedorCalendario}>
                    <ThemeProvider theme={theme} >
                        <LocalizationProvider dateAdapter={AdapterDateFns} >
                            <StaticDateRangePicker
                                className={classes.root}
                                displayStaticWrapperAs="desktop"
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
            </div>

        </div>

    )
}

export default CalendarBar;