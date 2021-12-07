import axios from "axios";

const baseURL = "http://localhost:8080/cities/all";

export default function AxiosGetAllCities(setData, setErrorMessage){
    axios
    .get(baseURL)
    .then((response) => {
      setData(response.data);     
    })
    .catch((error) => {
      setErrorMessage(error);
    });
}

