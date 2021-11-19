import React from "react";

export default function ScoreDescription({qualification}) {    
    const scoreLetter = (valor) => {
        if (valor >= 8 && valor <= 10) return "Excelente";
        if (valor >= 6 && valor < 8) return "Muy Bueno";
        if (valor >= 4 && valor < 6) return "Bueno";
        if (valor >= 2 && valor < 4) return "Regular";
        if (valor >= 0 && valor < 2) return "Malo";
        else { return "Calificacion Invalida" }
    }

    return (
        <p>{scoreLetter(qualification)}</p>
    )
}