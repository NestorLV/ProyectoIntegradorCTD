import axios from "axios";

const baseURL = "http://localhost:8080/cities/all";

function AxiosGetTodasLasCiudades(setData, setErrorMessage){
    axios
    .get(baseURL)
    .then((response) => {
      setData(response.data);        
    })
    .catch((error) => {
      setErrorMessage(error);
    });
}

export {AxiosGetTodasLasCiudades}