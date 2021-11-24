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

function AxiosGetProductosFavoritos(setListadoFavoritos, setErrorMessage) {
    let email = sessionStorage.getItem("email")
    const baseUrlFavourite = `${baseUrl}users/getfavourites/${email}`;

    sessionStorage.getItem("email") &&
        axios.get(baseUrlFavourite)
            .then(response => {
                setListadoFavoritos(response.data);
            })
            .catch(error => {
                setErrorMessage(error.message);
            });
}

function AxiosGetProductosPorCiudadFechaYCategoria(setData, setLoading, setTitulo, setErrorMessage, city, startDate, endDate, category) {

    const baseUrlFiltros = `${baseUrl}products/filters`;

    let startDateParse = startDate !== null ? (new Date(startDate).getFullYear() + "-" + format(new Date(startDate), "MM") + "-" + format(new Date(startDate), "dd")) : null;
    let endDateParse = endDate !== null ? (new Date(endDate).getFullYear() + "-" + format(new Date(endDate), "MM") + "-" + format(new Date(endDate), "dd")) : null;


    console.log(startDateParse, "Start Date Parse");
    console.log(endDateParse, "end Date Parse");
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

function AxiosCreateFavourite(id, setLike, setErrorMessage) {
    let email = sessionStorage.getItem("email");
    const baseUrlFavourite = `${baseUrl}users/createfavourite/${email}/${id}`;
    console.log(baseUrlFavourite, "soy la url de favoritos");

    if (sessionStorage.getItem("email") != null) {
        axios.post(baseUrlFavourite)
            .then(response => {
                setLike(response.data.favourite); 
            })
            .catch(error => {
                setErrorMessage(error.message);
            })
    }
}

export { AxiosGetProductosRecomendados, AxiosGetProductosFavoritos, AxiosGetProductosPorCiudadFechaYCategoria, AxiosCreateFavourite }