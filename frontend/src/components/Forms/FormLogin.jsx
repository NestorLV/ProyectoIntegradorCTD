import styles from "./styles.module.css"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import hidePassword from "./icons/hidePassword.png"
import { AxiosLogin } from "../../axiosCollection/Forms/AxiosForms"
import IconError from "./icons/iconError.svg"

export default function FormLogin({ lastLocation, bookingWithoutLogin, setLoading, setActiveLogin, setActiveCreate, setLog }) {
    const [email, setEmail] = useState({ campo: "", valido: true, error: "" });
    const [password, setPassword] = useState({ campo: "", valido: true, error: "" });
    const [error, setError] = useState("")
    const [formValido, setFormValido] = useState(false)

    useEffect(() => {
        setActiveCreate(false)
        setActiveLogin(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /*CONTROL DE COMPONENTES MEDIANTE HANDLES */
    const handleChangeEmail = (event) => { setEmail({ ...email, campo: event.target.value }) }

    const handleChangePassword = (event) => { setPassword({ ...password, campo: event.target.value }) }

    const validarEmailNulo = () => {
        if (!email.campo) {
            setEmail({ ...email, valido: false, error: "El email no puede estar vacío." })
        } else {
            setEmail({ ...email, valido: true, error: "" })
        }
    }
    const validarPasswordNulo = () => {
        if (!password.campo) {
            setPassword({ ...password, valido: false, error: "La contraseña no puede estar vacía." })
        } else {
            setPassword({ ...password, valido: true, error: "" })
        }
    }

    const sendData = (event) => {
        event.preventDefault();
        validarEmailNulo()
        validarPasswordNulo()
        if (password.campo && email.campo && password.valido && email.valido) {
            AxiosLogin(email.campo, password.campo, setFormValido, setLog, setError, setEmail, setPassword, setLoading, lastLocation)
        }        
    }

    function mostrarContrasena() {
        let tipo = document.getElementById("password");
        if (tipo.type=== "password") {
            tipo.type = "text"
        } else {
            tipo.type = "password"
        }
    }

    return (
        <div className={styles.containerPrincipal}>
            <div className={styles.containerForm}>
                <div className={`${styles.errorLogin} ${!bookingWithoutLogin ? styles.hide : null}`}>
                    <img src={IconError} alt="icono de error" />
                    <div >Para realizar una reserva, necesitas estar logueado</div>
                </div>
                <h3>Iniciar sesión</h3>
                <form className={`${styles.formFlex} ${styles.login}`} onSubmit={sendData}>
                    <div className={`${styles.inputLabel} `}>
                        <label htmlFor="email">Correo electrónico</label>
                        <input type="email" name="email" id="email" value={email.campo} className={!email.valido ? styles.inputError : null} onChange={handleChangeEmail} onKeyUp={validarEmailNulo} />
                        <div className={styles.errorContainer}><p className={styles.error}>{email.error}</p></div>
                    </div>
                    <div className={`${styles.inputLabel} `}>
                        <label htmlFor="password">Contraseña</label>
                        <div className={styles.inputHidePassword}>
                            <input type="password" name="password" id="password" value={password.campo} className={!password.valido ? styles.inputError : null} onChange={handleChangePassword} onKeyUp={validarPasswordNulo} />
                            <img src={hidePassword} alt="icon hide password" className={`${styles.hidePassword} ${styles.passLogin}`} onClick={mostrarContrasena} />
                        </div>
                        <div className={styles.errorContainer}><p className={styles.error}>{password.error}</p></div>
                    </div>

                    {!formValido && <div className={styles.errorContainer}><p className={styles.error}>{error}</p></div>}
                    <div className={`${styles.inputLabel} ${styles.boton}`}>
                        <button type="submit" id="login">Ingresar</button>
                        <p>¿Aún no tenés cuenta?<Link to="/create"> Registrate</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}