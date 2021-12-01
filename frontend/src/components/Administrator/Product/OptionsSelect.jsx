import React from "react";

function OptionsSelect({valor, setValor}) {
    return (
        <div onClick = {() => {setValor(valor)}} >{valor}</div>
    );
  }
  
  export default OptionsSelect;