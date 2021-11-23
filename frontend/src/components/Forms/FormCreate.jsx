import styles from "./styles.module.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import hidePassword from "./icons/hidePassword.png";
import { AxiosCreate } from "../../axiosCollection/Forms/AxiosForms"


function FormCreate({ lastLocation, setActiveCreate, setActiveLogin, setLog }) {
    const [name, setName] = useState({ campo: "", valido: true });
    const [surname, setSurname] = useState({ campo: "", valido: true});
    const [errorFullname, setErrorFullname] = useState({error:""})
    const [email, setEmail] = useState({ campo: "", valido: true, error:"" });
    const [password, setPassword] = useState({ campo: "", valido: true , error:""});
    const [confirmPassword, setConfirmPassword] = useState({ campo: "", valido: true , error:""});
    const [error, setError] = useState("")
    const [formValido, setFormValido] = useState(false)

    const [loading, setLoading] = useState(true);

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

        if (!name.campo || !regEx.test(name.campo)) {
            setName({ ...name, valido: false,}) 
            setErrorFullname({error: "Nombre y/o apellido solo pueden tener letras"})
        } else {
            if(surname.valido){
                setName({ ...name, valido: true})
                setErrorFullname({error:""})
            }else{
                setName({ ...name, valido: true})
            }
        }
    }

    const validarSurname = () => {
        if (!surname.campo || !regEx.test(surname.campo)) {
            setErrorFullname({error:"Nombre y apellido solo pueden tener letras"})
            setSurname({ ...surname, valido: false })
        }else{
            if(name.valido){
                setErrorFullname({error:""})
                setSurname({ ...surname, valido: true}) 
            }else{
                setSurname({ ...surname, valido: true}) 
            }
        }
    }

    const validarEmail = () => {
        if (email.campo.length === 0) {
            setEmail({ ...email, valido: false , error: "El email no puede estar vacio"})
        }else{
            setEmail({ ...email, valido: true, error:""})
        }
    }

    const validarPassword = () => {
        if (!password.campo || password.campo.length <= 6) {
            setPassword({ ...password, valido: false, error: "La contraseña debe tener más de 6 caracteres"})
        }else{
            setPassword({ ...password, valido: true , error:""})
        }
    }

    const validarConfirmPassword = () => {
        if (confirmPassword.campo.length === 0) {
            setConfirmPassword({ ...confirmPassword, valido: false, error: "El campo es obligatoria"})
        } else if ((password.campo) !== (confirmPassword.campo)) {
            setConfirmPassword({ ...confirmPassword, valido: false, error:"Las contraseñas deben ser iguales"})
        }else{
            setConfirmPassword({ ...confirmPassword, valido: true, error:"" })
        }
    }
console.log(name);

    const sendData = (event) => {
        event.preventDefault();
        validarName()
        validarSurname()
        validarEmail()
        validarPassword()
        validarConfirmPassword()

        if (name.campo && surname.campo && email.campo && password.campo && confirmPassword.campo &&
            name.valido && surname.valido && email.valido && password.valido && confirmPassword.valido) {
            AxiosCreate(name.campo, surname.campo, email.campo, password.campo, setFormValido, setLog, setError, setEmail, setPassword, setLoading, lastLocation)
        }
        else {
            setFormValido(false)
        }
    }
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
                        <div className={styles.containerFullname}>
                            <div className={`${styles.inputLabel} `}>
                                <label for="name">Nombre</label>
                                <input type="text" name="name" id="name" value={name.campo} className={!name.valido ? styles.inputError : null} onKeyUp={validarName} onChange={handleChangeName} />
                            </div>
                            <div className={`${styles.apellido} `}>
                                <label for="surname">Apellido</label>
                                <input type="text" name="surname" id="surname" onKeyUp={validarSurname} value={surname.campo} className={!surname.valido ? styles.inputError : null} onKeyUp={validarSurname} onChange={handleChangeSurname} />
                            </div>
                        </div>
                        <div className={styles.errorContainer}><p className={styles.error}>{errorFullname.error}</p></div>
                    </div>
                    <div className={`${styles.inputLabel} `}>
                        <label for="email">Correo electrónico</label>
                        <input type="email" name="email" id="email" value={email.campo} className={!email.valido ? styles.inputError : null} onKeyUp={validarEmail} onChange={handleChangeEmail} />
                        <div className={styles.errorContainer}><p className={styles.error}>{email.error}</p></div>
                    </div>
                    <div className={`${styles.inputLabel} `}>
                        <label for="password">Contraseña</label>
                        <div className={styles.inputHidePassword}>
                            <input type="password" name="password" id="password" value={password.campo} className={!password.valido ? styles.inputError : null} onKeyUp={validarPassword} onChange={handleChangePassword} />
                            <img src={hidePassword} alt="icon hide password" className={styles.hidePassword} onClick={() => mostrarContrasena("password")} />
                        </div>
                        <div className={styles.errorContainer}><p className={styles.error}>{password.error}</p></div>
                    </div>

                    <div className={`${styles.inputLabel} ${styles.confirmPassword} `}>
                        <label for="confirm-password">Confirmar contraseña</label>
                        <div className={styles.inputHidePassword}>
                            <input type="password" name="confirm-password" id="confirm-password" value={confirmPassword.campo} className={!confirmPassword.valido ? styles.inputError : null} onKeyUp={validarConfirmPassword} onChange={handleChangeConfirmPassword} />
                            <img src={hidePassword} alt="icon hide password" className={styles.hidePassword} onClick={() => mostrarContrasena("confirm-password")} />
                        </div>
                        <div className={styles.errorContainer}><p className={styles.error}>{confirmPassword.error}</p></div>
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
