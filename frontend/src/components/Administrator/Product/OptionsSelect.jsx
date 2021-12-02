import React from "react";

function OptionsSelect({valor, setValor}) {
    return (
        <div onClick = {() => {setValor({id: valor.id, name:valor.name})}} >{valor.name}</div>
    );
  }
  
  export default OptionsSelect;