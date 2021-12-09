import React, { useState, useEffect, useRef } from "react";
import Calendar from "./Calendar";
import Styles from "./styles.module.css"

function SelectDate({ setStartDate, setEndDate, startDate, endDate, borrarDate, setBorrarDate }) {
  const [calendarState, calendarSetState] = useState(Styles.hidden);
  const [responsiveState, responsiveSetState] = useState("desktop");

  const handleToggle = (event) => {
    const windowSize = window.innerWidth >= 680 ? (window.innerWidth <= 1080 ? Styles.visibleTablet : Styles.visible) : Styles.visible;
    event.preventDefault();
    calendarSetState(calendarState === Styles.hidden ? windowSize : Styles.hidden);
    responsiveSetState(window.innerWidth < 680 ? "mobile" : "desktop");
  };

  const [buttonState, buttonSetState] = useState("Check in - Check out");
  const handleSelected = (value) => {
    buttonSetState(value);
    calendarSetState(Styles.hidden);
  }

  const buttonRef = useRef();

  useEffect(() => {
    if (borrarDate) {
      console.log(buttonRef.current.Select);
      buttonRef.current.textContent = "Check in - Check out"
      setBorrarDate(false);
    }
    console.log(buttonRef.current.textContent);
  })



  return (
    <div className={Styles.calendarButton}>
      <button className={Styles.date} onClick={handleToggle} ref={buttonRef}>{buttonState}</button>
      <Calendar responsiveness={responsiveState} calendarState={calendarState} handleSelected={handleSelected} setStartDate={setStartDate} setEndDate={setEndDate} startDate={startDate} endDate={endDate} />
    </div>
  );
}

export default SelectDate;
