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
import Booking from "../booking/Booking";
import { Route } from "react-router";


function DateBar(props) {
    /* const [value, setValue] = useState([null, null]); */
    const { valueDate, setValueDate } = props;
    const startDate = new Date(valueDate[0]);
    const endDate = new Date(valueDate[1]);
    const [size, setSize] = useState(`${window.innerWidth > 700 ? "desktop" : "mobile"}`);
    const booksMade = [new Date(2021, 10, 30).toString(), new Date(2021, 10, 28).toString(), new Date(2021,11,8).toString()] // arreglo de fecha reservadas,  ojo con los mes son de 0 a 11
    
    window.addEventListener('resize', () => { setSize(`${window.innerWidth > 700 ? "desktop" : "mobile"}`) });  // funcion para ajustar el tamaño del calendario de desktop a mobile

    const theme = createTheme({
        palette: {
            primary: {
                main: "#F0572D",
            },
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

    const handleChange = (event) => {
        /*  String Date  - aaaa,mm,dd  */
        if(startDate.getTime() >= new Date().setHours(0,0,0,0)){
            sessionStorage.setItem("startDate", startDate.toDateString());
            sessionStorage.setItem("endDate", endDate.toDateString());
            console.log(valueDate, "valueDate");
        }
       
    };

    function disableDates(e) { return booksMade.includes(e.toString())}

    return (
        <div className={`${Styles.dateBar} ${StylesApp.delimiter}`}>
            <div className={`${Styles.dateBarChild} ${StylesApp.delimiterChild}`}>
                <h2>Fechas Disponibles</h2>
                {console.log(booksMade, "booksMade")}
                <div className={Styles.contenedorInterno}>
                    <div className={Styles.contenedorCalendario}>
                        <ThemeProvider theme={theme} >
                            <LocalizationProvider dateAdapter={AdapterDateFns} >
                                <StaticDateRangePicker
                                    className={classes.root}
                                    displayStaticWrapperAs={size}
                                    calendars={window.innerWidth > 414 ? 2 : 1}
                                    minDate={new Date()}
                                    value={valueDate}
                                    onChange={(newValue) => setValueDate(newValue)}
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
                            <Link to={`/product/${props.id}/reserva`} >
                               <button className={Styles.selectedDatesButton} onClick={handleChange}> Iniciar reserva</button>
                            </Link>
                        </div>

                          
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DateBar;