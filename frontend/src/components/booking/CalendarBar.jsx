import { useState } from "react";
import Styles from "./styles.module.css";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import iconInfo from './icons/info-circle-solid.svg'

function CalendarBar(props) {
    const { valueDate, setValueDate } = props;
    const startDate = new Date(valueDate[0]);
    const endDate = new Date(valueDate[1]);
    const booksMadeDate = [new Date(2021, 10, 30).setHours(0, 0, 0, 0), new Date(2021, 10, 28).setHours(0, 0, 0, 0), new Date(2021, 11, 8).setHours(0, 0, 0, 0), new Date(2021, 11, 15).setHours(0, 0, 0, 0)]
    const booksMade = [new Date(2021, 10, 30).toDateString(), new Date(2021, 10, 28).toDateString(), new Date(2021, 11, 8).toDateString(), new Date(2021, 11, 15).toDateString()] // arreglo de fecha reservadas,  ojo con los mes son de 0 a 11
    const [maxDate, setMaxDate] = useState(null);
    const [dinamicValue, setDinamicValue] = useState([sessionStorage.getItem("startDate") != null ? startDate : null, sessionStorage.getItem("endDate") != null ? endDate : null]);
    const [info, setInfo] = useState(false);


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

    const handleChange = () => {
        /*  String Date  - aaaa,mm,dd  */
        if (startDate.getTime() >= new Date().setHours(0, 0, 0, 0)) {
            sessionStorage.setItem("startDate", startDate.toDateString());
            sessionStorage.setItem("endDate", endDate.toDateString());
            console.log(valueDate, "valueDate");
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
        window.sessionStorage.clear();
    }
    return (
        <div className={`${Styles.dateBar}`}>
            <div className={Styles.dateBarTitleBox}>
                <div className={Styles.dateBarTitle}>
                    <h2>Seleccioná tu fecha de reserva</h2>
                    <div className={Styles.infoBox}>
                        <svg onMouseOver={() => setInfo(true)}
                            onMouseOut={() => setInfo(false)}
                            aria-hidden="true" focusable="false" data-prefix="fas" data-icon="info-circle" class="svg-inline--fa fa-info-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z">
                            </path>
                        </svg>
                        {info ? <p className={Styles.calendarInfo}>Seleccione las fechas de la reserva.  Para modificar o borrar la selección, elimine la etiqueta con la cruz.</p> : null}
                    </div>
                </div>
                <div className={Styles.dateBarDayContainer}>
                    {dinamicValue[0] != null && dinamicValue[0] != "" ?
                        <div className={Styles.dateBarDayBox}>
                            Desde: {dinamicValue[0].toLocaleDateString()}
                            <div className={Styles.dateBarTitleBoxClose} onClick={() => handleDayBoxClose([null, dinamicValue[1]])}>x</div>
                        </div>
                        : null}
                    {dinamicValue[1] != null && dinamicValue[0] != "" ?
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