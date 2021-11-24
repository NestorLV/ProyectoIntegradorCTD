/*COMPONENTE CARDS*/
import axios from "axios";
const { format } = require("date-fns");

const baseUrl = "http://localhost:8080/"

function AxiosGetProductosRecomendados(setData, setLoading, setTitulo, setErrorMessage) {
    const baseUrlProductosRecomendados = `${baseUrl}products/get/recommended`;

    axios.get(baseUrlProductosRecomendados)
        .then(response => {
            setData(response.data);
            setLoading(false);
            setTitulo("Recomendaciones");
        })
        .catch(error => {
            setErrorMessage(error.message);
            setLoading(false);
        })
}

/* function AxiosGetProductosPorCategoria(setData, setLoading, setTitulo, setErrorMessage, category) {
    const baseUrlPorCategoria = `${baseUrl}products/get/category/${category}`;

    axios.get(baseUrlPorCategoria)
        .then(response => {
            setData(response.data);
            setLoading(false);
            setTitulo(`Resultados para <b>${category}`);
        })
        .catch(error => {
            setErrorMessage(error.message);
            setLoading(false);
        });
} */

/* function AxiosGetProductosPorCiudad(setData, setLoading, setTitulo, setErrorMessage, city) {
    const baseUrlPorCiudad = `${baseUrl}products/get/city/${city}`;

    axios.get(baseUrlPorCiudad)
        .then(response => {
            setData(response.data);
            setLoading(false);
            setTitulo(`Resultados para ${response.data[0].city.name}`);
        })
        .catch(error => {
            setErrorMessage(error.message);
            setLoading(false);
        });
} */

function AxiosGetProductosFavoritos(setData, setLoading, setTitulo, setErrorMessage) {
    /*NO FUNCIONA PORQUE FALTA LA LOGICA DEL JWT */

    const baseUrlFavourite = `${baseUrl}users/getFavorites`;

    axios.post(baseUrlFavourite, { email: sessionStorage.getItem("email") })
        .then(response => {
            setData(response.data);
            setLoading(false);
            setTitulo(`Favoritos`);
        })
        .catch(error => {
            setErrorMessage(error.message);
            setLoading(false);
        });
}

function AxiosGetProductosFavoritosListado(setListadoFavoritos, setErrorMessage) {
    /*NO FUNCIONA PORQUE FALTA LA LOGICA DEL JWT */

    const baseUrlFavourite = `${baseUrl}users/getFavorites`;
    sessionStorage.getItem("email") &&
        axios.post(baseUrlFavourite, { email: sessionStorage.getItem("email") })
            .then(response => {
                setListadoFavoritos(response.data);
            })
            .catch(error => {
                setErrorMessage(error.message);
            });
}

function AxiosGetProductosPorCiudadFechaYCategoria(setData, setLoading, setTitulo, setErrorMessage, city, startDate, endDate, category) {
    
    const baseUrlFiltros = `${baseUrl}products/filters`;

    let startDateParse = startDate !== null ? (new Date(startDate).getFullYear() + "-" + format(new Date(startDate),"MM") + "-" + format(new Date(startDate),"dd")) : null;
    let endDateParse = endDate !== null ? (new Date(endDate).getFullYear() + "-" + format(new Date(endDate),"MM") + "-" + format(new Date(endDate),"dd")) : null;    


    console.log(startDateParse,"Start Date Parse");
    console.log(endDateParse,"end Date Parse");
    axios.post(baseUrlFiltros, { cityId: city, startDate: startDateParse, endDate: endDateParse, category: category })
        .then(response => {
            setData(response.data);
            setLoading(false);
            return response.data;
        })
        .then(response => {
            let titleCity = () => { return city && ` en ${response[0].city.name} ` };
            let titleCategory = () => {
                return category === "All" ? ` para todas las categorías disponibles ` : ` para ${category} disponibles `;
            };
            let titleFecha = () => {
                return (startDate) ? `del ${startDate.toLocaleDateString()} al ${endDate.toLocaleDateString()} ` : "";
            };
            if (response.length === 0) {
                setTitulo("No hay resultados disponibles para la búsqueda");
            } else {
                setTitulo(`Resultados ${titleCategory()} ${titleCity()} ${titleFecha()}`);
            }          
        })
        .catch(error => {
            setErrorMessage(error.message);
            setLoading(false);
            console.log(error.message, "soy el mensaje de error");
        });
}

function AxiosLikeProducto(id, setLike, setErrorMessage) {
    /*NO FUNCIONA PORQUE FALTA LA LOGICA DEL JWT */

    const baseUrlFavourite = `${baseUrl}users/likeProduct/${id}`;
    sessionStorage.getItem("email") &&
        axios.post(baseUrlFavourite, { email: sessionStorage.getItem("email") })
            .then(() => {
                setLike(true);
            })
            .catch(error => {
                setErrorMessage(error.message);
            });
}

function AxiosDislikeProducto(id, setLike, setErrorMessage) {
    /*NO FUNCIONA PORQUE FALTA LA LOGICA DEL JWT */

    const baseUrlFavourite = `${baseUrl}users/dislikeProduct/${id}`;

    sessionStorage.getItem("email") &&
        axios.post(baseUrlFavourite, { email: sessionStorage.getItem("email") })
            .then(() => {
                setLike(false);
            })
            .catch(error => {
                setErrorMessage(error.message);
            });
}

export { AxiosGetProductosRecomendados, /* AxiosGetProductosPorCategoria, */ /* AxiosGetProductosPorCiudad, */ AxiosGetProductosFavoritos, AxiosGetProductosPorCiudadFechaYCategoria, AxiosGetProductosFavoritosListado, AxiosLikeProducto, AxiosDislikeProducto }