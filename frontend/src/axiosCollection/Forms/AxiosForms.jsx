import axios from "axios";
const baseUrl = "http://localhost:8080/"

function AxiosLogin(email, password, setFormValido, setLog, setError, setEmail, setLoading){
    axios.post(baseUrl + "users/login", {
        "email": `${email}`,
        "password": `${password}`
    }).then(response => {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("name", response.data.name);
        sessionStorage.setItem("surname", response.data.surname);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("iniciales",`${response.data.name.slice(0, 1).toUpperCase()}${response.data.surname.slice(0, 1).toUpperCase()}`)
        sessionStorage.setItem("log", "true");
        setLog(true);
        setFormValido(true);
        setLoading(false);      
    })
    .catch(error => {
        console.log(error);
        if (error.response.status !== 200) {
            setError("Las credenciales son inválidas")
            setEmail({ valido: false })
            setFormValido(false)
            sessionStorage.setItem("log", "false");
            sessionStorage.removeItem("token")
        }
    })
}

function AxiosCreate(name, surname, email, password, setFormValido, setLog, setError, setEmail, setLoading){
    axios.post(baseUrl + "users/create", {
        "name": `${name}`,
        "surname": `${surname}`,
        "email": `${email}`,
        "password": `${password}`
    })
    .then(response => {
        //setData(response.data);
        //setLoading(false);
        //setFormValido(true)
        console.log(response, "1");                 
        return response;
    })
    .then(response => {
        AxiosLogin(email, password, setFormValido, setLog, setError, setEmail, setLoading)
    })
    .catch(error => {
        //setErrorMessage(error.message);
        //setLoading(false);
        if (error.response.status !== 200) {
            setError("Lamentablemente no ha podido registrarse. Por favor intente más tarde")
            setEmail({ valido: false })
            setFormValido(false)
            sessionStorage.setItem("log", "false");
            sessionStorage.removeItem("token")
        }
    });
}

export {AxiosLogin, AxiosCreate}