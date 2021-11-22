import React from "react";
import Styles from "./styles.module.css"

function TimeOption({setArrivalSchedule, time }) {
    return (
        <div className={Styles.timeOption} onClick = {() => {setArrivalSchedule(time)}} >{time}</div>
    );
  }
  
  export default TimeOption;