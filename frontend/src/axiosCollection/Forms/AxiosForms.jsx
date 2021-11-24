import axios from "axios";
const baseUrl = "http://localhost:8080/"

function AxiosLogin(email, password, setFormValido, setLog, setError, setEmail, setPassword, setLoading, lastLocation){
    axios.post(baseUrl + "users/login", {
        "email": `${email}`,
        "password": `${password}`
    }).then(response => {
        sessionStorage.setItem("name", `${response.data.name.charAt(0).toUpperCase()}${response.data.name.slice(1)}`);
        sessionStorage.setItem("surname", `${response.data.surname.charAt(0).toUpperCase()}${response.data.surname.slice(1)}`);
        sessionStorage.setItem("iniciales",`${response.data.name.slice(0, 1).toUpperCase()}${response.data.surname.slice(0, 1).toUpperCase()}`)
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("id", response.data.id);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("log", "true");
        setEmail({ valido: true })
        setPassword({ valido: true })
        setFormValido(true);
        setLoading(false); 
        setLog(true);
    })
    .catch(error => {
        console.log(error);
        if (error.response.status !== 200) {
            setError("Las credenciales son inválidas")
            setEmail({ campo:email, valido: false })
            setPassword({ campo:password, valido: false })
            setFormValido(false)
            sessionStorage.setItem("log", "false");
            sessionStorage.removeItem("token")
        }
    })
}

function AxiosCreate(name, surname, email, password, setFormValido, setLog, setError, setEmail, setPassword, setLoading, lastLocation){
    axios.post(baseUrl + "users/create", {
        "name": `${name}`,
        "surname": `${surname}`,
        "email": `${email}`,
        "password": `${password}`
    })
    .then(response => {       
        setLoading(false);
        AxiosLogin(email, password, setFormValido, setLog, setError, setEmail, setPassword, setLoading, lastLocation)
    })
    .catch(error => {
        if (error.response.status !== 200) {
            setError("El usuario ya existe.")
            setEmail({ valido: false })
            setFormValido(false)
            sessionStorage.setItem("log", "false");
            sessionStorage.removeItem("token")
        }
    });
}

export {AxiosLogin, AxiosCreate}