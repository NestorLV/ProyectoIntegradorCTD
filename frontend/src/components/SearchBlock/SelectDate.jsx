import React, { useState } from "react";
import Calendar from "./Calendar";
import Styles from "./styles.module.css"

function SelectDate() {
  const [calendarState, calendarSetState] = useState(Styles.hidden);
  const [responsiveState, responsiveSetState] = useState("desktop");

  const handleToggle = (event) => {
    const windowSize = window.innerWidth >=680 ? (window.innerWidth<=1080?Styles.visibleTablet :Styles.visible) : Styles.visible;
    event.preventDefault();
    calendarSetState(calendarState === Styles.hidden ? windowSize : Styles.hidden);
    responsiveSetState(window.innerWidth < 680 ? "mobile" : "desktop");
  };

  const [buttonState, buttonSetState] = useState("Check in - Check out");
  const handleSelected = (value) => {
    buttonSetState(value);
    calendarSetState(Styles.hidden);
  }

  return (
    <div className={Styles.calendarButton}>
      <button className={Styles.date} onClick={handleToggle}>{buttonState}</button>
      <Calendar responsiveness={responsiveState} calendarState={calendarState} handleSelected={handleSelected} />
    </div>
  );
}

export default SelectDate;
