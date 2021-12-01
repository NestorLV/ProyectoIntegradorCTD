import Select from "react-select"
import OptionsSelect from "./OptionsSelect";
import React, { useState } from "react";
import CheckListFeatures from "./CheckListFeatures";
import StylesApp from "../../../App.module.css"
import Styles from "./Styles.module.css";

export default function ({ categories, setSelectedCategory, cities, setSelectedCity, features, setSelectedFeatures }) {

    //const [ optionsCategories, setOptionsCategories] = useState(["Hoteles", "Hostels", "Departamentos", "Bed and breakfast" ])


    function options(arrayOptions, setValor) {
        return arrayOptions.map((valor) => {
            return {
                value: `${valor}`,
                label: <OptionsSelect valor={valor} setValor={setValor} />,
            };
        })
    }

    const customStyles = {
        control: () => ({
            borderRadius: "7px",
            boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.15)",
            display: "flex",
            justifyContent: "space-between",

        }),

        placeholder: () => ({
            padding: "9px 5px"
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
            width: 0
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
            paddingTop: "11px"
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

    return (
        <section className={`${StylesApp.delimiter} ${Styles.containerPrincipal}`}>
            <div className={`${StylesApp.delimiterChild} ${Styles.containerForm}`}>
                <form >
                    <div className={Styles.containerBlockAdministrator}>
                        <div>
                            <label htmlFor="name">Nombre de la propiedad</label>
                            <input type="text" name="name" id="name" />
                        </div>
                        <div>
                            <label htmlFor="category">Categoría</label>
                            <Select
                                options={options(categories, setSelectedCategory)}
                                placeholder="Seleccionar categoria"
                                styles={customStyles}
                                getOptionValue={(option) => option.value}
                            />
                        </div>
                    </div>
                    <div className={Styles.containerBlockAdministrator}>
                        <div>
                            <label htmlFor="address">Dirección</label>
                            <input type="text" name="address" id="address" />
                        </div>
                        <div>
                            <label htmlFor="city">Ciudad</label>
                            <Select
                                options={options(cities, setSelectedCity)}
                                placeholder="Seleccionar ciudad"
                                styles={customStyles}
                                getOptionValue={(option) => option.value}
                            />
                        </div>
                    </div>
                    <div className={Styles.containerBlockAdministrator}>
                        <div>
                            <label htmlFor="latitude">Latitud</label>
                            <input type="text" name="latitude" id="latitude" />
                        </div>
                        <div>
                            <label htmlFor="longitude">Longitud</label>
                            <input type="text" name="longitude" id="longitude" />
                        </div>
                    </div>
                    <div className={Styles.description}>
                        <label htmlFor="description">Descripción</label>
                        <textarea name="description" id="description">Escribir aquí</textarea>
                    </div>

                    <div className={Styles.containerCheckbox}>
                        <h3>Agregar atributos</h3>
                        <CheckListFeatures features={features} />
                    </div>
                    <div className={Styles.containerPoliticsPrincipal}>
                        <h3>Políticas del producto</h3>
                        <div className={Styles.containerPolitics}>
                            <div className={Styles.politics}>
                                <h5>Normas de la casa</h5>
                                <label>Descripción</label>
                                <textarea name="rules" id="rules" >Escribir aquí</textarea>
                            </div>
                            <div className={Styles.politics}>
                                <h5>Salud y seguridad</h5>
                                <label>Descripción</label>
                                <textarea name="healthAndSecurity" id="healthAndSecurity" >Escribir aquí</textarea>
                            </div>
                            <div className={Styles.politics}>
                                <h5>Políticas de cancelación</h5>
                                <label>Descripción</label>
                                <textarea name="cancellationPolicy" id="cancellationPolicy" >Escribir aquí</textarea>
                            </div>
                        </div>
                    </div>
                    <div className={Styles.containerImages}>
                        <h3>Cargar imágenes</h3>
                        <input type="text" name="images" id="images" />
                    </div>

                   
                        <button type="submit">Crear</button>
                    
                </form>
            </div>
        </section>
    )
}