import axios from "axios";

function AxiosGetProductoPorId(id, setProd, setLoading, setErrorMessage){
    axios
    .get(`http://localhost:8080/products/get/${id}`)
    .then((response) => {
        setProd(response.data);
        setLoading(false);                
    })
    .catch((error) => {
        setErrorMessage("No es posible mostrar la página");
    });
}

function AxiosCalificarProducto(starIndex, id, setCalificacion_text, setErrorMessage){
    axios
    .post("http://localhost:8080/products/scores/create", {
        score: starIndex,
        userEmail: sessionStorage.getItem('email'),
        productId: id
    })
    .then((response) => {
        if (response.status === 200) {
            setCalificacion_text(`Se envió correctamente la puntuación de: ${starIndex}`);
        }

    })
    .catch((error) => {
        setErrorMessage(error);
    });
}

function AxiosGetReservasPorProducto(idProducto, setReservas, setErrorMessage){    
    axios
    .get(`http://localhost:8080/reservations/get/product/${idProducto}`)
    .then((response) => {
        let reservas = [];
        (response.data).forEach(reserva => {            
            let startDateReserva = new Date(reserva.startDate).setHours(0,0,0,0)+ 86400000;
            let endDateReserva = new Date(reserva.endDate).setHours(0,0,0,0)+ 86400000;
            let i = startDateReserva;
            while(i <= endDateReserva ){
                reservas.push(new Date(i).toDateString());
                i+=86400000;
            }
        });    
        setReservas(reservas);
        console.log(reservas, "reservas");                    
    })
    .catch((error) => {
        setErrorMessage("No es posible mostrar la página");
    });
}

export {AxiosGetProductoPorId, AxiosCalificarProducto, AxiosGetReservasPorProducto}