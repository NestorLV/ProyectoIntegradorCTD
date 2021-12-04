import axios from "axios";
const baseUrl = "http://localhost:8080/"

function AxiosLogin(email, password, setFormValido, setLog, setError, setEmail, setPassword, setLoading, lastLocation) {
    axios.post(baseUrl + "users/login", {
        "email": `${email}`,
        "password": `${password}`
    }).then(response => {
        console.log(response.data);
        if(response.data.activation=="true"){
            sessionStorage.setItem("name", `${response.data.name.charAt(0).toUpperCase()}${response.data.name.slice(1)}`);
            sessionStorage.setItem("surname", `${response.data.surname.charAt(0).toUpperCase()}${response.data.surname.slice(1)}`);
            sessionStorage.setItem("iniciales", `${response.data.name.slice(0, 1).toUpperCase()}${response.data.surname.slice(0, 1).toUpperCase()}`)
            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem("id", response.data.id);
            sessionStorage.setItem("email", email);
            sessionStorage.setItem("log", "true");
            sessionStorage.setItem("role", response.data.role);
            /*  setEmail({ campo:email, valido: true })
             setPassword({campo:password, valido: true }) */
            setFormValido(true);
            setLoading(false);
            setLog(true);
        }else{
            setPassword({error: "El usuario no ha sido confirmado. Por favor revise su mail"})
        }

    })
        .catch(error => {
            console.log(error);
            if (error.response.status !== 200) {
                setError("Las credenciales son inválidas")
                setEmail({ campo: email, valido: false })
                setPassword({ campo: password, valido: false })
                setFormValido(false)
                sessionStorage.setItem("log", "false");
                sessionStorage.removeItem("token")
            }
        })
}

function AxiosCreate(name, surname, email, password, setFormValido, setLog, setError, setEmail, setPassword, setLoading, lastLocation,openModalConfirm) {
    axios.post(baseUrl + "users/create", {
        "name": `${name}`,
        "surname": `${surname}`,
        "email": `${email}`,
        "password": `${password}`
    })
    .then(response => {
        console.log(response);
        setLoading(false);
        openModalConfirm(true);
    })
    .catch(error => {
        setLoading(false)
        console.log(error.response);
        if (error.response.status != 200) {
            setEmail({ valido: false, error: "El usuario ya existe."})
            setFormValido(false)
            sessionStorage.setItem("log", "false");
            sessionStorage.removeItem("token")
        }
    })
}

export { AxiosLogin, AxiosCreate }