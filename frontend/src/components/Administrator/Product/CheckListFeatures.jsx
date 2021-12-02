import React, {useEffect} from "react"

export default function({features}){

    //VER SI FUNCIONA CUANDO SE HACE EL SUBMIT
    let casillas = document.querySelectorAll("input[type='checkbox']")
    let casillasSeleccionadas=[]

    useEffect(()=>{
        casillas.forEach((casilla)=>{
            if(casilla.checked){
                casillasSeleccionadas.push(casilla)
            }
        })
    })
   

    console.log(casillas);
    console.log(casillasSeleccionadas);
    return(
        features.map((option, index)=>{
            return(
<<<<<<< HEAD
                <label><input type="checkbox" id={index+1} value={option}/> {option}</label>
=======
                <label><input type="checkbox" id={index+1} value={option.name}/> {option.name}</label>
>>>>>>> 530754a770a45556467620ddbc553ea3f4f40309
            )
        })
        
    )
}