import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";
import StaticDateRangePicker from "@mui/lab/StaticDateRangePicker";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Styles from "./styles.module.css";
const { format } = require("date-fns");

function Calendar(props) {
  const [value, setValue] = useState([props.startDate != null ? props.startDate : null, props.endDate != null ? props.endDate : null]);
  const startDate = new Date(value[0]);
  const endDate = new Date(value[1]);
  const startDateToString = `${format(startDate, "dd")} de ${format(
    startDate,
    "MMM"
  )} de ${format(startDate, "y")}`;
  const endDateToString = `${format(endDate, "dd")} de ${format(
    endDate,
    "MMM"
  )} de ${format(endDate, "y")}`;

  const handleSelection = (event) => {
    event.preventDefault();    
    if (endDate.setHours(0, 0, 0, 0) > startDate.setHours(0, 0, 0, 0)) {
      props.handleSelected(`${startDateToString} - ${endDateToString}`);
      sessionStorage.setItem("startDate", startDate.toDateString());
      sessionStorage.setItem("endDate", endDate.toDateString());
      props.setStartDate(startDate.toDateString());
      props.setEndDate(endDate.toDateString());
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#F0572D",
      },
    },
  });


  return (
    <div className={props.calendarState}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={{ minWidth: 380 }}>
            <StaticDateRangePicker
              displayStaticWrapperAs={props.responsiveness}
              showToolbar={false}
              value={value}
              minDate={new Date()}
              onChange={(newValue) => setValue(newValue)}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField {...endProps} />
                </React.Fragment>
              )}
            />
            <div className={Styles.containerCalendarSelectedDates}>
              <button
                className={Styles.selectedDatesButton}
                onClick={handleSelection}
              >
                Aplicar
              </button>
            </div>
          </Box>
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
}

export default Calendar;
