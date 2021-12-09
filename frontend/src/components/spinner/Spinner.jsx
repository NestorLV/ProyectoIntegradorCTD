import React from "react";
import Styles from "./styles.module.css";

function Spinner() {
  return (
      <div className={Styles.spinnerContainer}>
        <div className={Styles.spinner}></div>
      </div>
  );
}

export default Spinner;
