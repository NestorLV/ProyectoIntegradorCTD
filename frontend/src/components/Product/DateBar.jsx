import { useState } from "react";
import Styles from "./styles.module.css"
import StylesApp from "../../App.module.css";
import * as React from 'react';
import addDays from 'date-fns/addDays';
import TextField from '@mui/material/TextField';
import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from "@mui/material/styles";
const { format } = require("date-fns");


function DateBar(props) {
    /* const [value, setValue] = useState([null, null]); */
    const { valueDate, setValueDate } = props;
    const startDate = new Date(valueDate[0]);
    const endDate = new Date(valueDate[1]);
    const [size, setSize] = useState(`${window.innerWidth>700?"desktop":"mobile"}`);

    window.addEventListener('resize', () => {setSize(`${window.innerWidth>700?"desktop":"mobile"}`)});  // funcion para ajustar el tamaño del calendario de desktop a mobile


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
            height: "330px",
            width: "100%",
        }
    });
    const classes = useStyles();

    const handleChange = (event) => {
        event.preventDefault();
        localStorage.setItem("startDate", startDate.toDateString());
        localStorage.setItem("endDate", endDate.toDateString());
        console.log(valueDate, "valueDate");
    };

    return (
        <div className={`${Styles.dateBar} ${StylesApp.delimiter}`}>
            <div className={`${Styles.dateBarChild} ${StylesApp.delimiterChild}`}>
                <h2>Fechas Disponibles</h2>
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
                            <button className={Styles.selectedDatesButton} onClick={handleChange}>Iniciar reserva</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DateBar;