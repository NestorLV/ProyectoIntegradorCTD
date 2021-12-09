import Styles from "./styles.module.css"
import React from 'react'
import Select from 'react-select'

export default function FormBooking({ errorBooking, name, setName, surname, setSurname, email, setEmail, city, setCity }) {
    const options = [
        { value: 'esquemaCompleto', label: 'Esquema Completo' },
        { value: 'esquemaIncompleto', label: 'Esquema Incompleto' },
        { value: 'noVacunado', label: 'No Vacunado' }
    ]
    
    const customStyles = {
       
        control: () => ({
            borderRadius: "7px",
            border: "1px solid rgba(0,0,0,.4)",
            boxShadow: "1px 2px 4px rgba(0, 0, 0, 0.25)",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "15px",
        }),

        placeholder: () => ({
            padding: "15px 10px",

        }),

        valueContainer: () => ({
            display: "flex",
            minWidth: "70%",
        }),
        singleValue: () => ({
            minWidth: "70%",
            padding: "15px 10px",

        }),

        input: () => ({
            opacity: 0,
            width: 0,
        }),

        option: () => ({
            color: "#31363F",
            fontWeight: 700,
            padding: "2px 15px",
            ':hover': {
                color: '#F0572D',
                cursor: 'pointer',
            },
        }),

        indicatorsContainer: () => ({
            paddingTop: "15px",

        }),

        dropdownIndicator: () => ({
            color: '#F0572D',
            padding: "0 7px",
            transition: "all 1s",
            ':hover': {
                color: '#31363F',
                cursor: 'pointer',
                opacity: "0.5"
            },
        }),
    }
    const style = {
        boxShadow: "1px 2px 4px rgba(0, 0, 0, 0.25)",
        display: "block",
        minWidth: "100%",
        height: '44px',
        border: 'none',
        marginTop: '15px',

    }
    const handleChangeName = (event) => {
        setName(event.target.value)
    }

    const handleChangeSurname = (event) => {
        setSurname(event.target.value)
    }

    const handleChangeEmail = (event) => {
        setEmail(event.target.value)
    }

    const handleChangeCity = (event) => {
        setCity(event.target.value)
    }


    return (
        <div className={`${Styles.containerForm}`}>
            <form>
                <div className={Styles.block}>
                    <div className={Styles.labelInputBooking}>
                        <label htmlFor="name">Nombre*</label>
                        <input type="text" name="name" id="name" value={name} onChange={handleChangeName} required></input>
                    </div>
                    <div className={Styles.labelInputBooking}>
                        <label htmlFor="surname">Apellido*</label>
                        <input type="text" name="surname" id="surname" value={surname} onChange={handleChangeSurname} required></input>
                    </div>
                </div>
                <div className={Styles.block}>
                    <div className={Styles.labelInputBooking}>
                        <label htmlFor="email">Correo electrónico*</label>
                        <input type="email" name="email" id="email" value={email} onChange={handleChangeEmail} required />
                    </div>
                    <div className={Styles.labelInputBooking}>
                        <label htmlFor="city">Ciudad de origen*</label>
                        <input type="text" name="city" id="city" value={city} onChange={handleChangeCity} required></input>
                    </div>
                </div>
                <div className={Styles.observaciones}>
                    <label htmlFor="esquema">Vacunación COVID-19</label>
                    <Select
                        options={options}
                        placeholder="Selecciona una opción"
                        styles={customStyles}
                        getOptionValue={(option) => option.value}
                    />
                </div>
                <div className={Styles.observaciones} >
                    <label for="observaciones">Observaciones:</label>
                    <textarea id="observaciones" name="observaciones" style={style}>
                    </textarea>
                </div>


                <div className={Styles.containerErrorBooking}>{errorBooking ? errorBooking : null}</div>
            </form>

        </div>
    )
}