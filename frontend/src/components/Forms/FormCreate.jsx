import styles from "./styles.module.css";
import React, { useState } from "react";
import ValidCredentials from "../../credentials/ValidCredentials";
import { Link } from "react-router-dom";
import hidePassword from "./icons/hidePassword.png";
import axios from "axios";
import { Redirect } from "react-router-dom";


function FormCreate({ setActiveCreate, setActiveLogin, setLog }) {
    const [name, setName] = useState({ campo: "", valido: true });
    const [surname, setSurname] = useState({ campo: "", valido: true });
    const [email, setEmail] = useState({ campo: "", valido: true });
    const [password, setPassword] = useState({ campo: "", valido: true });
    const [confirmPassword, setConfirmPassword] = useState({ campo: "", valido: true });
    const [error, setError] = useState("")
    const [formValido, setFormValido] = useState(false)

    const baseUrl = "http://localhost:8080/"

    setActiveLogin(false)
    setActiveCreate(true)

    const regEx = /^[a-zA-Z\s]{1,70}$/;

    /*CONTROL DE COMPONENTES MEDIANTE HANDLES */
    const handleChangeName = (event) => {
        setName({ ...name, campo: event.target.value })
    }

    const handleChangeSurname = (e) => {
        setSurname({ ...surname, campo: e.target.value })
    }

    const handleChangeEmail = (event) => {
        setEmail({ ...email, campo: event.target.value })
    }

    const handleChangePassword = (event) => {
        setPassword({ ...password, campo: event.target.value })
    }

    const handleChangeConfirmPassword = (event) => {
        setConfirmPassword({ ...confirmPassword, campo: event.target.value })
    }


    /*VALIDACIONES */
    const validarName = () => {
        setName({ ...name, valido: true })
        setError("")
        if (!regEx.test(name.campo) || (name.campo === "" ? true : false)) {
            setError("El nombre no puede estar vacio ni contener numeros o caracteres especiales")
            setName({ ...name, valido: false })
        }
    }

    const validarSurname = () => {
        setSurname({ ...surname, valido: true })
        setError("")
        if (!regEx.test(surname.campo) || surname.campo === "") {
            setError("El apellido no puede estar vacio ni contener numeros o caracteres especiales")
            setSurname({ ...surname, valido: false })
        }
    }

    const validarEmail = () => {
        setEmail({ ...email, valido: true })
        setError("")
        if (email.campo === "") {
            setError("El campo email no puede estar vacio")
            setEmail({ ...email, valido: false })
        }

        /*if(email.campo === ValidCredentials.email) {
            setError("El usuario ya existe.")
            setEmail({...email, valido:false})
        }*/
    }

    const validarPassword = () => {
        setPassword({ ...password, valido: true })
        setError("")
        if (password.campo.length <= 6) {
            setError("La contraseña debe tener más de 6 caracteres")
            setPassword({ ...password, valido: false })
        }
    }

    const validarConfirmPassword = () => {
        setConfirmPassword({ ...confirmPassword, valido: true })
        setError("")
        if (confirmPassword.campo.length === 0) {
            setError("La contraseña es obligatoria")
            setConfirmPassword({ ...confirmPassword, valido: false })
        }

        if ((password.campo) !== (confirmPassword.campo)) {
            setError("Las contraseñas deben ser iguales")
            setConfirmPassword({ ...confirmPassword, valido: false })
        }
    }

    const data = {
        "name": "Mar",
        "surname": "Perez",
        "email": "mar@dh.com",
        "password": "hkjhkjh",
        "role": {
            "name": "USER"
        }
    }

    const sendData = (event) => {
        event.preventDefault();
        validarName()
        validarSurname()
        validarEmail()
        validarPassword()
        validarConfirmPassword()
        if ((name.campo !== "") && name.valido &&
            surname.valido &&
            email.valido &&
            password.valido &&
            confirmPassword.valido) {

            axios.post(baseUrl + "users/create", {
                "name": `${name.campo}`,
                "surname": `${surname.campo}`,
                "email": `${email.campo}`,
                "password": `${password.campo}`
            })
                .then(response => {
                    //setData(response.data);
                    //setLoading(false);
                    //setFormValido(true)
                    //console.log(response, "1");
                    return response;
                })
                .then(response => {
                    axios.post(baseUrl + "users/login", {
                        "email": `${response.data.email}`,
                        "password": `${password.campo}`
                    }).then(response => {
                        sessionStorage.setItem("token", `${response.data.token}`);
                        sessionStorage.setItem("email", email.campo)
                        sessionStorage.setItem("log", "true");
                        setLog(true)
                        setFormValido(true);
                        <Redirect to="/" />
                    })
                        .catch(error => {
                            console.log(error);
                        })
                })
                .catch(error => {
                    //setErrorMessage(error.message);
                    //setLoading(false);
                    console.log(error.response.status);
                    if (error.response.status === 400) {
                        setError("El usuario ya existe")
                        setEmail({ valido: false })
                        setFormValido(false)
                        sessionStorage.setItem("log", "false");
                        sessionStorage.removeItem("token")
                    }
                });


            //window.location.pathname = "/login"
        } else {
            setFormValido(false)
        }
    }
    console.log(
        error
    );
    console.log(email);
    function mostrarContrasena(event) {
        let tipo = document.getElementById(event);
        console.log(event);

        if (tipo.type === "password") {
            tipo.type = "text";
        } else {
            tipo.type = "password";
        }

    }

    return (

        <div className={styles.containerPrincipal}>
        <div className={styles.containerForm}>
            <h3>Crear cuenta</h3>
            <form className={styles.formFlex} onSubmit={sendData}>
                <div className={styles.fullName}>
                    <div className={`${styles.inputLabel} ${styles.inputText} ${!name.valido ? styles.inputError : null}`}>
                        <label for="name">Nombre</label>
                        <input type="text" name="name" id="name" value={name.campo} onKeyUp={validarName} onChange={handleChangeName} />
                    </div>
                    <div className={`${styles.inputLabel} ${styles.apellido} ${styles.inputText} ${!surname.valido ? styles.inputError : null}`}>
                        <label for="surname">Apellido</label>
                        <input type="text" name="surname" id="surname" onKeyUp={validarSurname} value={surname.campo} onChange={handleChangeSurname} />
                    </div>
                </div>
                <div className={`${styles.inputLabel} ${!email.valido ? styles.inputError : null}`}>
                    <label for="email">Correo electrónico</label>
                    <input type="email" name="email" id="email" value={email.campo} onKeyUp={validarEmail} onChange={handleChangeEmail} />
                </div>
                <div className={`${styles.inputLabel} ${!password.valido ? styles.inputError : null}`}>
                    <label for="password">Contraseña</label>
                    <div className={styles.inputHidePassword}>
                        <input type="password" name="password" id="password" value={password.campo} onKeyUp={validarPassword} onChange={handleChangePassword} />
                        <img src={hidePassword} alt="icon hide password" className={styles.hidePassword} onClick={() => mostrarContrasena("password")} />
                    </div>
                </div>

                <div className={`${styles.inputLabel} ${styles.confirmPassword} ${!confirmPassword.valido ? styles.inputError : null}`}>
                    <label for="confirm-password">Confirmar contraseña</label>
                    <div className={styles.inputHidePassword}>
                        <input type="password" name="confirm-password" id="confirm-password" value={confirmPassword.campo} onKeyUp={validarConfirmPassword} onChange={handleChangeConfirmPassword} />
                        <img src={hidePassword} alt="icon hide password" className={styles.hidePassword} onClick={() => mostrarContrasena("confirm-password")} />
                    </div>
                </div>

                {!formValido && <div className={styles.errorContainer}><p className={styles.error}>{error}</p></div>}
                <div className={`${styles.inputLabel} ${styles.boton}`}>
                    <button type="submit">Crear cuenta</button>
                    <p>¿Ya tienes una cuenta?<Link to="/login"> Iniciar sesión</Link></p>
                </div>
            </form>
        </div>
        </div>

    )
}

export default FormCreate;
