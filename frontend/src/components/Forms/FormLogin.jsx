import styles from "./styles.module.css"
import { Link } from "react-router-dom"
import { useState } from "react";
import hidePassword from "./icons/hidePassword.png"
import { AxiosLogin } from "../../axiosCollection/Forms/AxiosForms"
import { style } from "@mui/system";
import IconError from "./icons/iconError.svg"
import { Redirect } from "react-router";


export default function FormLogin({ lastLocation, bookingWithoutLogin, setLoading, setActiveLogin, setActiveCreate, setLog }) {
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

    console.log(lastLocation);

    const sendData = (event) => {
        event.preventDefault();
        setLoading(true)
        AxiosLogin(email.campo, password.campo, setFormValido, setLog, setError, setEmail, setLoading, lastLocation)
        
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
                <div className={`${styles.errorLogin} ${!bookingWithoutLogin?styles.hide:null}`}>
                    <img src={IconError} alt="icono de error"/>
                    <div >Para realizar una reserva, necesitas estar logueado</div>
                </div>
                <h3>Iniciar sesión</h3>
                <form className={`${styles.formFlex} ${styles.login}`} onSubmit={sendData}>
                    <div className={`${styles.inputLabel} `}>
                        <label for="email">Correo electrónico</label>
                        <input type="email" name="email" id="email" value={email.campo} className={!email.valido ? styles.inputError : null} onChange={handleChangeEmail} />
                    </div>
                    <div className={`${styles.inputLabel} `}>
                        <label for="password">Contraseña</label>
                        <div className={styles.inputHidePassword}>
                            <input type="password" name="password" id="password" value={password.campo} className={!password.valido ? styles.inputError : null} onChange={handleChangePassword} />
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