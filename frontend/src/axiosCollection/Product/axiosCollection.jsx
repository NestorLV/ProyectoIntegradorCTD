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

export {AxiosGetProductoPorId, AxiosCalificarProducto}