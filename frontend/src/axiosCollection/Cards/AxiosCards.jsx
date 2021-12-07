/*COMPONENTE CARDS*/
import axios from "axios";
const { format } = require("date-fns");

const baseUrl = "http://localhost:8080/"

//YA TESTEADO

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

//YA TESTEADO

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

//YA TESTEADO

function AxiosGetProductoFavorito(setErrorMessage, id, setLike) {
    let email = sessionStorage.getItem("email")
    const baseUrlFavourite = `${baseUrl}users/getfavourites/${email}`;

    sessionStorage.getItem("email") &&
        axios.get(baseUrlFavourite)
            .then(response => {
                let flag = false;
                response.data.map((p) => p.id === id ? flag = true : null);
                setLike(flag)
            })
            .catch(error => {
                setErrorMessage(error.message);
                return false;
            });
}

function AxiosGetProductosPorCiudadFechaYCategoria(setData, setLoading, setTitulo, setErrorMessage, city, startDate, endDate, category) {

    const baseUrlFiltros = `${baseUrl}products/filters`;

    let startDateParse = startDate !== null ? (new Date(startDate).getFullYear() + "-" + format(new Date(startDate), "MM") + "-" + format(new Date(startDate), "dd")) : null;

    let endDateParse = endDate !== null ? (new Date(endDate).getFullYear() + "-" + format(new Date(endDate), "MM") + "-" + format(new Date(endDate), "dd")) : null;

    axios.post(baseUrlFiltros, { cityId: city, startDate: startDateParse, endDate: endDateParse, category: category })
        .then(response => {
            setData(response.data);
            console.log(response.data, "Axios");
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

function AxiosCreateFavourite(id, setErrorMessage) {
    let email = sessionStorage.getItem("email");
    const baseUrlFavourite = `${baseUrl}users/handlefavourite/${email}/${id}`;
    console.log(baseUrlFavourite, "soy la url de favoritos");

    if (sessionStorage.getItem("email") != null) {
        axios
            .post(baseUrlFavourite)
            .catch(error => {
                setErrorMessage(error.message);
                console.log(error.message);
            })
    }
}

function AxiosDeletedMark(id, openModalSucceed) {
    const baseUrlBorrarProducto = `${baseUrl}products/deletedmark/${id}`;

    axios.post(baseUrlBorrarProducto, {}, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
    })
        .then(response => {
            console.log(response.data);
            openModalSucceed()
        })
        .catch(error => {
            console.log(error.message);

        })
}

export { AxiosGetProductosRecomendados, AxiosGetProductosFavoritos, AxiosGetProductosPorCiudadFechaYCategoria, AxiosCreateFavourite, AxiosGetProductoFavorito, AxiosDeletedMark }