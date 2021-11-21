/*COMPONENTE CARDS*/
import axios from "axios";

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

function AxiosGetProductosPorCategoria(setData, setLoading, setTitulo, setErrorMessage, category) {
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
}

function AxiosGetProductosPorCiudad(setData, setLoading, setTitulo, setErrorMessage, city) {
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
}

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

function AxiosGetProductosPorCiudadFechaYCategoria(setData, setLoading, setTitulo, setErrorMessage, city, startDate, endDate, category) {
    const baseUrlFiltros = city ? `${baseUrl}products/get/city/${city}` :
    `${baseUrl}products/get/category/${category}` ;  // Cambiar por endpoint real

    axios.get(baseUrlFiltros)
        .then(response => {
            setData(response.data);
            setLoading(false);

            let titleCity = () => { return city && ` en ${response.data[0].city.name} ` };
            let titleCategory = () => {
                return category === "All" ? ` para todas las categorías disponibles ` : ` para ${category} disponibles `;
            };
            let titleFecha = () => {
                return (startDate) ?  `del ${startDate.toLocaleDateString()} al ${endDate.toLocaleDateString()} ` : "";
            };

            setTitulo(`Resultados ${titleCategory()} ${titleCity()} ${titleFecha()}`);
        })
        .catch(error => {
            setErrorMessage(error.message);
            setLoading(false);
        });
}

export { AxiosGetProductosRecomendados, AxiosGetProductosPorCategoria, AxiosGetProductosPorCiudad, AxiosGetProductosFavoritos, AxiosGetProductosPorCiudadFechaYCategoria }