import styles from "./styles.module.css"
import { Link } from "react-router-dom"
import { useState } from "react";
import ValidCredentials from "../../credentials/ValidCredentials";
import hidePassword from "./icons/hidePassword.png"
import axios from "axios";
import { Redirect } from "react-router-dom";

export default function FormLogin({ setActiveLogin, setActiveCreate, setLog }) {
    const [email, setEmail] = useState({ campo: "", valido: true });
    const [password, setPassword] = useState({ campo: "", valido: true });
    const [error, setError] = useState("")
    const [formValido, setFormValido] = useState(false)

    const baseUrl = "http://localhost:8080/"

    setActiveCreate(false)
    setActiveLogin(true)

    /*CONTROL DE COMPONENTES MEDIANTE HANDLES */
    const handleChangeEmail = (event) => {
        setEmail({ ...email, campo: event.target.value })
    }

    const handleChangePassword = (event) => {
        setPassword({ ...password, campo: event.target.value })
    }

    /*VALIDACIONES 
    const validarEmail = () => {
        setEmail({...email, valido:true})
        setError("")
        if((email.campo)!== ValidCredentials.email){
            setError("Por favor vuelva a intentarlo. Las credenciales son inválidas")
            setEmail({...email, valido:false})
        }
    }

    const validarPassword = () => {
        setPassword({...password, valido:true})
        setError("")
        if((password.campo)!== ValidCredentials.password){
            setError("Por favor vuelva a intentarlo. Las credenciales son inválidas")
            setPassword({...password, valido:false})
        }
    }*/

    const sendData = (event) => {
        event.preventDefault();
        //validarEmail();
        //validarPassword();


        axios.post(baseUrl + "users/login", {
            "email": `${email.campo}`,
            "password": `${password.campo}`
        }).then(response => {
            setFormValido(true);
            sessionStorage.setItem("token", `${response.data.token}`);
            sessionStorage.setItem("email", email.campo)
            sessionStorage.setItem("log", "true");
            setLog(true);

            <Redirect to="/" />
        })
            .catch(error => {
                if (error.response.status === 400) {
                    setError("Por favor vuelva a intentarlo. Las credenciales son inválidas")
                    setEmail({ valido: false })
                    setFormValido(false)
                    sessionStorage.setItem("log", "false");
                    sessionStorage.removeItem("token")
                }
            })
    }

    function mostrarContrasena() {
        let tipo = document.getElementById("password");

        if (tipo.type === "password") {
            tipo.type = "text";
        } else {
            tipo.type = "password";
        }

    }

    return (

        <div className={styles.containerPrincipal}>
        <div className={styles.containerForm}>
            <h3>Iniciar sesión</h3>
            <form className={`${styles.formFlex} ${styles.login}`} onSubmit={sendData}>
                <div className={`${styles.inputLabel} ${!email.valido ? styles.inputError : null}`}>
                    <label for="email">Correo electrónico</label>
                    <input type="email" name="email" id="email" value={email.campo} onChange={handleChangeEmail} />
                </div>
                <div className={`${styles.inputLabel} ${!password.valido ? styles.inputError : null}`}>
                    <label for="password">Contraseña</label>
                    <div className={styles.inputHidePassword}>
                        <input type="password" name="password" id="password" value={password.campo} onChange={handleChangePassword} />
                        <img src={hidePassword} alt="icon hide password" className={`${styles.hidePassword} ${styles.passLogin}`} onClick={mostrarContrasena} />
                    </div>
                </div>

                {!formValido && <div className={styles.errorContainer}><p className={styles.error}>{error}</p></div>}
                <div className={`${styles.inputLabel} ${styles.boton}`}>
                    <button type="submit">Ingresar</button>
                    <p>¿Aún no tenés cuenta?<Link to="/create"> Registrate</Link></p>
                </div>
            </form>
        </div>
        </div>
    )
}