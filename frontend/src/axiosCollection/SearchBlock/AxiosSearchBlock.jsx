import axios from "axios";

const baseURL = "http://worldguestbooking.com.ar:8080/";

function AxiosGetAllCities(setData, setErrorMessage){
    axios.get(`${baseURL}cities/all`)
    .then((response) => {
      setData(response.data);     
    })
    .catch((error) => {
      setErrorMessage(error);
    });
}

export {AxiosGetAllCities}